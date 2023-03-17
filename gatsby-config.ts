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
    icon: `<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="37" cy="37" r="37" fill="#DDDDDD"/>
    <path d="M12.1697 57C12.006 57 11.8188 56.9531 11.655 56.8828C11.2573 56.6954 11 56.2737 11 55.8285V30.0553C11 30.0553 11 30.0553 11 30.0318C11 29.7507 11.117 29.4695 11.3041 29.2821C11.3275 29.2586 11.3509 29.2118 11.3977 29.1884C11.4211 29.1649 11.4445 29.1415 11.4679 29.1415L27.6101 16.2549C28.0312 15.9269 28.6394 15.9034 29.0605 16.2549L44.6413 28.5557L60.1284 16.2549C60.4794 15.9737 60.9706 15.9269 61.3683 16.1143C61.7661 16.3017 62 16.7235 62 17.1687V42.9419C62 43.2465 61.883 43.5042 61.6959 43.7151C61.6725 43.7385 61.6491 43.7854 61.6023 43.8088C61.5789 43.8322 61.5555 43.8557 61.5321 43.8557L45.3899 56.7423C44.9688 57.0703 44.3606 57.0937 43.9395 56.7423L28.3821 44.418L12.895 56.7423C12.6844 56.9063 12.4271 57 12.1697 57ZM30.3005 42.9184L44.6881 54.329L58.9587 42.9419L44.6179 31.5548L30.3005 42.9184ZM13.3394 32.4686V53.3917L26.5339 42.9184L13.3394 32.4686ZM14.0413 30.0553L28.4055 41.4423L42.7229 30.0553L28.3119 18.6682L14.0413 30.0553ZM46.4894 30.0553L59.6606 40.5286V19.582L46.4894 30.0553Z" fill="url(#paint0_linear_227_216)"/>
    <defs>
    <linearGradient id="paint0_linear_227_216" x1="11" y1="34" x2="62" y2="36" gradientUnits="userSpaceOnUse">
    <stop stop-color="#123CFF"/>
    <stop offset="1" stop-color="#FF0052"/>
    </linearGradient>
    </defs>
    </svg>
    `
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
        "name": "research",
        "path": "./src/content/research/",
      },
      __key: "research"
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
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "publicity",
        "path": "./src/content/publicity/",
      },
      __key: "publicity"
    },
    "gatsby-plugin-mdx",
  ]
};

export default config;
