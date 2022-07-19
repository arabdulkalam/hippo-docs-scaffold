import React from "react"
import styled from "styled-components";
import {graphql} from "gatsby";

const StyledFooter = styled.footer`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: ${props => props.theme.footer.backgroundColor};
  color: ${props => props.theme.footer.color};
  border-top: 1px solid ${props => props.theme.footer.borderColor};
  text-align: left;
  min-height: 50px;
`

export const styleQuery = graphql`
  fragment FooterStyle on SiteSiteMetadataThemeFooter {
      backgroundColor
      color
      borderColor
    }
`

const Footer = ({text}) => {
    return (<StyledFooter>{text}</StyledFooter>)
}

export default Footer;
