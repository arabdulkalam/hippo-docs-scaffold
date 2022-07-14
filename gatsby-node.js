exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    
    type File implements Node { 
        childMarkdownRemark: MarkdownRemark
    }
    
    type MarkdownRemark implements Node {
        frontmatter: MarkdownRemarkFrontmatter
    }
    
    type MarkdownRemarkFrontmatter implements Node {
      title: String
      date: String
      tags: String
      slug: String
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
                    relativePath
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
                totalCount
            }
        }`)

    if(data.allFile.totalCount === 0) {
        actions.createPage({
            path: '/',
            component: require.resolve(`./src/pages/no-content.js`)
        })
    } else {
        data.allFile.nodes.forEach(node => {
            const slug = node.childMarkdownRemark?.frontmatter.slug

            if (node.relativePath.toLowerCase().includes("index")) {
                actions.createPage({
                    path: '/',
                    component: require.resolve(`./src/pages/page.js`),
                    context: {slug: slug, html: node.html},
                })
            }

            if (slug) {
                actions.createPage({
                    path: slug,
                    component: require.resolve(`./src/pages/page.js`),
                    context: {slug: slug, html: node.html},
                })
            }
        })
    }
}
