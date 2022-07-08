import React from "react"
import NavigationBar from "./NavigationBar";

export default function Layout({ nodes, children }) {
    return (
        <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third nav-bar">
                <NavigationBar nodes={nodes} />
            </div>
            <div className="govuk-grid-column-two-thirds main-content">{children}</div>
        </div>
    )
}
