import React, {useEffect, useState} from 'react'
import {graphql, useStaticQuery} from 'gatsby';
import '../styles/global.sass';

const TagPage = ({data}) => {
    const [content, setContent] = useState({tags: [], html: '', queryTags: []});   
    const fileList = data.allFile.nodes;

    const getTagsFromUrl = () => {
        let urlSearchString = window.location.search;
        let searchTags = urlSearchString.split('?q=')[1];
        setContent({tags: [], html: '', queryTags: searchTags});
    }

    const handleClick = (e, node) => {
        e.preventDefault();

        setContent({tags: node.frontmatter.tags?.split(','), html: node.html, queryTags: content.queryTags});
    };

    const renderFile = (node) => {
        return(        
            <li className="page">
                <a
                    href={node.frontmatter}
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

    var tagFilteredFileList = fileList.filter((file) => {        
        if (file != null && file.childMarkdownRemark && file.childMarkdownRemark.frontmatter.tags){  

            let tagsString = file.childMarkdownRemark.frontmatter.tags;           
            if (tagsString.includes(content.queryTags)){
                return true
            }        
        }
        return false
    });    

    useEffect(() => {getTagsFromUrl();}, []);

    return (
        <div className="govuk-grid-row">
                <h1 className="govuk-heading-xl search-heading">All files with tag: {content.tags[0]}</h1>
                <div className="govuk-grid-column-one-third">
                    <div id="tree-view">
                        <ol id="main-list">{tagFilteredFileList.map( file => renderFile(file.childMarkdownRemark))}</ol>
                    </div>
                </div>
                <div>
                    <div><ul>{content.tags ? content.tags.map(t => (<li className="tag"><a href={`/tag?q=${encodeURIComponent(t)}`}>{t}</a></li>)) : ''}</ul></div>
                    <div className="govuk-grid-column-two-thirds" dangerouslySetInnerHTML={{__html: content.html}}></div>
                </div>
        </div>
    )
}

export const query = graphql`
    query SearchPageQuery{
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

export default TagPage