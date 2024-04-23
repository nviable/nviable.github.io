/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Nviable",
    titleTemplate: "%s | Nviable",
    description: "My name is Saniat Sohrawardi (John). I’m a PhD student at B. Thomas Golisano College of Computing and Information Sciences, RIT",
    url: "https://www.nviable.me",
    image: "seo.png",
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/src/resources/`
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`Poppins`, `Lato`]
        }
      }
    },
    `gatsby-source-fontawesome`,
    `gatsby-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include:`/resources/`
        }
      }
    },
    `gatsby-plugin-layout`
  ],
}
