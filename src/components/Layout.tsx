import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../styles/styles.scss'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    heroContent?: React.ReactNode
    children: React.ReactNode
    className: string
}

const Layout = ({ heroContent, children, className }: LayoutProps) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
        `)

    const heroClass = className ? `hero ${className}` : 'hero'

    return (
        <>
            <Header />
            <main>
                <section className={heroClass}>
                    <div className="container">
                        {heroContent}
                    </div>
                </section>
                <section className="content">
                    <div className="container">
                        {children}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Layout