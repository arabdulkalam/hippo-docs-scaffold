import React from "react"
import "./Header.sass"

const Header = ({logo, title, description}) => {
    return (<header>
        <img src={logo} alt="logo" />
        <h1><a href="/">{title}</a></h1>
        <div role="doc-subtitle">{description}</div>
    </header>)
}

export default Header;
