import React from "react"
import styled from "styled-components";


const Logo = styled.img`
  max-width: unset;
  float: left;
  box-shadow: unset;
  
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
`

const Subtitle = styled.h4`
  margin-left: 0.8rem;
  min-height: 23px;
  padding-top: unset;
  text-decoration: none
`

const Header = ({logo, title, description}) => {
    return (<header className="header">
        <HomeLink href="/">
            <Logo src={logo} alt="logo" className="logo" />
            <Title dangerouslySetInnerHTML={{__html: title}} className="title"></Title>
            <Subtitle dangerouslySetInnerHTML={{__html: description}} className="subtitle"></Subtitle>
        </HomeLink>
    </header>)
}

export default Header;
