import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faGithub,
    faLinkedin,
    faTwitter,
    faSteam,
    faOrcid,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'
import {
    faBookmark
} from '@fortawesome/free-regular-svg-icons'


interface dataProps {
    allMdx: {
        nodes: Array<{
            id: string
            frontmatter: {
                socials: {
                    name: string
                    url: string
                }[]
            }
        }>
    }
}

const Footer = () => {
    const data: dataProps = useStaticQuery(graphql`
        query {
            allMdx(
                filter: {
                    fields: {source: {eq: "blocks"}}, 
                    frontmatter: {slug: {eq: "footer"}}
                }) {
                nodes {
                    id
                    frontmatter {
                        socials {
                            name
                            url
                        }
                    }
                }
            }
        }
    `)

    const socialLinks = data.allMdx.nodes[0].frontmatter.socials.map((social, index) => {
        const { name, url } = social
        let icon = null
        switch (name) {
            case 'facebook':
                icon = <FontAwesomeIcon icon={faFacebook} />
                break
            case 'github':
                icon = <FontAwesomeIcon icon={faGithub} />
                break
            case 'linkedin':
                icon = <FontAwesomeIcon icon={faLinkedin} />
                break
            case 'twitter':
                icon = <FontAwesomeIcon icon={faTwitter} />
                break
            case 'steam':
                icon = <FontAwesomeIcon icon={faSteam} />
                break
            case 'orcid':
                icon = <FontAwesomeIcon icon={faOrcid} />
                break
            case 'instagram':
                icon = <FontAwesomeIcon icon={faInstagram} />
                break
            case 'google-scholar':
                icon = <FontAwesomeIcon icon={faBookmark} />
                break
            default:
                icon = <FontAwesomeIcon icon={faBookmark} />
                break
        }
        return (
            <li key={index} className="social-link">
                <a href={url} target="_blank">
                    {icon}
                </a>
            </li>
        )
    })

    return (
        <footer>
            <div className="container">
                <ul className="social-links">
                    {socialLinks}
                </ul>
            </div>
        </footer>
    )
}

export default Footer