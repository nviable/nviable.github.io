import React from "react"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

interface SeoProps {
    title?: string
    description?: string
    pathname?: string
    children?: React.ReactNode
}

export const SEO = ({ title, description, pathname, children }: SeoProps) => {
    const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername, icon } = useSiteMetadata()

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image}`,
        url: `${siteUrl}${pathname || ``}`,
        twitterUsername: twitterUsername,
        icon: icon
    }

    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            <meta name="twitter:creator" content={seo.twitterUsername} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:site_name" content={seo.title} />
            <meta property="og:locale" content="en_US" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="google" content="nositelinkssearchbox" />
            <meta name="google" content="notranslate" />
            <meta name="google" content="nocache" />
            <link rel="icon" href={seo.icon} />
            {children}
        </>
    )
}

