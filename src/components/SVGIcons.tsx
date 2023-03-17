import * as React from "react"
import BookReaderIcon from "../content/svgIcons/book-reader"
import ExperienceIcon from "../content/svgIcons/experience"
import Favicon from "../content/svgIcons/favicon"
import LocationIcon from "../content/svgIcons/location"
import MediaIcon from "../content/svgIcons/media"
import ProjectsIcon from "../content/svgIcons/projects"
import ResearchIcon from "../content/svgIcons/research"
import SkillsIcon from "../content/svgIcons/skills"

interface SVGIconProps {
    icon: string
}

export const SVGIcon = ({ icon }: SVGIconProps) => {
    switch (icon) {
        case "research":
            return <ResearchIcon className="svg-icon" />
        case "experience":
            return <ExperienceIcon className="svg-icon" />
        case "media":
            return <MediaIcon className="svg-icon" />
        case "projects":
            return <ProjectsIcon className="svg-icon" />
        case "skills":
            return <SkillsIcon className="svg-icon" />
        case "location":
            return <LocationIcon className="svg-icon" />
        case "book-reader":
            return <BookReaderIcon className="svg-icon" />
        default:
            return <Favicon className="svg-icon" />
    }
}

export default SVGIcon