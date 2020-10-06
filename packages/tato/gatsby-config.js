const pkg = require('./package.json');
const child_process = require('child_process');

module.exports = ({
  contentPath = 'recipes',
  icon = `assets/icon.png`,
  name = 'Tato',
}) => {
  let commitSha = child_process
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

  return {
    siteMetadata: {
      commit: commitSha,
      description: `An offline application for browsing recipes`,
      themeVersion: pkg.version,
      title: name,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
          name: `recipes`,
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
              },
            },
            {
              resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
              },
            },
            `gatsby-remark-copy-linked-files`,
            `gatsby-remark-smartypants`,
          ],
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name,
          short_name: name,
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon,
          cache_busting_mode: `none`,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-treat`,

      {
        resolve: `gatsby-plugin-offline`,
        options: {
          workboxConfig: {
            globPatterns: ['**/*'],
            globIgnores: ['admin/**/*'],
            ignoreURLParametersMatching: [/.*/],
            runtimeCaching: [],
          },
        },
      },

      // NOTE: CMS previews disabled for now since treat isn't playing well with
      // gatsby-plugin-typescript.
      {
        resolve: `gatsby-plugin-netlify-cms`,
        // options: {
        //   modulePath: `${__dirname}/src/cms/cms.ts`,
        // },
      },
    ],
  };
};
