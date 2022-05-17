import React, {useState} from 'react'
import {graphql, useStaticQuery} from 'gatsby';
import '../styles/global.sass';
import EmptyPageContent from '../components/emptyPageContent';

const IndexPage = ({data}) => {

    const [content, setContent] = useState({tags: [], html: '', fileMap: []});
    const fileMap = [];

    const handleClick = (e, node) => {
        e.preventDefault();

        setContent({tags: node.frontmatter.tags?.split(','), html: node.html});
    };

    // Map all directories, including sub-directories into a flat structure
    const createDirectories = (dir, md) => {

        const result = fileMap.find(directory => directory.name === dir);
        const parentDir = getParent(dir);

        if (fileMap.length < 1) {
            fileMap.push(
                {
                    "name": dir,
                    "parent": parentDir,
                    "data": []
                }
            )

            fileMap[0].data.push(md);
            return
        }

        if (result === undefined) {
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

        for (let i = 0; i < (lastIdx); i++) {
            parent += dir.charAt(i);
        }
        return parent
    };

    // Nest sub-directories within their parent
    const nestDirectory = (directory) => {
        const child = fileMap.find(dir => dir.parent === directory.name);

        if (child === undefined) {
            return
        }

        fileMap.forEach(node => {
            if (node.parent === child.name) {
                nestDirectory(child);
            }
        })

        const currentIdx = fileMap.map(idx => idx.name).indexOf(directory.name);
        const childIdx = fileMap.map(idx => idx.name).indexOf(child.name);

        fileMap[currentIdx].data = fileMap[currentIdx].data.concat(fileMap.splice(childIdx, 1));
    };

    // Shortens directory name on the UI, so that the whole path is not displayed
    const formatDirName = (name) => {
        let removeFrom = (name.lastIndexOf('/') + 1);
        let newName = "";

        for (let i = removeFrom; i < name.length; i++) {
            if (i === removeFrom) {
                newName += name[i].toUpperCase()
            } else {
                newName += name[i];
            }
        }
        return newName;
    };

    // Used to render all directories from the structure into HTML
    const outputDirectory = (directory) => {
        const child = directory.data.find(dir => dir.parent === directory.name);       

        if (child === undefined) {
            return (
                <details>
                    <summary><h4 className="tree-header">{formatDirName(directory.name)}</h4></summary>
                    <ul>
                        {directory.data.map((node, i) =>
                            <li className="page" key={i}>
                                <a

                                    href={node.frontmatter.slug}
                                    onClick={(event) => handleClick(event, node)}
                                >
                                    <h4>{node.frontmatter.title}</h4>
                                </a>
                                <p>
                                    <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                                </p>
                                <hr/>
                            </li>
                        )}
                    </ul>
                </details>
            )
        }

        return (
            <details>
                <summary><h4 className="tree-header">{formatDirName(directory.name)}</h4></summary>
                <ul>
                    {directory.data.map((node, i) => {
                        // WIP: Remove the hard coded way to evaluate if the node in question is a directory
                        const key = Object.keys(node)[2];
                        if (key === "data") {
                            return (
                                outputDirectory(node)
                            )
                        } else {
                            return (
                                <li className="page" key={i}>
                                    <a
                                        href={node.frontmatter.slug}
                                        onClick={(event) => handleClick(event, node)}
                                    >
                                        <h4>{node.frontmatter.title}</h4>
                                    </a>
                                    <p>
                                        <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                                    </p>
                                    <hr/>
                                </li>
                            )
                        }
                    })}
                </ul>
            </details>
        )
    };

    // Could these be wrapped in some sort of init function?
    data.allFile.nodes.map(({relativeDirectory, childMarkdownRemark}) => {
        if (childMarkdownRemark === null || relativeDirectory === null) {
            return false
        }
        return createDirectories(relativeDirectory, childMarkdownRemark)
    });

    fileMap.forEach(dir => {
        nestDirectory(dir);
    });
    
    if (fileMap.length > 0){
        return (
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-third">
                    <div id="tree-view">
                        <ol id="main-list">
                            {fileMap.map(dir => outputDirectory(dir))}
                        </ol>
                    </div>
                </div>
                <div>
                    <div><ul>{content.tags ? content.tags.map(t => (<li className="tag"><a href={`/tag?q=${encodeURIComponent(t)}`}>{t}</a></li>)) : ''}</ul></div>
                    <div className="govuk-grid-column-two-thirds" dangerouslySetInnerHTML={{__html: content.html}}></div>
                </div>
            </div>
        )
    }
    else{
        return (
            EmptyPageContent()
        )
    }    
};

export const query = graphql`
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
                        tags
                    }
                    html
                }
            }
        }
    }`

export default IndexPage
