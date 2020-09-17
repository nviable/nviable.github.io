import React from "react"
import { Link } from "gatsby"
import { title } from "process"

const PaperLink = (paper) => {
    const { id, frontmatter, fields } = paper.data
    const { title, authors, year } = frontmatter
    return (
        <Link className="paper-card" to={fields.slug}>
            <span className="year">{year}</span>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{authors}</p>
            </div>
        </Link>
    )
}

export default PaperLink