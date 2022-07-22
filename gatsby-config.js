module.exports = {
    siteMetadata: {
        header: {
            logo: "/logo.png",
            title: "Title",
            description: "Description",
        },
        footer: {
            text: "Footer"
        },
        theme: {
            global: {
                font: {
                    fontFamily: "'DM Sans'"
                }
            },
            footer: {
                backgroundColor: "#fff",
                color: "#0c2340",
                borderColor: "#979797"
            },
            header: {
                backgroundColor: "#fff",
                color: "#0c2340",
                borderColor: "#979797"
            },
            navBar: {
                backgroundColor: "#fff",
                color: "#0c2340",
                borderColor: "#0c2340",
                hoverColor: '#fff',
                hoverBackgroundColor: '#0c2340'
            },
            tag: {
                backgroundColor: "#004c4b",
                color: "#fff",
                hoverColor: "#004c4b",
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
