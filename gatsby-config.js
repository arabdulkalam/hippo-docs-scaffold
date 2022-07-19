module.exports = {
    siteMetadata: {
      header: {
          logo: "/logo.png",
          title: "Hello world",
          description: "Test site description",
      },
      footer: {
        text: "Here is the footer"
      },
      theme: {
          footer: {
             backgroundColor: "#000",
             color: "#fff",
             borderColor: "#000"
          },
          header: {
             backgroundColor: "#000",
             color: "#fff",
             borderColor: "#000"
          },
          navBar: {
              backgroundColor: "#000",
              color: "#fff",
              borderColor: "#000",
              hoverColor: '#000',
              hoverBackgroundColor: '#fff'
          },
          tag: {
              backgroundColor: "#000",
              color: "#fff",
              hoverColor: "#ff0000",
              hoverBackgroundColor: "#fff"
          }
      }
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        "gatsby-transformer-remark",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-styled-components",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "content",
                "path": "./content"
            },
            __key: "content"
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "content",
                "path": "./content/images"
            },
            __key: "images"
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 960,
                            backgroundColor: 'transparent',
                            showCaptions: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-image-attributes`,
                        options: {
                            dataAttributes: true
                        }
                    },
                    {
                        resolve: `gatsby-remark-classes`,
                        options: {
                            classMap: {}
                        }
                    }
                ]
            }
        }
    ]
};
