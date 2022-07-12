import React from "react"
import "./NoContent.sass"

const NoContent = () => {
    return (
        <>
            <h1>Getting started</h1>
            <div className="width-container">
                <ol>
                    <li>Add some markdown files (*.md) to the `content` folder</li>
                    <li>Add any referenced images to the `content/images` (*.png, *.jpeg supported) folder</li>
                </ol>
            </div>
        </>
    )
}

export default NoContent
