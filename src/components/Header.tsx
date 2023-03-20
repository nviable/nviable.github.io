import React from 'react'
import { Link } from 'gatsby'
import SVGIcon from './SVGIcons'
import { useMediaQuery } from 'react-responsive'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    // if the header scrolls off the top of the page, it should have a background color
    // if the header is at the top of the page, it should not have a background color
    const [scrolled, setScrolled] = React.useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    // handle scroll events
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

    // show/hide the mobile menu
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const mobileMenuTooggleButton = (
        <button className="mobile-menu-toggle button--purple" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={(mobileMenuOpen) ? faClose : faBars} />
            {`${mobileMenuOpen ? "Close" : "Open"} Navigation`}
        </button>
    )

    let headerClasses = 'header'
    if (scrolled) {
        headerClasses = 'header scrolled'
    }

    return (
        <header className={headerClasses}>
            <div className="container">
                <div className="top-header">
                    <Link to='/' ><SVGIcon icon="favicon" /></Link>
                    {isMobile && mobileMenuTooggleButton}
                </div>
                <nav className={`nav ${isMobile && !mobileMenuOpen && "collapsed"}`}>
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
                            <Link to="/publicity">Publicity</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header