import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'
import { MDXProvider } from '@mdx-js/react'
import Card from '../components/Card'

interface PageProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
            }
        }
    }
    children: React.ReactNode
}

const shortcodes = { Card }

const PageTemplate = ({ data, children }: PageProps) => {
    const { title } = data.mdx.frontmatter
    const heroContent = (
        <>
            <h1>{title}</h1>
        </>
    )

    return (
        <Layout heroContent={heroContent} className="page card-page">
            <div className="floating-sidebar">
                <div className="floating-sidebar__inner">
                </div>
            </div>
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
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