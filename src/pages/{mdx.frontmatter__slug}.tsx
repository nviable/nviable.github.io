import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'
import { MDXProvider } from '@mdx-js/react'
import Card from '../components/Card'

interface PageProps {
    data: {
        mdx: {
            frontmatter: {
                title: string
                date: string
            }
        }
    }
    children: React.ReactNode
}

const shortcodes = { Card }

const PageTemplate = ({ data, children }: PageProps) => {
    const { title, date } = data.mdx.frontmatter
    // const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const heroContent = (
        <>
            <h1>{title}</h1>
        </>
    )

    useEffect(() => {
        // if (window && !isMobile) {
        //     const headings = document.getElementsByTagName('h2')
        //     const linksArray = Array.from(headings).map((heading) => {
        //         const url = heading.getElementsByClassName('anchor')[0].getAttribute('href') || ''
        //         const link = document.createElement('a')
        //         link.setAttribute('href', url)
        //         link.innerText = heading.innerText
        //         return link
        //     })
        //     const sidebar = document.getElementsByClassName('floating-sidebar__inner')[0]
        //     linksArray.forEach((link) => {
        //         sidebar.appendChild(link)
        //     })
        // }
    }, [])




    return (
        <Layout heroContent={heroContent} className="page card-page">
            <div className="floating-sidebar">
                <div className="floating-sidebar__inner">
                </div>
            </div>
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(fromNow: true)
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

export default PageTemplate