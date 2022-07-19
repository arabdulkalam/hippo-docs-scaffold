import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components";

const Tag = styled.li`
  display: inline-block;
  text-align: center;
  list-style: none;
  margin-left: 10px;
  border-bottom: unset;
`

const TagLink = styled.a`
  padding: 8px;
  color: ${props => props.theme.tag.color};
  background-color: ${props => props.theme.tag.backgroundColor};

  &:hover {
    color: ${props => props.theme.tag.hoverColor};
    background-color: ${props => props.theme.tag.hoverBackgroundColor}
  }
`

const ContentDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px
`

export const styleQuery = graphql`
  fragment TagStyle on SiteSiteMetadataThemeTag{
      backgroundColor
      color
      hoverColor
      hoverBackgroundColor
    }
`

const Page = ({data}) => {
    const tags = data.markdownRemark?.frontmatter.tags?.split(',')

    return (<Layout>
        <ContentDiv>
            <ul>{tags ? tags.map(t => (<Tag key={t}>
                <TagLink href={`/tag?q=${encodeURIComponent(t)}`}>{t}</TagLink>
            </Tag>)) : ''}
            </ul>
        </ContentDiv>
        <ContentDiv dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}></ContentDiv>
    </Layout>)
}

export default Page

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug } }) {
      html
      frontmatter {
        title
        tags
      }
    }
  }`
