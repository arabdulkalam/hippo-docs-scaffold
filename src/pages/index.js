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
            fileMap[latestEntryIdx].data.push(md)

        } else {
            const fileIndex = fileMap.map(idx => idx.name).indexOf(dir)
            fileMap[fileIndex].data.push(md)
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
                nestDirectory(child)
            }
        })

        const currentIdx = fileMap.map(idx => idx.name).indexOf(directory.name);
        const childIdx = fileMap.map(idx => idx.name).indexOf(child.name);

        fileMap[currentIdx].data = fileMap[currentIdx].data.concat(fileMap.splice(childIdx, 1));
    };

    const outputDirectory = (directory) => {
        const child = directory.data.find(dir => dir.parent === directory.name);

        if(child === undefined) {
            return (
                <details>
                    <summary>{directory.name}</summary>
                    <ul>
                        {directory.data.map((node, i) =>
                            <li key={i}>
                                <a 
                                    className="govuk-link" 
                                    href={node.frontmatter.slug}
                                    onClick={(event) => handleClick(event, node.html)}
                                >
                                    <h2 className="govuk-heading-l">{node.frontmatter.title}</h2>
                                </a>
                                <h4 className="govuk-heading-s">
                                    <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                                </h4>
                                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
                            </li>
                        )}
                    </ul>
                </details>
            )
        }

        return ( 
            <details>
                <summary>{directory.name}</summary>
                <ul>
                    {directory.data.map((node, i) => {
                        const key = Object.keys(node)[2]
                        if(key === "data") {
                            return (
                                outputDirectory(node)
                            )
                        } else {
                            return (
                                <li key={i}>
                                    <a 
                                        className="govuk-link" 
                                        href={node.frontmatter.slug}
                                        onClick={(event) => handleClick(event, node.html)}
                                    >
                                        <h2 className="govuk-heading-l">{node.frontmatter.title}</h2>
                                    </a>
                                    <h4 className="govuk-heading-s">
                                        <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                                    </h4>
                                    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
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
            <h1 className="govuk-heading-l">Hippo Documentation Scaffholding</h1>

            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-third">
                    <nav id="side-menu">
                        <ol className="govuk-list" >
                            {
                                fileMap.map(dir => outputDirectory(dir))
                            }
                        </ol>
                    </nav>
                </div>
            </div>
            <div 
                className="govuk-grid-column-two-thirds" 
                id="content-area"
                dangerouslySetInnerHTML={{ __html: content}}
            >
            </div>
        </main>
    )
}

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
