import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

interface PublicityPageProps {
    data: {
        allMdx: {
            nodes: Array<{
                frontmatter: {
                    title: string
                    slug: string
                    date: string
                    categories: string[]
                }
                id: string
                excerpt: string
            }>
        }
    }
}

const PublicityPage = ({ data }: PublicityPageProps) => {
    const articles = data.allMdx.nodes.map(({ id, frontmatter, excerpt }) => {
        const { categories, title, slug, date } = frontmatter
        const categoriesList = categories && categories.map((category) => <span key={category} className="category pill pill--grey">{category}</span>)
        return <article key={id} className="card card-full card-linked">
            <Link to={slug}>
                <h2>{title}</h2>
                {date ? <span className="date"><FontAwesomeIcon icon={faCalendar} />{date}</span> : null}
                {categoriesList}
                <p>{excerpt}</p>
            </Link>
        </article>
    }
    )


    const heroContent = (
        <>
            <h1>Publicity</h1>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="publicity archive">
            <div className="card-container">
                {articles}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(
            filter: {fields: {source: {eq: "publicity"}}}
            sort: {frontmatter: {date: DESC}}
          ) {
            nodes {
                frontmatter {
                    title
                    date(fromNow: true)
                    slug
                    categories
                  }
                id
                excerpt(pruneLength: 100)
            }
        }
    }
`

export const Head = () => {
    return (
        <SEO title='Publicity' />
    )
}

export default PublicityPage