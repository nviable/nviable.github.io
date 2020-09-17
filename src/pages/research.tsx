import React from "react"
// import { papers } from "../resources/papers"
import PageLayout from "../components/PageLayout"
import PaperLink from "../templates/paperLink"
import { graphql } from "gatsby"

const Research = ({data}) => {
  const papers = data.allMarkdownRemark.edges
    const p = papers.map( (paper, index) => {
        return <PaperLink key={"paper-"+index} data={paper.node} />
      })
    
    return <PageLayout className="page-research">
        <h1>Research Papers</h1>
        {p}
    </PageLayout>
}

export const query = graphql`
query {
  allMarkdownRemark(sort: {order: DESC, fields: frontmatter___year}) {
    edges {
      node {
        id
        frontmatter {
          title
          authors
          year
        }
        fields {
          slug
        }
      }
    }
  }
}

`

export default Research