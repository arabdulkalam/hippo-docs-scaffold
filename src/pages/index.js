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

    // Takes stock of all unique areas and saves to the fileMap array.
    // This allows indivdual areas to be generated with no duplication
    const mapAreas = (dir, md) => {

        if(md !== null && dir !== null) {
            const result = fileMap.find(directory => directory.name === dir);
            const parentDir = getParent(dir);

            if(fileMap.length < 1) {
                fileMap.push(
                    {
                        "name": dir,
                        "childOf": parentDir,
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
                        "childOf": parentDir,
                        "data": []
                    }
                )

                const latestIdx = fileMap.length - 1;
                fileMap[latestIdx].data.push(md)
            } else {
                const fileIndex = fileMap.map(idx => idx.name).indexOf(dir)
                fileMap[fileIndex].data.push(md)
            }
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

    const tester = (dir, md) => {
        if(md !== null && dir !== null) {
            console.log(`path is: ${dir}`);
            console.log(md)
        }
    };


    data.allFile.nodes.map(({ relativeDirectory, childMarkdownRemark }) => {
        if(childMarkdownRemark === null) {
            return false   
        }

        return mapAreas(relativeDirectory, childMarkdownRemark)
    });

    console.log(fileMap);
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
