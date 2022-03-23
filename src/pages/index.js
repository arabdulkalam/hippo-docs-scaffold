import React, { useState } from 'react'
import { graphql } from 'gatsby'
import '../styles/global.sass'

const IndexPage = ({data}) => {
    const [content, setContent] = useState();
    const fileMap = [];
    const previousDirs = [];

    const handleClick = (e, html) => {
        e.preventDefault();

        setContent(html);
    };

    // Takes stock of all unique areas and saves to the fileMap array.
    // This allows indivdual areas to be generated with no duplication
    const mapAreas = (dir, md) => {

        if(md !== null && dir !== null) {
            console.log(dir)
            console.log(md)

            const currentDir = dir;
            const previousDir = previousDirs[previousDirs.length-1];
            const directoryDepth = currentDir.split('/').length - 1;
            
            if(currentDir !== previousDir) {
                // Current directory in increment is not a child of the previous directory
                if(!evaluatePreviousDir(currentDir, previousDir)) {
                    const result = fileMap.find(directory => directory.name === currentDir);

                    if(result === undefined) {
                        fileMap.push(
                            {
                                "name": currentDir, 
                                "data": []
                            }
                        )
                    
                        const latestIdx = fileMap.length - 1;
                        fileMap[latestIdx].data.push(md)
                    }
                } else {

                }

            } else {
                
            }
        }
    };

    const evaluatePreviousDir = (currentDir, previousDir) => {
        const lastIdx = currentDir.lastIndexOf('/');
        const comparePath = "";

        for(let i = 0; i < (lastIdx); i++) {
            comparePath += currentDir.charAt(i);
            console.log(comparePath)
        }

        if(comparePath !== previousDir) {
            return false
        }

        return true
    };

    const findIndex = (currentDir, directoryDepth) => {
        const layerStore = [];
        const layer = "";

        for(let i = 0; i < currentDir; i++) {
            let char = currentDir.charAt(i);
            if(char !== '/')
                layer += char;
            else
                layerStore.push(layer);
                layer = "";
        }

        for(let i = 0; i < directoryDepth; i++) {
            
        }
    };

    data.allFile.nodes.map(({ relativeDirectory, childMarkdownRemark }) => {
        return mapAreas(relativeDirectory, childMarkdownRemark)
    });

  return (
    <main>
        <title>Home Page</title>
        <h1 className="govuk-heading-l">Hippo Documentation Scaffholding</h1>

        <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third">
                <nav id="side-menu">
                    <ol className="govuk-list">
                            {fileMap.map((area, i) => {
                                return (
                                    <details key={i}>
                                        <summary>{area.name}</summary>
                                        <ul>
                                            {area.data.map((page, i) => {
                                                return (
                                                    <li key={i}>
                                                        <a 
                                                            className="govuk-link" 
                                                            href={page.frontmatter.slug}
                                                            onClick={(event) => handleClick(event, page.html)}
                                                        >
                                                            <h2 className="govuk-heading-l">{page.frontmatter.title}</h2>
                                                        </a>
                                                        <h4 className="govuk-heading-s">
                                                            <time dateTime={page.frontmatter.date}>{page.frontmatter.date}</time>
                                                        </h4>
                                                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </details>
                                )
                            })}   
                    </ol>
                </nav>
            </div>
            <div 
                className="govuk-grid-column-two-thirds" 
                id="content-area"
                dangerouslySetInnerHTML={{ __html: content}}
            >
            </div>
        </div>
    </main>
  )
}

export const query = graphql `
query IndexPageQuery {  
    allFile(
        filter: {relativeDirectory: {glob: "markdown/**"}, sourceInstanceName: {eq: "content"}, base: {glob: "*.md"}}
        sort: {fields: sourceInstanceName, order: ASC}
      ) {
        nodes {
          relativeDirectory
          sourceInstanceName
          childMarkdownRemark {
            frontmatter {
              area
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
