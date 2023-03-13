import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'

interface ProjectsPageProps {
    data: {
        allMdx: {
            nodes: Array<{
                frontmatter: {
                    title: string
                    slug: string
                    date: string
                }
                id: string
                excerpt: string
            }>
        }
    }
}

const ProjectsPage = ({ data }: ProjectsPageProps) => {
    const projects = data.allMdx.nodes.map(({ id, frontmatter, excerpt }) =>
        <article key={id}>
            <h2><Link to={frontmatter.slug}>{frontmatter.title}</Link></h2>
            <p>Posted: {frontmatter.date}</p>
            <p>{excerpt}</p>
        </article>
    )

    return (
        <Layout pageTitle='Projects'>
            {projects}
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(
            filter: {fields: {source: {eq: "projects"}}}
            sort: {frontmatter: {date: DESC}}
          ) {
            nodes {
                frontmatter {
                    title
                    date(fromNow: true)
                    slug
                  }
                id
                excerpt(pruneLength: 40)
            }
        }
    }
`

export const Head = () => {
    return (
        <SEO title='Projects' />
    )
}

export default ProjectsPage