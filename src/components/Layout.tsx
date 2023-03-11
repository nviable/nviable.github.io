import React from 'react'
import { Link } from 'gatsby'
import '../styles/styles.scss'

interface LayoutProps {
    pageTitle: string
    children: React.ReactNode
}

const Layout = ({ pageTitle, children }: LayoutProps) => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1>{pageTitle}</h1>
                {children}
            </main>
        </div>
    )
}

export default Layout