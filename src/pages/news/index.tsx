import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'

interface NewsPageProps {
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

const NewsPage = ({ data }: NewsPageProps) => {
    const news = data.allMdx.nodes.map(({ id, frontmatter, excerpt }) =>
        <article key={id} className="card card-full card-linked">
            <Link to={frontmatter.slug}>
                <h2>{frontmatter.title}</h2>
                <p>{excerpt}</p>
            </Link>
        </article>
    )

    const heroContent = (
        <>
            <h1>My Updates</h1>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="news archive">
            <div className="card-container">
                {news}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(
            filter: {fields: {source: {eq: "news"}}}
            sort: {frontmatter: {order: ASC}}
          ) {
            nodes {
                frontmatter {
                    title
                    date(fromNow: true)
                    slug
                  }
                id
                excerpt(pruneLength: 180)
            }
        }
    }
`

export const Head = () => {
    return (
        <SEO title='news' />
    )
}

export default NewsPage