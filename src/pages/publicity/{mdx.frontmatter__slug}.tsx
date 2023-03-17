import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import { SEO } from '../../components/Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileText } from '@fortawesome/free-regular-svg-icons'

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
      <span key={`author-${index}`}>{author}</span>
    )
  })

  const categoriesList = categories && categories.map((category, index) => {
    return (
      <span key={`category-${index}`}>{category}</span>
    )
  })

  const heroContent = (
    <>
      <h1>{title}</h1>
      <div className="date">{date || null}</div>
      <div className="authors">{authorsList || null}</div>
      <div className="categories">{categoriesList || null}</div>
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
          date
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