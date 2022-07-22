import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
`

const Content = ({children}) => {
    return (<MainContainer className="content">{children}</MainContainer>)
}

export default Content
