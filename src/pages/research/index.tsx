import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'

interface ResearchPageProps {
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

const ResearchPage = ({ data }: ResearchPageProps) => {
    const researchPosts = data.allMdx.nodes.map(({ id, frontmatter, excerpt }) =>
        <article key={id}>
            <Link to={frontmatter.slug}> {frontmatter.title}</Link>
            <p>Posted: {frontmatter.date}</p>
            <p>{excerpt}</p>
        </article>
    )
    return (
        <Layout pageTitle='Research'>
            {researchPosts}
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(
            filter: {fields: {source: {eq: "research"}}}
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
        <SEO title='Research' />
    )
}

export default ResearchPage