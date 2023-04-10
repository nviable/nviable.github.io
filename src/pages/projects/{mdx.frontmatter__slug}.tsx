import { graphql, navigate } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faLink } from '@fortawesome/free-solid-svg-icons'

interface ProjectPostProps {
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
                        project?: string
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

const ProjectPost = ({ data, children }: ProjectPostProps) => {
    const { title, date, link } = data.mdx.frontmatter

    const heroContent = (
        <>
            <button className="button button--purple button--small back-button" onClick={() => navigate('/projects')}>
                <FontAwesomeIcon icon={faBackward} />Back to Projects
            </button>
            <h1>{title}</h1>
            <div className="post-meta">
                <span className="caption">Start Date</span>
                <div className="date">{date || null}</div>
            </div>
        </>
    )

    const relatedPosts = data.allMdx.edges.map(({ node }: EdgeProps) => {
        if (node.frontmatter.project === data.mdx.frontmatter.related) {
            return (
                <li key={node.id}>
                    <a href={`/research/${node.frontmatter.slug}`}>{node.frontmatter.title}</a>
                </li>
            )
        }
        return null
    }).filter((item) => item !== null)

    return (
        <Layout heroContent={heroContent} className="projects post">
            {children}
            {
                (link) ? <a href={link} className="button button-primary" target="_blank">
                    <FontAwesomeIcon icon={faLink} />Link
                </a> : null
            }
            {
                (relatedPosts.length > 0) ? <div className="related-posts">
                    <h2>Related Papers</h2>
                    <ul>
                        {relatedPosts}
                    </ul>
                </div> : null
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
            filter: {fields: {source: {eq: "articles"}}, frontmatter: {categories: {in: ["paper", "poster", "journal"]}}},
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