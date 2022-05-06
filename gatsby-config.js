module.exports = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "content",
      "path": "./src/content"
    },
    __key: "content"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages"
    },
    __key: "pages"
  }, {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-classes`,
          options: {
            classMap: {
              "heading[depth=1]": "govuk-heading-xl",
              "heading[depth=2]": "govuk-heading-l",
              "heading[depth=3]": "govuk-heading-m",
              "heading[depth=4]": "govuk-heading-s",
              "link": "govuk-link",
              "paragraph": "govuk-body",
              "list[ordered=false]": "govuk-list govuk-list--bullet",
              "list[ordered=true]": "govuk-list govuk-list--number",
              "blockquote": "govuk-!-text-align-centre",
              "strong": "govuk-!-font-weight-bold",
              "emphasis": "govuk-!-font-weight-bold",
              "break": "govuk-section-break govuk-section-break--m govuk-section-break--visible"
            }
          }
        }
      ]
    }
  }
  ]
};
