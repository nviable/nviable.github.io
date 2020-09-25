import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Card = ({children, url=null, className="", year=null, img=null, title=null, learnMore=false}) => {

    return (
        <Link className={["paper-card card", className, learnMore ? " has-learn-more": null].join(" ")} to={url}>
            {img ? <div className="card-image-container"><Img className="card-image" fluid={img} alt={title} /></div> : null}
            {year ? <span className="year">{year}</span> : null}
            <div className="card-content">
                { title ? <h3>{title}</h3> : null}
                <p>{children}</p>
            </div>
            {learnMore ? <span className="learn-more">Learn More</span> : null}
        </Link>
    )
}

export default Card