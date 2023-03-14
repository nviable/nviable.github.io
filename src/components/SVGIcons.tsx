import * as React from "react"
import BookReaderIcon from "../svgIcons/book-reader"
import ExperienceIcon from "../svgIcons/experience"
import Favicon from "../svgIcons/favicon"
import LocationIcon from "../svgIcons/location"
import MediaIcon from "../svgIcons/media"
import ProjectsIcon from "../svgIcons/projects"
import ResearchIcon from "../svgIcons/research"
import SkillsIcon from "../svgIcons/skills"

interface SVGIconProps {
    icon: string
}

export const SVGIcon = ({ icon }: SVGIconProps) => {
    switch (icon) {
        case "research":
            return <ResearchIcon />
        case "experience":
            return <ExperienceIcon />
        case "media":
            return <MediaIcon />
        case "projects":
            return <ProjectsIcon />
        case "skills":
            return <SkillsIcon />
        case "location":
            return <LocationIcon />
        case "book-reader":
            return <BookReaderIcon />
        default:
            return <Favicon />
    }
}

export default SVGIcon