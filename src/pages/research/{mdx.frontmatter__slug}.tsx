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
                paper: string
                topics: string[]
            }
        }
    }
    children: React.ReactNode
}

const ResearchPost = ({ data, children }: ResearchPostProps) => {
    const { title, date, authors, categories, conferences, paper, topics } = data.mdx.frontmatter

    const authorsList = authors.map((author, index) => {
        return (
            <span key={`author-${index}`}>{author}</span>
        )
    })

    const topicList = topics.map((topic, index) => {
        return (
            <span key={`topic-${index}`}>{topic}</span>
        )
    })

    const categoryList = categories.map((category, index) => {
        return (
            <span key={`category-${index}`}>{category}</span>
        )
    })

    const conferenceList = conferences.map((conference, index) => {
        return (
            <span key={`conference-${index}`}>{conference}</span>
        )
    })

    return (
        <Layout pageTitle={title}>
            <article>
                <div className="meta">
                    <div className="date">{date}</div>
                    <div className="authors">{authorsList}</div>
                    <div className="topics">{topicList}</div>
                    <div className="conferences">{conferenceList}</div>
                    <div className="categories">{categoryList}</div>
                </div>
                {children}
                <a href={paper}>Link to paper</a>
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
                paper
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