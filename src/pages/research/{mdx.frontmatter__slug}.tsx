import { faFileText, faCopy, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, navigate } from 'gatsby'
import React, { useEffect } from 'react'
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
                bibtex: string
            }
        }
    }
    children: React.ReactNode
    location: Location
}

const ResearchPost = ({ data, children }: ResearchPostProps) => {
    const { title, date, authors, categories, conferences, link, topics, bibtex } = data.mdx.frontmatter
    const authorsList = authors && authors.map((author, index) => {
        return (
            <span key={`author-${index}`} className="pill pill--white">{author}</span>
        )
    })

    const topicList = topics && topics.map((topic, index) => {
        return (
            <span key={`topic-${index}`} className="pill pill--purple">{topic}</span>
        )
    })

    const categoryList = categories && categories.map((category, index) => {
        return (
            <span key={`category-${index}`} className="pill pill--purple">{category}</span>
        )
    })

    const conferenceList = conferences && conferences.map((conference, index) => {
        return (
            <span key={`conference-${index}`} className="pill pill--purple">{conference}</span>
        )
    })

    const [bibtexCopied, setBibtexCopied] = React.useState(false)

    const bibtexButtonIcon = (bibtexCopied) ? <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faCopy} />

    // handleBibtexCopy should copy bibtex to clipboard and set bibtexCopied to true for 2 seconds then useEffect should clear timeout
    const handleBibtexCopy = () => {
        navigator.clipboard.writeText(bibtex)
        setBibtexCopied(true)
        setTimeout(() => {
            setBibtexCopied(false)
        }, 2000)
    }


    const heroContent = (
        <>
            <button className="button button--purple button--small back-button" onClick={() => navigate('/research')}>
                <FontAwesomeIcon icon={faBackward} />Back to Research
            </button>
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
                {
                    (bibtex)
                        ? <button className="button button-primary" onClick={handleBibtexCopy} disabled={bibtexCopied}>
                            {bibtexButtonIcon} {(bibtexCopied) ? "Copied" : "BibTeX"}
                        </button>
                        : null
                }
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
                bibtex
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