import React from "react"
import NavigationBar from "./NavigationBar";
import "./Layout.sass"
import Footer from "./Footer";
import Header from "./Header";
import {graphql, useStaticQuery} from "gatsby";

export default function Layout({ children }) {
    const {site:{siteMetadata}} = useStaticQuery(
        graphql`
            query HeaderQuery {
                site {
                    siteMetadata {
                      header {
                        title
                        description
                      }
                      footer {
                        text
                      }
                    }
                  }
                }
        `)

    return (
        <div className="layout-wrapper">
            <Header title={siteMetadata.header.title} subtitle={siteMetadata.header.description} />
            <NavigationBar />
            <div className="main-container">

                <div>{children}</div>
            </div>
            <Footer text={siteMetadata.footer.text} />
        </div>
    )
}
