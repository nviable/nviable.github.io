import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'll be following a tutorial for this</p>
    </Layout>
  )
}

// #todo check SEO component tutorial https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/
export const Head = () => {
  return (
    <SEO title="Home" />
  )
}

export default IndexPage