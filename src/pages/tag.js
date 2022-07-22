import React, {useEffect, useState} from 'react'
import {graphql} from 'gatsby';
import Layout from "../components/Layout";

const TagPage = ({data}) => {
    const [content, setContent] = useState({sortedFilteredFileList: [], tags: [], html: '', queryTags: [], sortValue: ''});
    const fileList = data.allFile.nodes;

    //renders a file from the fileList array as a list item on the page
    const renderFile = (node) => {
        return(
            <li key={node.frontmatter.title}>
                <a href={node.frontmatter.slug}>
                    <h4>{node.frontmatter.title}</h4>
                </a>
                <p>
                    <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                </p>
                <hr/>
            </li>
        )
    }

    //filters array of all files by those that contain the search query tag
    var tagFilteredFileList = fileList.filter((file) => {
        if (file != null && file.childMarkdownRemark && file.childMarkdownRemark.frontmatter.tags){

            let tagsString = file.childMarkdownRemark.frontmatter.tags;
            if (tagsString.includes(content.queryTags)){
                return true
            }
        }
        return false
    });

    //runs the getTagsFromUrl function once only / prevents recursion
    useEffect(() => {
        const getTagsFromUrl = () => {
            let urlSearchString = window.location.search;
            let searchTags = decodeURIComponent(urlSearchString.split('?q=')[1]);
            setContent({sortedFilteredFileList: tagFilteredFileList, tags: [], html: '', queryTags: searchTags, sortValue: 'date'});
        }
        getTagsFromUrl()
        }, [tagFilteredFileList]);

    return (
        <Layout>
            <div className="tagSearchResultsContainer">
                <h1>All files with tag: {content.queryTags}</h1>
                <ol>{content.sortedFilteredFileList.map( file => renderFile(file.childMarkdownRemark))}</ol>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query SearchPageQuery{
        allFile(
            filter: {sourceInstanceName: {eq: "content"}, base: {glob: "*.md"}}
            sort: {order: ASC, fields: relativePath}
        ) {
            nodes {
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
