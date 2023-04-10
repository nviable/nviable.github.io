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
    image: `https://www.nviable.me/static/portrait.png`,
    siteUrl: `https://www.nviable.me`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    // "gatsby-plugin-netlify-cms", // interferes with local cms
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          "G-X5R1KNK6HY", // Google Analytics / GA
        ],
        gtagConfig: {
          cookie_expires: 0,
        },
        pluinConfig: {
          head: false,
        },
      },
    },
    "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `pages`,
        // Path to the directory
        path: `./src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    "gatsby-plugin-mdx-source-name",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "blog",
        "path": "./src/content/blog/",
      },
      __key: "blog"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "articles",
        "path": "./src/content/articles/",
      },
      __key: "articles"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "projects",
        "path": "./src/content/projects/",
      },
      __key: "projects"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "blocks",
        "path": "./src/content/blocks/",
      },
      __key: "blocks"
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 0
            }
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // ...
        icon: `src/images/favicon.svg`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
  ]
};

export default config;
