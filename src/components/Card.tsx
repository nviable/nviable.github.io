import { Link } from 'gatsby-link'
import React from 'react'
import SVGIcon from './SVGIcons'

interface CardProps {
    title: string
    children: React.ReactNode
    link?: string
    icon?: string
    expand?: boolean
}

// Card element accepts a title, children, optional link, optional icon, and optional expansion boolean
// If the card is expanded, it will show all children
// If the card is not expanded, it will only show the first child
// If the card is expandable, it will show an expand bar at the bottom
// If the card is not expandable, it will not show an expand bar

const Card = ({ title, link, expand, icon, children }: CardProps) => {
    const [expanded, setExpanded] = React.useState(false)

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    const expandBar = (
        <div className="expand-bar" onClick={toggleExpand}>Expand</div>
    )

    const content = (
        <div className="card">
            {icon && <SVGIcon icon={icon} />}
            <h3>{title}</h3>
            <div className="card-content">
                {expand && !expanded ? React.Children.map(children, (child, index) => {
                    if (index === 0) return child
                    return null
                }) : children}
            </div>
            {expand && expandBar}
            {link && <Link to={link} className="card-link">Read More</Link>}
        </div>
    )
    return content
}

export default Card