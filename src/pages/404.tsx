import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const NotFoundPage = () => {
  return (
    <Layout pageTitle='404'>
      <h1>Page Not Found</h1>
      <p>Nada</p>
    </Layout>
  )
}

export const Head = () => {
  return (
    <SEO title="404" />
  )
}

export default NotFoundPage