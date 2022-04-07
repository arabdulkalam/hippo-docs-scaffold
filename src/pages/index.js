import React, { useState } from 'react'
import { graphql } from 'gatsby'
import '../styles/global.sass'

const IndexPage = ({data}) => {
    const [content, setContent] = useState();
    const fileMap = [];

    const handleClick = (e, html) => {
        e.preventDefault();

        setContent(html);
    };

    // Map all directories, including sub-directories into a flat structure
    const createDirectories = (dir, md) => {

        const result = fileMap.find(directory => directory.name === dir);
        const parentDir = getParent(dir);

        if(fileMap.length < 1) {
            fileMap.push(
                {
                    "name": dir,
                    "parent": parentDir,
                    "data": []
                }
            )

            fileMap[0].data.push(md)
            return
        }

        if(result === undefined) {
            fileMap.push(
                {
                    "name": dir,
                    "parent": parentDir,
                    "data": []
                }
            )

            const latestEntryIdx = fileMap.length - 1;
            fileMap[latestEntryIdx].data.push(md);
            return
        } else {
            const fileIndex = fileMap.map(idx => idx.name).indexOf(dir);
            fileMap[fileIndex].data.push(md);
            return
        }
    };

    const getParent = (dir) => {
        const lastIdx = dir.lastIndexOf('/');
        let parent = "";

        for(let i = 0; i < (lastIdx); i++) {
            parent += dir.charAt(i);
        }
        return parent
    };

    // Nest sub-directories within their parent
    const nestDirectory = (directory) => {
        const child = fileMap.find(dir => dir.parent === directory.name);

        if(child === undefined) {
            return
        }

        fileMap.forEach( node => {
            if(node.parent === child.name) {
                nestDirectory(child);
            }
        })

        const currentIdx = fileMap.map(idx => idx.name).indexOf(directory.name);
        const childIdx = fileMap.map(idx => idx.name).indexOf(child.name);

        fileMap[currentIdx].data = fileMap[currentIdx].data.concat(fileMap.splice(childIdx, 1));
    };

    // Shortens directory name for display purposes
    // so that the entire file path is not displayed as a dir name on the front end
    const formatDirName = (name) => {
        let removeFrom = name.lastIndexOf('/');
        let newName = "";

        for(let i = removeFrom + 1; i < name.length; i++){
            newName += name[i];
        }
        return newName;
    };

    const outputDirectory = (directory) => {
        const child = directory.data.find(dir => dir.parent === directory.name);

        if(child === undefined) {
            return (
                <details>
                    <summary>{formatDirName(directory.name)}</summary>
                    <ul>
                        {directory.data.map((node, i) =>
                            <li className="page" key={i}>
                                <a 
 
                                    href={node.frontmatter.slug}
                                    onClick={(event) => handleClick(event, node.html)}
                                >
                                    <h2 >{node.frontmatter.title}</h2>
                                </a>
                                <h4 >
                                    <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                                </h4>
                                <hr/>
                            </li>
                        )}
                    </ul>
                </details>
            )
        }

        return ( 
            <details>
                <summary>{formatDirName(directory.name)}</summary>
                <ul>
                    {directory.data.map((node, i) => {
                        const key = Object.keys(node)[2];
                        if(key === "data") {
                            return (
                                outputDirectory(node)
                            )
                        } else {
                            return (
                                <li className="page" key={i}>
                                    <a 
                                        href={node.frontmatter.slug}
                                        onClick={(event) => handleClick(event, node.html)}
                                    >
                                        <h2>{node.frontmatter.title}</h2>
                                    </a>
                                    <h4>
                                        <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                                    </h4>
                                    <hr/>
                                </li>
                            )
                        }
                    })}
               </ul>
            </details>
        )
    };

    data.allFile.nodes.map(({ relativeDirectory, childMarkdownRemark }) => {
        if(childMarkdownRemark === null || relativeDirectory === null) {
            return false   
        }
        return createDirectories(relativeDirectory, childMarkdownRemark)
    });

    fileMap.forEach(dir => {
        nestDirectory(dir);
    });

    return (
        <main>
            <title>Home Page</title>
            <h1 id="title">Hippo Documentation Scaffholding</h1>

            <div id="side-menu">
                <div>
                    <nav >
                        <ol>
                            {
                                fileMap.map(dir => outputDirectory(dir))
                            }
                        </ol>
                    </nav>
                </div>
            </div>
            <div 
                id="content-area"
                dangerouslySetInnerHTML={{ __html: content}}
            >
            </div>
        </main>
    )
};

export const query = graphql `
query IndexPageQuery {
    allFile(
      filter: {sourceInstanceName: {eq: "content"}, base: {glob: "*.md"}, relativeDirectory: {glob: "markdown/**"}}
      sort: {order: ASC, fields: relativePath}
    ) {
      nodes {
        relativeDirectory
        sourceInstanceName
        childMarkdownRemark {
          frontmatter {
            date
            slug
            title
          }
          html
        }
      }
    }
}`

export default IndexPage
