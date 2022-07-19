import React, {useEffect, useState} from "react";
import {graphql, useStaticQuery} from "gatsby";
import styled from "styled-components";


const NavBar = styled.div`
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.navBar.backgroundColor };
  color: ${props => props.theme.header.color };
  height: 100%;
  overflow: auto;
  border-right: 1px solid ${props => props.theme.navBar.borderColor };
  width: 25%;
  max-width: 250px;
`

const NavBarItem = styled.li`
  list-style: none;
  border-bottom: unset;
`

const NavBarLink = styled.a`
  display: block;
  color: ${props => props.theme.navBar.color};
  padding: 5px;
  text-decoration: none;

  &:active {
    background-color: ${props => props.theme.navBar.backgroundColor};
    color: ${props => props.theme.navBar.color};
  }
    
  &:hover {
    background-color: ${props => props.theme.navBar.hoverBackgroundColor };
    color: ${props => props.theme.navBar.hoverColor }
  }
`

const NavBarDetails = styled.details`
  margin-left: -9px
`

export const styleQuery = graphql`
  fragment NavBarStyle on SiteSiteMetadataThemeNavBar {
      backgroundColor
      color
      borderColor
      hoverBackgroundColor
      hoverColor
    }
`

const NavigationBar = () => {
    const {allFile} = useStaticQuery(
        graphql`
            query NavBarQuery {
                allFile(
                    filter: {sourceInstanceName: {eq: "content"}, base: {glob: "*.md"}}
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
                return (<NavBarItem><NavBarLink href={entry.slug}>{title}</NavBarLink></NavBarItem>)
            } else {
                return (<NavBarDetails onToggle={(e) => onNavToggle(e,title)} open={isOpen(title)}>
                    <summary>{title}</summary>
                    <ul>
                        { Object.entries(entry).filter(([title,_]) => title !== 'isPage').map(([title,entry]) => {
                            return loop(title, entry)
                        }) }
                    </ul>
                </NavBarDetails>)
            }
        }

        return Object.entries(tree).map(([title, entry]) => { return loop(title, entry) })
    }

    return (
        <NavBar>
            <ol>
                {renderTreeView(tree)}
            </ol>
        </NavBar>
    )
}

export default NavigationBar
