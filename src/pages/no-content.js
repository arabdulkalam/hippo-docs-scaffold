import React from "react"
import "./no-content.sass"
import {Link} from "gatsby";

const NoContent = () => {
    return (
        <main className="width-container">
            <h1>Getting started</h1>
            <div>
                <ol>
                    <li>Add some markdown files (*.md) to the `content` folder</li>
                    <li>Add any referenced images to the `content/images` (*.png, *.jpeg supported) folder</li>
                </ol>
            </div>
            <div>
                <Link to="/">Click here once you have added some content</Link>
            </div>
        </main>
    )
}

export default NoContent
