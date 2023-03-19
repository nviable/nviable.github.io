import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  title: string
  description: string
  twitterUsername: string
  image: string
  siteUrl: string
  icon?: string
}

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            title
            description
            twitterUsername
            image
            siteUrl
          }
        }
        allFile(
          limit: 1
          filter: {
              name: { eq: "favicon" }
              ext: { eq: ".svg" }
              sourceInstanceName: { eq: "images" }
              relativeDirectory: { eq: "" }
          }
        ) {
            nodes {
                publicURL
            }
        }
      }
      
    `)
  return {
    ...data.site.siteMetadata,
    icon: data.allFile.nodes[0].publicURL
  }
}