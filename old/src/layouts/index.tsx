import React, { useEffect, useState } from "react"
import "../styles/PagesLayout.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SEO from "../seo"

const PageLayout = ({children}) => {
    const [ pathname, setPathname ] = useState("")
    const [ className, setClassName ] = useState("")
    
    useEffect( () => {
        if (window) {
            setPathname(window.location.pathname.split("/")[1])
            setClassName((pathname == "") ? 'page-home' : pathname)
        }
    })

    return(<div>
            <Header />
            <SEO title={(pathname == "") ? "About Me" : pathname.charAt(0).toLocaleUpperCase() + pathname.slice(1)} />
            <div className={["page", className].join(" ")}>
                {children}
            </div>
            <Footer />
        </div>
)}


export default PageLayout