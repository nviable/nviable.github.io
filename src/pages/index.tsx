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
        frontmatter: {
          title: string
          expand: boolean
          icon: string
          link: string
          slug: string
          content: {
            excerpt?: string
            frameworks?: string[]
            coding?: string[]
            languages?: string[]
            project_management?: string[]
            tools?: string[]
          }
        }
      }>
    }
  }
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { nodes } = data.allMdx
  const blocks = nodes.map((node) => {
    const { id, body, frontmatter } = node
    const { title, expand, icon, link, content } = frontmatter

    const cardContent: React.ReactNode[] = []
    if (content?.excerpt) {
      cardContent.push(<p key="card-excerpt">{content.excerpt}</p>)
    }
    if (content) {
      for (const [key, value] of Object.entries(content)) {
        if (key === 'excerpt') {
          continue
        }
        const list = Array.isArray(value) && value.map((item, index) => {
          return <span className="pill" key={`${key}-${index}`}>{item}</span>
        })
        cardContent.push(
          <div key={key}>
            <h3>{key}</h3>
            <div className="pill-container">{list}</div>
          </div>
        )
      }
    }

    return <Card key={id} title={title} link={link} expand={expand} icon={icon}>
      {cardContent}
      {body}
    </Card>
  })
  return (
    <Layout>
      <section className='hero'>
        <div className="container">
          <StaticImage alt="Saniat Javid Sohrawardi" src="../images/portrait.png" />
          <div className="introduction">
            <h1>Hello, I'm John!</h1>
            <p className="sub-header">or more formally, Saniat J. Sohrawardi</p>
            <p className="bio">I'm a multidisciplinary researcher in Human-Computer Interaction, Computer Vision, Cybersecurity, and AI Ethics</p>
          </div>
          <div className="location"><SVGIcon icon="location" /> Rochester, NY</div>
          <div className="education"><SVGIcon icon="book-reader" />5th year Ph.D. at Rochester Institute of Technology</div>
        </div>
      </section>
      <section className="card-container">
        <div className="container">
          {blocks}
        </div>
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
    filter: {fields: {source: {eq: "blocks"}}, frontmatter: {order: {ne: 0}}}
    sort: {frontmatter: {order: ASC}}
  ) {
    nodes {
      id
      body
      frontmatter {
        topics
        topic
        title
        slug
        link
        icon
        expand
        paper
        order
        content {
          coding
          excerpt
          frameworks
          languages
          project_management
          tools
        }
      }      
    }
  }
}
`

export default IndexPage