import React from "react"
import "./Header.sass"

const Header = ({title, subtitle}) => {

    return (<header>
        <h1><a href="/">{title}</a></h1>
        <div role="doc-subtitle">{subtitle}</div>
    </header>)
}

export default Header;
