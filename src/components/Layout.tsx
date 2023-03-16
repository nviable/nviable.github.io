import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../styles/styles.scss'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    pageTitle?: string
    children: React.ReactNode
}

const Layout = ({ pageTitle, children }: LayoutProps) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
        `)

    return (
        <>
            <Header />
            <main>
                {(pageTitle) ? <h1>{pageTitle}</h1> : null}
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout