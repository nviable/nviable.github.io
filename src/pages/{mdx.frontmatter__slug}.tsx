import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

interface PageProps {
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

const PageTemplate = ({ data, children }: PageProps) => {
    const { title, date } = data.mdx.frontmatter

    const heroContent = (
        <>
            <h1>{title}</h1>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="blog post">
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

export default PageTemplate