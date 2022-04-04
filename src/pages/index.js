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
    const mapDirectories = (dir, md) => {

        const result = fileMap.find(directory => directory.name === dir);
        const parentDir = getParent(dir);
        console.log(`dir is: ${dir}`)

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
        const currentIdx = fileMap.map(idx => idx.name).indexOf(directory.name);    
    
        if(child === undefined) {
            return currentIdx;
        }
    
        const childIdx = fileMap.map(idx => idx.name).indexOf(child.name);
        fileMap.forEach( node => {
            if(node.parent === child.name) {
                const nodeIdx = fileMap.map(idx => idx.name).indexOf(node.name);
                fileMap[nodeIdx].data = fileMap[nodeIdx].data.concat(fileMap.splice(nestDirectory(node), 1));
       
                fileMap[currentIdx].data = fileMap[currentIdx].data.concat(fileMap.splice(childIdx, 1));
                fileMap[childIdx].data = fileMap[childIdx].data.concat(fileMap.splice(nodeIdx, 1));
            }
        })
    };

    data.allFile.nodes.map(({ relativeDirectory, childMarkdownRemark }) => {
        if(childMarkdownRemark === null || relativeDirectory === null) {
            return false   
        }
        return mapDirectories(relativeDirectory, childMarkdownRemark)
    });

    fileMap.forEach(dir => {
        nestDirectory(dir);
    })
    console.log(fileMap)
    return (
        <h1>test</h1>
    )
}

export const query = graphql `
query IndexPageQuery {
    allFile(
      filter: {sourceInstanceName: {eq: "content"}, base: {glob: "*.md"}, relativeDirectory: {glob: "markdown/**"}}
      sort: {order: DESC, fields: childrenMarkdownRemark___frontmatter___date}
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
