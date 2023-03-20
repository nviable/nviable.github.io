import React from 'react'
import Layout from './Layout'
import { SEO } from './Seo'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

interface AboutPageProps {
    data: {
        mdx: {
            id: string
            body: string
        }
    }
    children: React.ReactNode
}

const AboutPage = ({ data, children }: AboutPageProps) => {
    console.log(data)
    const heroContent = (
        <>
            <h1>About Me</h1>
        </>
    )
    return (
        <Layout heroContent={heroContent} className="about-me post">
            {/* <p>I'll probably be talking about myself here</p> */}
            {children}
            <MDXProvider>{data.mdx.body}</MDXProvider>
        </Layout>
    )
}

export const Head = () => {
    return (
        <SEO title="About Me" />
    )
}

export const query = graphql`
    query {
        mdx(fields: {source: {eq: "blocks"}}, frontmatter: {slug: {eq: "about"}}) {
            id
            body
        }
    }
`

export default AboutPage