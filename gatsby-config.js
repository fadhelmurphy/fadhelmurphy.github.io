module.exports = {
  siteMetadata: {
    title: `Fadhel Ijlal`,
    description: `Fadhel Murphy's blog`,
    author: `@miripfadhel`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/src/pages`,
      },
    },
    
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-images`,
        options: {
          
        name: `post`,
        path: `${__dirname}/src/pages/posts`,
          maxWidth: 1500,
          withWebp: true,
          showCaptions: true,
          quality: 100,
        },
      },
    ],
  },
},
  //   {
  //     resolve: `gatsby-source-filesystem`,
  //     options: {
  //        path: `${__dirname}/pages/projects`,
  //         name: `projects`,
  //     },
  // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Montserrat:400,600,700,800"],
        },
        timeout: 2000,
      },
      // resolve:`@el7cosmos/gatsby-plugin-prefetch-google-fonts`,
      // options: {
      //   // fonts: [
      //   //   `Montserrat\:400, 400i, 600, 600i, 700, 700i`
      //   // ],
      //   fonts:{
      //     google: [
      //   {
      //     family: `Montserrat`,
      //     variants: [`400`, `600`, `700`, `800`],
      //     //fontDisplay: 'swap',
      //   },
      // ]
      // }
      // },
    },
    "gatsby-plugin-sass",
    `gatsby-plugin-netlify-cms`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: "/",
}
