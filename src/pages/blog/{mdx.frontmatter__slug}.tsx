import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import { SEO } from '../../components/Seo'

interface BlogPostProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
                date: string
            }
        }
    }
    children: React.ReactNode
}

const BlogPost = ({ data, children }: BlogPostProps) => {
    const { title, date } = data.mdx.frontmatter

    return (
        <Layout pageTitle={title}>
            <p>{date}</p>
            {children}
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(fromNow: true)
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

export default BlogPost