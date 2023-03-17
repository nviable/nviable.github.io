import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'

interface ResearchPostProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
                date: string
                authors: string[]
                categories: string[]
                conferences: string[]
                link: string
                topics: string[]
            }
        }
    }
    children: React.ReactNode
    location: Location
}

const ResearchPost = ({ data, children }: ResearchPostProps) => {
    const { title, date, authors, categories, conferences, link, topics } = data.mdx.frontmatter
    const authorsList = authors && authors.map((author, index) => {
        return (
            <span key={`author-${index}`}>{author}</span>
        )
    })

    const topicList = topics && topics.map((topic, index) => {
        return (
            <span key={`topic-${index}`}>{topic}</span>
        )
    })

    const categoryList = categories && categories.map((category, index) => {
        return (
            <span key={`category-${index}`}>{category}</span>
        )
    })

    const conferenceList = conferences && conferences.map((conference, index) => {
        return (
            <span key={`conference-${index}`}>{conference}</span>
        )
    })

    const heroContent = (
        <>
            <h1>{title}</h1>
            <div className="date">{date || null}</div>
            <div className="authors">{authorsList || null}</div>
            <div className="topics">{topicList || null}</div>
            <div className="conferences">{conferenceList || null}</div>
            <div className="categories">{categoryList || null}</div>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="research post">
            <article>
                {children}
                <a href={link}>Link to paper</a>
            </article>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                authors
                categories
                conferences
                date(formatString: "YYYY")
                link
                slug
                topics
            }
        }
    }
`

interface HeadProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
            }
        }
    }
}

export const Head = ({ data }: HeadProps) => {
    return (
        <SEO title={data.mdx.frontmatter.title} />
    )
}

export default ResearchPost