import React from "react"
import "./no-content.sass"

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
        </main>
    )
}

export default NoContent
