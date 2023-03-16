import React from 'react'
import { Link } from 'gatsby'
import SVGIcon from './SVGIcons'

const Header = () => {
    // if the header scrolls off the top of the page, it should have a background color
    // if the header is at the top of the page, it should not have a background color
    const [scrolled, setScrolled] = React.useState(false)

    const handleScroll = () => {
        const offset = window.scrollY
        if (offset > 60) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let headerClasses = 'header'
    if (scrolled) {
        headerClasses = 'header scrolled'
    }

    return (
        <header className={headerClasses}>
            <div className="container">
                <Link to='/' ><SVGIcon icon="favicon" /></Link>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/research">Research</Link>
                        </li>
                        <li>
                            <Link to="/projects">Projects</Link>
                        </li>
                        <li>
                            <Link to="/blog">Blog</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header