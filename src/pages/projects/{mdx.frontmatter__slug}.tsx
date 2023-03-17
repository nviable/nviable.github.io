import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface ProjectPostProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
                date: string
                link?: string
            }
        }
    }
    children: React.ReactNode
}

const ProjectPost = ({ data, children }: ProjectPostProps) => {
    const { title, date, link } = data.mdx.frontmatter
    const heroContent = (
        <>
            <h1>{title}</h1>
            <div className="post-meta">
                <span className="caption">Start Date</span>
                <div className="date">{date || null}</div>
            </div>
        </>
    )
    return (
        <Layout heroContent={heroContent} className="projects post">
            {children}
            {
                (link) ? <a href={link} className="button button-primary" target="_blank">
                    <FontAwesomeIcon icon={faLink} />Link
                </a> : null
            }
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(fromNow: true)
                link
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

export default ProjectPost