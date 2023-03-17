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
                    categories: string[]
                    project: string
                }
                id: string
                excerpt: string
            }>
        }
    }
}

const ResearchPage = ({ data }: ResearchPageProps) => {
    const researchPosts = data.allMdx.nodes.map(({ id, frontmatter, excerpt }) => {
        const { categories, title, slug, date, project } = frontmatter

        const categoriesList = categories && categories.map((category) => <span key={category} className="category pill pill--grey">{category}</span>)
        return <article key={id} className="card card-full card-linked">
            <Link to={slug}>
                <h2>{title}</h2>
                {date ? <span className="date"><FontAwesomeIcon icon={faCalendar} /> {date}</span> : null}
                {categoriesList}
                {project ? <span className="project pill pill--purple">{project}</span> : null}
                <p>{excerpt}</p>
            </Link>
        </article>
    })
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
                    categories
                    project
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