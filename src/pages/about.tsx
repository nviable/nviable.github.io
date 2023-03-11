import React from 'react'
import Layout from '../components/Layout'

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
        <title>About</title>
    )
}

export default AboutPage