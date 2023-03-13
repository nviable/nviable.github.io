import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <section className='hero'>
        <div className="row">
          <div className="col-left">
            <StaticImage alt="Saniat Javid Sohrawardi" src="../images/portrait.png" />
          </div>
          <div className="col-right">
            <h1>Hello, I'm John!</h1>
            <p className="sub-header">or more formally, Saniat J. Sohrawardi</p>
            <p className="bio">I'm a multidisciplinary researcher in Human-Computer Interaction, Computer Vision, Cybersecurity, and AI Ethics</p>
          </div>
        </div>
        <div className="row">
          <div className="location">Rochester, NY</div>
          <div className="education">5th year Ph.D. at Rochester Institute of Technology</div>
        </div>
      </section>
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