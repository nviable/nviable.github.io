import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'
import SVGIcon from '../components/SVGIcons'

interface IndexPageProps {
  data: {
    allMdx: {
      nodes: Array<{
        id: string
        body: string
        excerpt: string
        frontmatter: {
          title: string
          expand: boolean
          icon: string
          link: string
          slug: string
          richContent: {
            coding: string[]
            design: string[]
            research: string[]
            tools: string[]
            project_management: string[]
          }
        }
      }>
    }
  }
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { nodes } = data.allMdx
  const blocks = nodes.map((node) => {
    const { id, body, frontmatter, excerpt } = node
    const { title, expand, icon, link, richContent } = frontmatter
    const cardContent: React.ReactNode[] = []
    if (richContent) {
      for (const [key, value] of Object.entries(richContent)) {
        if (value) {

          const list = Array.isArray(value) && value.map((item, index) => {
            return <span className="pill" key={`pill-${key}-${index}`}>{item}</span>
          })
          if (value) {
            cardContent.push(
              <div key={key} className="skill-container">
                <h4>{key}</h4>
                <div className="pill-container">{list}</div>
              </div>
            )
          }
        }
      }
    }
    if (body) {
      cardContent.push(
        // <p key={`card-excerpt-${id}`}>{body}</p>
        <MDXProvider key={`card-excerpt-${id}`}>{excerpt}</MDXProvider>
      )
    }
    const cardClasses = (title == 'research' || title == 'projects') ? 'card-half' : 'card-full'

    return <Card key={`card-${title}-${id}`} title={title} link={link} expand={expand} icon={icon} extraClass={cardClasses} excerpt={(title === "experience") ? excerpt : null}>
      {cardContent}
    </Card>
  })

  const heroContent = (
    <>
      <StaticImage alt="Saniat Javid Sohrawardi" src="../images/portrait.png" />
      <div className="introduction">
        <h1>Hello, I'm John!</h1>
        <p className="sub-header">or more formally, Saniat J. Sohrawardi</p>
        <p className="bio">I'm a multidisciplinary researcher in Human-Computer Interaction, Computer Vision, Cybersecurity, and AI Ethics</p>
      </div>
      <div className="location"><SVGIcon icon="location" /> Rochester, NY</div>
      <div className="education"><SVGIcon icon="book-reader" />5th year Ph.D. at Rochester Institute of Technology</div>
    </>
  )
  return (
    <Layout heroContent={heroContent} className="home">
      <section className="card-container">
        {blocks}
      </section>
    </Layout>
  )
}

// #todo check SEO component tutorial https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/
export const Head = () => {
  return (
    <SEO title="Home" />
  )
}

export const query = graphql`{
  allMdx(
    filter: {frontmatter: {order: {gt: 0}}, fields: {source: {eq: "blocks"}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    nodes {
      frontmatter {
        richContent {
          coding
          frameworks
          tools
          languages
          project_management
        }
        expand
        order
        title
        link
        icon
      }
      id
      body
      excerpt(pruneLength: 200)
    }
  }
}
`

export default IndexPage