import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const BlogPage = () => {
    return (
        <Layout pageTitle="Blog Page">
            <p>Blog posts will go here</p>
        </Layout>
    )
}

export const Head = () => {
    return (
        <SEO title="Blog" />
    )
}

export default BlogPage