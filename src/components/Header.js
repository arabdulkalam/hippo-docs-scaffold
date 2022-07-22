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
const HomeLink = styled.a`
  text-decoration: none;
  padding-top: unset;
`

const Title = styled.h1`
  padding-top: unset;
  color: ${props => props.theme.header.color } !important;
 
`

const Subtitle = styled.h4`
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
        <HomeLink href="/">
            <Logo src={logo} alt="logo" />
            <Title dangerouslySetInnerHTML={{__html: title}}></Title>
            <Subtitle dangerouslySetInnerHTML={{__html: description}}></Subtitle>
        </HomeLink>
    </StyledHeader>)
}

export default Header;
