import React from "react"
import "../styles/PagesLayout.scss"
import Header from "./Header"
import Footer from "./Footer"

const PageLayout = ({children, className=""}) => {
    return (
        <main>
            <Header />
            <div className={["page", className].join(" ")}>
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default PageLayout