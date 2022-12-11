import React from "react"
// import { papers } from "../resources/papers"
import PaperLink from "../templates/paperLink"
import { graphql } from "gatsby"

const Research = ({data}) => {
  const files = data.allMarkdownRemark.edges
  const papers = files.map( (paper, index) => {
      return paper.node.fields.slug.includes("/papers/") ? <PaperLink key={"paper-"+index} data={paper.node} /> : null
    })
  
  const projects = files.map( (project, index) => {
    return project.node.fields.slug.includes("/projects/") ? <PaperLink key={"project-"+index} data={project.node} /> : null
  })

  return <main>
      <div className="feature">
        <div className="content">
          <h1>Research Work</h1>
        </div>
      </div>
      <div className="content">
        <h2>Papers</h2>
        {papers}
        {/* <h2>Projects</h2>
        {projects} */}
      </div>
  </main>
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