import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        <article key={id} className="card card-full card-linked">
            <Link to={frontmatter.slug}>
                <h2>{frontmatter.title}</h2>
                {frontmatter.date ? <span className="date"><FontAwesomeIcon icon={faCalendar} /> {frontmatter.date}</span> : null}
                <p>{excerpt}</p>
            </Link>
        </article>
    )
    const heroContent = (
        <>
            <h1>Research</h1>
        </>
    )
    return (
        <Layout heroContent={heroContent} className="research archive">
            <div className="card-container">
                {researchPosts}
            </div>
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
                    date(formatString: "YYYY")
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
        <SEO title='Research' />
    )
}

export default ResearchPage