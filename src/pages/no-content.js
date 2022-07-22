import React from "react"
import {Link} from "gatsby";
import styled from "styled-components";

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
`

const Title = styled.h1`
  padding-bottom: 50px;
  font-size: 4em
`

const NoContent = () => {
    return (
        <Container>
            <Title>Getting started</Title>
            <div>
                <ol>
                    <li>Add some markdown files (*.md) to the `content` folder</li>
                    <li>Be sure to include any front matter at the top of any page that is added <img src="/front-matter.png" alt="frontmatter"/></li>
                    <li>Add any referenced images to the `content/images` (*.png, *.jpeg supported) folder</li>
                </ol>
            </div>
            <div>
                <Link to="/">Click here once you have added some content</Link>
            </div>
        </Container>
    )
}

export default NoContent
