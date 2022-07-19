import * as React from "react"
import { Link } from "gatsby"
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

// markup
const NotFoundPage = () => {
  return (
    <Container>
      <Title>Page not found</Title>
      <p>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </Container>
  )
}

export default NotFoundPage
