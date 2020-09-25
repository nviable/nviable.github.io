import React from "react"
import { graphql, Link } from "gatsby"
import PageLayout from "../components/PageLayout"

const Paper = ({data}) => {
    const paper = data.markdownRemark
    console.log(paper)
    return <PageLayout className="article">
      <div className="feature">
          <div className="content">
          <h1>{paper.frontmatter.title}</h1>
          </div>
      </div>
      <div className="content">
        <Link className="back-link" to="/research/">Back to Papers</Link>
        <span className="year">{paper.frontmatter.year}</span>|
        <span className="authors">{paper.frontmatter.authors}</span>
        <div dangerouslySetInnerHTML={{__html: paper.html}}/>
        <Link className="back-link" to="/research/">Back to Papers</Link>
      </div>
    </PageLayout>
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