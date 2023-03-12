import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nviable`,
    description: `I am a PhD student in the Department of Cybersecurity at the Rochester Institute \
        of Technology. My research interests include Human-Computer Interaction, Computer Vision, \
        Cybersecurity, and Ethics. My current work involves building deepfake detection systems for \
        journalists and forensic analysts.`,
    twitterUsername: `@johnsohrawardi`,
    instagramUsername: `nviable`,
    steamUsername: `nviable`,
    githubUsername: `nviable`,
    orcidNumber: `0000-0002-4707-7035`,
    linkedinUsername: `sohrawardi`,
    twitchUsername: `nviable`,
    image: `https://www.yourdomain.tld/static/your-image.png`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-netlify-cms", "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          "G-XXXXXXXXXX", // Google Analytics / GA
        ],
        gtagConfig: {
          cookie_expires: 0,
        },
        pluinConfig: {
          head: true,
        },
      },
    },
    "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }
  ]
};

export default config;
