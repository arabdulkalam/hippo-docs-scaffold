import React from "react"
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`

const Footer = ({text}) => {
    return (<StyledFooter dangerouslySetInnerHTML={{__html: text}} className="footer"></StyledFooter>)
}

export default Footer;
