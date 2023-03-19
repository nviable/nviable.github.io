import { Link } from 'gatsby-link'
import React from 'react'
import SVGIcon from './SVGIcons'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDXProvider } from '@mdx-js/react'

interface CardProps {
    title: string
    children: React.ReactNode
    link?: string
    icon?: string
    expand?: boolean
    extraClass?: string
    excerpt?: string | null
}

// Card element accepts a title, children, optional link, optional icon, and optional expansion boolean
// If the card is expanded, it will show all children
// If the card is not expanded, it will only show the first child
// If the card is expandable, it will show an expand bar at the bottom
// If the card is not expandable, it will not show an expand bar

const Card = ({ title, link, expand, icon, children, extraClass, excerpt }: CardProps) => {
    const [expanded, setExpanded] = React.useState(false)

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    const expandBar = expanded ? (
        <div className="bottom-bar expanded" onClick={toggleExpand}>
            <FontAwesomeIcon icon={faArrowAltCircleDown} rotation={180} className="grey-icon" />
            collapse
        </div>
    ) : <div className="bottom-bar" onClick={toggleExpand}>
        <FontAwesomeIcon icon={faArrowAltCircleDown} className="grey-icon" />
        expand
    </div>

    const cardClasses = ['card']
    if (expand) cardClasses.push('expandable')
    if (expanded) cardClasses.push('expanded')
    if (link) cardClasses.push('read-more')
    if (extraClass) cardClasses.push(extraClass)
    if (icon && extraClass !== 'card-half') cardClasses.push('has-icon')

    let innerContent = children
    if (expand) {
        if (!expanded && excerpt) {
            innerContent = excerpt
        } else if (!expanded) {
            innerContent = React.Children.map(children, (child, index) => {
                if (index === 0) return child
                return null
            })
        }
    }

    const content = (
        <div className={cardClasses.join(" ")}>
            {icon && extraClass !== 'card-half' && <SVGIcon icon={icon} />}
            <div className="card-content">
                <h3>{title}</h3>
                {innerContent}
            </div>
            {expand && expandBar}
            {link && <div className="bottom-bar"><Link to={link}>Read More</Link></div>}
        </div>
    )
    return content
}

export default Card