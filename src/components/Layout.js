import React from "react"
import NavigationBar from "./NavigationBar";
import "./Layout.sass"
import Footer from "./Footer";
import Header from "./Header";
import {graphql, useStaticQuery} from "gatsby";
import Content from "./Content";

export default function Layout({ children }) {
    const {site:{siteMetadata}} = useStaticQuery(
        graphql`
            query HeaderQuery {
                site {
                    siteMetadata {
                      header {
                        logo 
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
            <Header {...siteMetadata.header} />
            <div className="content-wrapper">
                <NavigationBar />
                <Content>{children}</Content>
            </div>
            <Footer {...siteMetadata.footer} />
        </div>
    )
}
