import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const AboutPage = () => {
    return (
        <Layout pageTitle="About Page">
            <h1>About Me</h1>
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