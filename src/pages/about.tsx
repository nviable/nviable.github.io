import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const AboutPage = () => {
    return (
        <Layout pageTitle="About Page">
            <p>I'll probably be talking about myself here</p>
        </Layout>
    )
}

export const Head = () => {
    return (
        <SEO title="About Me" />
    )
}

export default AboutPage