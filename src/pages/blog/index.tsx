import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, Link, navigate } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'

interface BlogPageProps {
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

const BlogPage = ({ data }: BlogPageProps) => {
    const blogPosts = data.allMdx.nodes.map(({ id, frontmatter, excerpt }) =>
        <article key={id} className="card card-half card-linked">
            <Link to={frontmatter.slug}>
                <h2>{frontmatter.title}</h2>
                {frontmatter.date ? <span className="date"><FontAwesomeIcon icon={faCalendar} /> {frontmatter.date}</span> : null}
                <p>{excerpt}</p>
            </Link>
        </article>
    )

    const heroContent = (
        <>
            <button className="button button--purple button--small back-button" onClick={() => navigate('/publicity')}>
                <FontAwesomeIcon icon={faBackward} />Back to Posts
            </button>
            <h1>Blog</h1>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="blog archive">
            <div className="card-container">
                {blogPosts}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(
            filter: {fields: {source: {eq: "blog"}}}
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
        <SEO title="Blog" />
    )
}

export default BlogPage