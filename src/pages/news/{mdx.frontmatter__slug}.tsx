import { graphql, navigate } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faLink } from '@fortawesome/free-solid-svg-icons'

interface NewsPostProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
                date: string
                link?: string
                related?: string
            }
        }
        allMdx: {
            edges: {
                node: {
                    id: string
                    frontmatter: {
                        title: string
                        slug: string
                    }
                }
            }[]
        }
    }
    children: React.ReactNode
}

interface EdgeProps {
    node: {
        id: string
        frontmatter: {
            title: string
            slug: string
            project?: string
        }
    }
}[]

const ProjectPost = ({ data, children }: NewsPostProps) => {
    const { title, date, link } = data.mdx.frontmatter

    const heroContent = (
        <>
            <button className="button button--purple button--small back-button" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faBackward} />Back
            </button>
            <h1>{title}</h1>
            <div className="post-meta">
                <span className="caption">Date</span>
                <div className="date">{date || null}</div>
            </div>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="news post">
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
                related
            }
        }
        allMdx(
            filter: {fields: {source: {eq: "research"}}}
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  slug
                  project
                }
              }
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