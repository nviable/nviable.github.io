import React from "react"
import { Link } from "gatsby"
import Card from "./card"

const PaperLink = (paper) => {
    const { id, frontmatter, fields } = paper.data
    const { title, authors, year } = frontmatter
    return (
        <Card url={fields.slug} year={year} title={title}>
            {authors}
        </Card>
    )
}

export default PaperLink