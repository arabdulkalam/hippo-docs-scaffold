import React from "react"
import styled from "styled-components";
import {graphql} from "gatsby";

const StyledHeader = styled.header`
  border-bottom: 1px solid ${props => props.theme.header.borderColor };
  background-color: ${props => props.theme.header.backgroundColor };
  color: ${props => props.theme.header.color };
  padding: 10px
`
const Logo = styled.img`
  max-width: unset;
  float: left;
  max-height: 100px;
  box-shadow: unset;
  padding: 0px 30px 0px 30px;
  
  &:hover {
    box-shadow: unset;
  }
`
const Title = styled.h1`
  padding-top: unset;
  color: ${props => props.theme.header.color } !important;
  text-decoration: none
`

const Subtitle = styled.h6`
  margin-left: 0.8rem;
  min-height: 23px;
  padding-top: unset;
  color: ${props => props.theme.header.color } !important;
  text-decoration: none
`

export const styleQuery = graphql`
  fragment HeaderStyle on SiteSiteMetadataThemeHeader {
      backgroundColor
      color
      borderColor
    }
`

const Header = ({logo, title, description}) => {
    return (<StyledHeader>
        <Logo src={logo} alt="logo" />
        <a href="/"><Title>{title}</Title></a>
        <Subtitle>{description}</Subtitle>
    </StyledHeader>)
}

export default Header;
