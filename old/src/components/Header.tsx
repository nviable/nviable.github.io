import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "../styles/Header.scss"

const Header = () => {
    const [ headerTop, setHeaderTop ] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY > 80;
            if (isTop !== headerTop) {
                setHeaderTop(isTop)
            }
        }
        document.addEventListener('scroll', handleScroll)

        // return document.removeEventListener('scroll', handleScroll)
    })

    const data = useStaticQuery(graphql`
        query {
            file(relativePath: {eq: "images/logo.svg"}) {
                id
                publicURL
            }
        }`)
    return (
        <header className={headerTop ? "top" : null}>
            <div className="content">
                <div className="logo-container">
                    <Link to="/"><img src={data.file.publicURL} alt="logo"/></Link>
                </div>
                <div className="navigation-container">
                    <ul className="nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/research/">Research</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header