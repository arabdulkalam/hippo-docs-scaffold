import React from "react"
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import Header from "./Header";
import {graphql, useStaticQuery} from "gatsby";
import Content from "./Content";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  position: fixed;
  height: 100%;
`

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
            <LayoutWrapper>
                <Header {...siteMetadata.header} />
                <ContentWrapper>
                    <NavigationBar />
                    <Content>{children}</Content>
                </ContentWrapper>
                <Footer {...siteMetadata.footer} />
            </LayoutWrapper>
    )
}
