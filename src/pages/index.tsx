import { link } from "fs"
import React from "react"
import PageLayout from "../components/PageLayout"
import "../styles/General.scss"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Home = () => {
  const data = useStaticQuery(graphql`
  query {
    file(relativePath: { eq: "images/me-research.png" }) {
      childImageSharp {
        fluid(maxWidth: 250, maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`)
  console.log(data)
  return <PageLayout className="page-home">
    <div className="left">
      <Img className="profile-image" fluid={data.file.childImageSharp.fluid} alt="A corgi smiling happily" />
    </div>
    <div className="right">
      <h2>
        Hello everyone!
      </h2>
      <p>
        My name is Saniat Javid Sohrawardi (John)
      </p>
      <p>
        I'm a PhD. student at B. Thomas Golisano College of Computing and Information Sciences working at the Global Cybersecurity Institute at Rochester Institute of Technology. My fields of research include, usable security &amp; privacy, image forensics and phishing.
      </p>
      <p>
        I'm currently in process of building the website so it's visibly not in the best state.
      </p>
    </div>
  </PageLayout>
}

export default Home
