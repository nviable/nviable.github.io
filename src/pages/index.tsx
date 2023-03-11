import React from 'react'
import Layout from '../components/Layout'

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
    <title>Nviable v2</title>
  )
}

export default IndexPage