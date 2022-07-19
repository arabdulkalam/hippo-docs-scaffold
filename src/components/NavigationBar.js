import React, {useEffect, useState} from "react";
import {graphql, useStaticQuery} from "gatsby";
import "./NavigationBar.sass"


const NavigationBar = () => {
    const {allFile} = useStaticQuery(
        graphql`
            query NavBarQuery {
                allFile(
                    filter: {sourceInstanceName: {eq: "content"}, base: {glob: "*.md"}, relativePath: {ne: "Index.md"}}
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
            }
        `)

    const nodes = allFile.nodes
    const [tree, setTree] = useState({})

    const onNavToggle = (e, slug) => {
        let state = typeof window !== undefined ? JSON.parse(window.localStorage.getItem('navItems') ?? '[]') : []
        if(e.target.open) {
            state.push(slug)
        } else {
            state = state.filter(function(ele, index) {
                return nodes.findIndex(e => e.childMarkdownRemark?.frontmatter?.title === ele) !== -1
            })
        }

        if(typeof window !== undefined) {
            window.localStorage.setItem('navItems', JSON.stringify(state))
        }
    }

    const isOpen = (title) => {
        let state = typeof window !== undefined ? JSON.parse(window.localStorage.getItem('navItems') ?? '[]') : []
        return state.findIndex(s => s === title) !== -1
    }

    useEffect(() => {
        const createObjectPath = (target, pathElements, title, slug) => {
            if(pathElements.length === 0) {
                return {...target, [title]: {isPage: true, slug}}
            }

            const e = pathElements.shift()
            if(target.hasOwnProperty(e)) {
                return {...target, [e]: createObjectPath(target[e], pathElements, title, slug) }
            }

            return {...target, [e]: createObjectPath({ isPage: false }, pathElements, title, slug) }
        }

        const appendPage = (target, path, title, slug) => {
            if(path === '')
                return { ...target, [title]: { isPage: true, slug}}

            const pathElements = path.split('/')
            return createObjectPath(target, pathElements, title, slug)
        }

        const struct = nodes.reduce((acc, {relativeDirectory, childMarkdownRemark}) => {
            const title = childMarkdownRemark?.frontmatter?.title
            const slug = childMarkdownRemark?.frontmatter?.slug
            return appendPage(acc, relativeDirectory, title, slug)
        }, {})
        setTree(struct)
    },[nodes])

    const renderTreeView = (tree) => {

        const loop = (title, entry) => {
            if(entry.isPage) {
                return (<li><a href={entry.slug}>{title}</a></li>)
            } else {
                return (<details onToggle={(e) => onNavToggle(e,title)} open={isOpen(title)}>
                    <summary>{title}</summary>
                    <ul>
                        { Object.entries(entry).filter(([title,_]) => title !== 'isPage').map(([title,entry]) => {
                            return loop(title, entry)
                        }) }
                    </ul>
                </details>)
            }
        }

        return Object.entries(tree).map(([title, entry]) => { return loop(title, entry) })
    }

    return (
        <div className="sidebar">
            <ol>
                {renderTreeView(tree)}
            </ol>
        </div>
    )
}

export default NavigationBar
