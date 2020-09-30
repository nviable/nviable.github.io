import { link } from "fs"
import React from "react"
import "../styles/General.scss"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Card from "../templates/card"

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
    allFile(filter: {relativePath: {in: ["images/icon-projects.png", "images/icon-research.png"]}}) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 100, maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
        name
      }
    }
  }`)
  return <main>
    <div className="feature">
      <div className="content">
        <div className="left">
          <Img className="profile-image" fluid={data.file.childImageSharp.fluid} alt="John Sohrawardi" />
        </div>
        <div className="right">
          <h2 className="heading-large">
            Hello everyone!
          </h2>
          <p>
          My name is Saniat Sohrawardi (John) <br />
          I’m a PhD student at
          B. Thomas Golisano College of Computing and Information Sciences, RIT
          </p>
        </div>
      </div>
    </div>
    <div className="content" >
      <div className="card-container two-col">
        <Card title="Research" learnMore={true} url="/research" img={data.allFile.nodes[0].childImageSharp.fluid}>
          <p>
            My research involves Usable Security, Privacy, Image Forensics, Deep Learning. More specifically, I’ve been working with journalists on deepfake detection.
          </p>
        </Card>
        <Card title="Projects" learnMore={true} url="/research" img={data.allFile.nodes[1].childImageSharp.fluid} className="wip">
        <p>
          My project work usually revolves around my research. <br />
          <strong>Under Construction</strong>
        </p>
      </Card>
      </div>
      
    </div>
  </main>
}

export default Home
