import React from "react"
import { Link } from "gatsby"
import "../styles/Header.scss"

const Header = () => {
    return (
        <header>
            <div className="logo-container">
                Nviable
            </div>
            <div className="navigation-container">
                <ul className="nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/research/">Research</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header