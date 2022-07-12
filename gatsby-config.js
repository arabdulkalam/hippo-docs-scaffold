module.exports = {
    plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp",
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
