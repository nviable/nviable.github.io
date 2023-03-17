import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const AboutPage = () => {
    const heroContent = (
        <>
            <h1>About Me</h1>
        </>
    )
    return (
        <Layout heroContent={heroContent} className="about-me post">
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