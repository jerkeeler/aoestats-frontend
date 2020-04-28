require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `aoestats`,
    description: `aoestats aggregates the latest ranked matches for Age of Empires II and provides in-depth statistics on a civilization basis; stats include: win rate, play rate, win rate vs. game length, and more!`,
    author: `@jerkeeler`,
    siteUrl: `https://aoestats.io`,
  },
  plugins: [
    // ====================
    // SITE METADATA
    // ====================
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `aoestats`,
        short_name: `aoestats`,
        start_url: `/`,
        background_color: `#1b96b4`,
        theme_color: `#24d1f8`,
        display: `minimal-ui`,
        icon: `src/images/aoestats.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-108069665-2',
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/contact/success`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        sitemap: `https://timkeeler.net/sitemap.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/contact/success'],
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // =====================
    // STYLING
    // =====================
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({ stage: 0 }),
          require('tailwindcss'),
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true,
        whitelist: [
          'text-stats-high',
          'text-stats',
          'text-stats-low',
          'bg-stats-high',
          'bg-stats-medium',
          'bg-stats-low',
        ], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },

    // =====================
    // CONTENT
    // =====================
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-pg',
      options: {
        connectionString:
          `postgres://${process.env.PG_USER}:` +
          `${process.env.PG_PASS}@${process.env.PG_HOST}:` +
          `${process.env.PG_PORT}/${process.env.PG_DB}`,
        schema: 'public',
        refetchInterval: 60, // Refetch data every 60 seconds
      },
    },
  ],
};
