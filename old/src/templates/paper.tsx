import React from "react"
import { graphql, Link } from "gatsby"

const Paper = ({data}) => {
    const paper = data.markdownRemark
    console.log(paper)
    return <div className="article">
      <div className="feature">
          <div className="content">
          <h1>{paper.frontmatter.title}</h1>
          </div>
      </div>
      <div className="band band-dark">
        <div className="content">
          <span className="year">{paper.frontmatter.year}</span>
          <span className="authors">{paper.frontmatter.authors}</span>
        </div>
      </div>
      <div className="content">
        <Link className="back-link" to="/research/">Back to Papers</Link>
      </div>
      <div className="content primary">
        <div dangerouslySetInnerHTML={{__html: paper.html}}/>
      </div>
      <div className="band band-light">
        <div className="content">
          <Link className="back-link" to="/research/">Back to Papers</Link>
        </div>
      </div>
    </div>
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        authors
        title
        year
      }
    }
  }
`

export default Paper