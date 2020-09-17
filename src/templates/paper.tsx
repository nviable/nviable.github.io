import React from "react"
import { graphql, Link } from "gatsby"
import PageLayout from "../components/PageLayout"

const Paper = ({data}) => {
    const paper = data.markdownRemark
    console.log(paper)
    return <PageLayout>
        <Link className="back-link" to="/research/">Back to Papers</Link>
        <h1>{paper.frontmatter.title}</h1>
        <span className="year">{paper.frontmatter.year}</span>|
        <span className="authors">{paper.frontmatter.authors}</span>
        <div dangerouslySetInnerHTML={{__html: paper.html}}/>
        <Link className="back-link" to="/research/">Back to Papers</Link>
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