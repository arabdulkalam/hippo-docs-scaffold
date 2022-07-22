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
`

const ContentDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px
`


const Page = ({data}) => {
    const tags = data.markdownRemark?.frontmatter.tags?.split(',')

    return (<Layout>
        <ContentDiv>
            <ul className="tagList">{tags ? tags.map(t => (<Tag key={t}>
                <TagLink href={`/tag?q=${encodeURIComponent(t)}`} className="tag" >{t}</TagLink>
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
