import React from "react"
import NavigationBar from "./NavigationBar";
import "./Layout.sass"
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ nodes, children }) {
    return (
        <div className="layout-wrapper">
            <Header />
            <div className="main-container">
                <div>
                    <NavigationBar nodes={nodes} />
                </div>
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    )
}
