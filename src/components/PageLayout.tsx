import React from "react"
import "../styles/PagesLayout.scss"
import Header from "./Header"
import Footer from "./Footer"

const PageLayout = ({children}) => {
    return (
        <main>
            <Header />
            <div className="page">
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default PageLayout