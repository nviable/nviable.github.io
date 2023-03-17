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
        <article key={id} className="card card-full card-linked">
            <Link to={frontmatter.slug}>
                <h2>{frontmatter.title}</h2>
                <p>{excerpt}</p>
            </Link>
        </article>
    )

    const heroContent = (
        <>
            <h1>Projects</h1>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="projects archive">
            <div className="card-container">
                {projects}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(
            filter: {fields: {source: {eq: "projects"}}}
            sort: {frontmatter: {order: ASC}}
          ) {
            nodes {
                frontmatter {
                    title
                    date(fromNow: true)
                    slug
                  }
                id
                excerpt(pruneLength: 100)
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