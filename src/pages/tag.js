import React, {useEffect, useState} from 'react'
import {graphql, useStaticQuery} from 'gatsby';
import '../styles/global.sass';

const TagPage = ({data}) => {
    const [content, setContent] = useState({sortedFilteredFileList: [], tags: [], html: '', queryTags: [], sortValue: ''});   
    const fileList = data.allFile.nodes;

    //retrieves url query term (tag) and adds it to state
    const getTagsFromUrl = () => {
        let urlSearchString = window.location.search;
        let searchTags = urlSearchString.split('?q=')[1];
        setContent({sortedFilteredFileList: tagFilteredFileList, tags: [], html: '', queryTags: searchTags, sortValue: 'date'});
    }

    //sets state on click of article title/link
    const handleClick = (e, node) => {
        e.preventDefault();

        setContent({sortedFilteredFileList: content.sortedFilteredFileList, tags: node.frontmatter.tags?.split(','), html: node.html, queryTags: content.queryTags, sortValue: content.sortValue});
    }

    //renders a file from the fileList array as a list item on the page
    const renderFile = (node) => {
        return(        
            <li className="page" key={node.frontmatter.title}>
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

    //sorts file list by designated sort type (set by select at top of the page)
    const sortFileList = (sortBy) => {
        if (sortBy == 'date'){
            return sortFilesByDate();
        }
        if (sortBy == 'alphabetical'){
            return sortFilesAlphabetical();
        }
    }

    const sortFilesAlphabetical = () => {
        return tagFilteredFileList.sort((a, b)=> {
            let titleA = a.childMarkdownRemark.frontmatter.title;
            let titleB = b.childMarkdownRemark.frontmatter.title;
            return titleA.localeCompare(titleB);
        });
    }

    const sortFilesByDate = () => {
        return tagFilteredFileList.sort((a, b)=> {
            a = a.childMarkdownRemark.frontmatter.date; 
            b = b.childMarkdownRemark.frontmatter.date; 
            a = a.split('-');
            b = b.split('-');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        });
    }

    //handles updating select value when option is changed
    const handleChange = (event) => {
        let newSortValue = event.target.value;
        setContent({sortedFilteredFileList: sortFileList(newSortValue), tags: content.tags, html: content.html, queryTags: content.queryTags, sortValue: newSortValue});
    }

    //runs the getTagsFromUrl function once only / prevents recursion
    useEffect(() => {getTagsFromUrl();}, []);

    return (
        <div className="govuk-grid-row">
            <h1 className="govuk-heading-xl search-heading">All files with tag: {content.queryTags}</h1>
            <div className="govuk-grid-column-one-third">
                <div className="govuk-form-group search-filters">
                    <label className="govuk-label" htmlFor="sort">
                        Sort by
                    </label>
                    <select className="govuk-select" id="sort" name="sort" onChange={handleChange}>
                        <option value="date">Date</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
                <div id="tree-view">    
                    <ol id="main-list">{content.sortedFilteredFileList.map( file => renderFile(file.childMarkdownRemark))}</ol>
                </div>
            </div>
            <div>
                <div><ul>{content.tags ? content.tags.map(t => (<li className="tag" key={t}><a href={`/tag?q=${encodeURIComponent(t)}`}>{t}</a></li>)) : ''}</ul></div>
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