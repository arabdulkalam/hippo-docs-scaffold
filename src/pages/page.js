import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";

const Page = ({data}) => {
    const tags = data.markdownRemark?.frontmatter.tags?.split(',')

    return (<Layout>
        <div><ul>{tags ? tags.map(t => (<li className="tag" key={t}><a href={`/tag?q=${encodeURIComponent(t)}`}>{t}</a></li>)) : ''}</ul></div>
        <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}></div>
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
