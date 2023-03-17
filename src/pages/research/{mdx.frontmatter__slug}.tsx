import { faFileText } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
            <span key={`author-${index}`} className="pill pill--white">{author}</span>
        )
    })

    const topicList = topics && topics.map((topic, index) => {
        return (
            <span key={`topic-${index}`} className="pill pill--grey">{topic}</span>
        )
    })

    const categoryList = categories && categories.map((category, index) => {
        return (
            <span key={`category-${index}`} className="pill pill--grey">{category}</span>
        )
    })

    const conferenceList = conferences && conferences.map((conference, index) => {
        return (
            <span key={`conference-${index}`} className="pill pill--grey">{conference}</span>
        )
    })

    const heroContent = (
        <>
            <h1>{title}</h1>
            <div className="post-meta">
                <span className="caption">Published:</span>
                <div className="date">{date || null}</div>
                <span className="caption">Authors:</span>
                <div className="authors">{authorsList || null}</div>
                <span className="caption">Topics:</span>
                <div className="topics">{topicList || null}</div>
                <span className="caption">Conferences:</span>
                <div className="conferences">{conferenceList || null}</div>
                <span className="caption">Category:</span>
                <div className="categories">{categoryList || null}</div>
            </div>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="research post">
            <article>
                {children}
                <a href={link} className="button button-primary" target="_blank"><FontAwesomeIcon icon={faFileText} />paper</a>
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