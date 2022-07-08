exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type MarkdownRemarkFrontmatter implements Node {
      date: String
      tags: String
    }
  `
    createTypes(typeDefs)
}

exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
     query {
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
        }`)
    data.allFile.nodes.forEach(node => {
        const slug = node.childMarkdownRemark?.frontmatter.slug
        if(slug) {
            actions.createPage({
                path: slug,
                component: require.resolve(`./src/pages/page.js`),
                context: {slug: slug, html: node.html},
            })
        }
    })
}
