import React from 'react'
import Layout from '../../components/Layout'
import { graphql, navigate } from 'gatsby'
import { SEO } from '../../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileText } from '@fortawesome/free-regular-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

interface PublicityPostProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        authors: string[]
        categories: string[]
        date: string
        link: string
      }
    }
  }
  children: React.ReactNode
}

const PublicityPost = ({ data, children }: PublicityPostProps) => {
  const { title, authors, categories, date, link } = data.mdx.frontmatter

  const authorsList = authors && authors.map((author, index) => {
    return (
      <span key={`author-${index}`} className="pill pill--purple">{author}</span>
    )
  })

  const categoriesList = categories && categories.map((category, index) => {
    return (
      <span key={`category-${index}`} className="category pill pill--purple">{category}</span>
    )
  })

  const heroContent = (
    <>
      <button className="button button--purple button--small back-button" onClick={() => navigate('/publicity')}>
        <FontAwesomeIcon icon={faBackward} />Back to Publicity
      </button>

      <h1>{title}</h1>
      <div className="post-meta">
        <span className="caption">Published:</span>
        <div className="date">{date || null}</div>
        <span className="caption">Authors:</span>
        <div className="authors">{authorsList || null}</div>
        <span className="caption">Category:</span>
        <div className="categories">{categoriesList || null}</div>
      </div>
    </>
  )
  return (
    <Layout heroContent={heroContent} className="media post">
      <article>
        {children}
        <a href={link} className="button button-primary" target="_blank"><FontAwesomeIcon icon={faFileText} />Article</a>
      </article>
    </Layout>
  )
}

export const query = graphql`
query ($id: String) {
    mdx(id: { eq: $id }) {
        frontmatter {
          title
          authors
          categories
          date(fromNow: true)
          link
        }
    }
}
`

interface HeadProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
      }
    }
  }
}

export const Head = ({ data }: HeadProps) => {
  return (
    <SEO title={data.mdx.frontmatter.title} />
  )
}

export default PublicityPost