import React from "react"
import { social } from "../resources/social"
import "../styles/Footer.scss"

const Footer = () => {
    const links = social.map( (link, i) => {
        const { title, url, icon } = link
        return <li key={"social-link-"+i}><a href={url} target="_blank"><i className={"fab fa-"+icon}></i></a></li>
    })
    return (
        <footer id="footer">
            <ul className="social">
                { links }
            </ul>
        </footer>
    )
}

export default Footer