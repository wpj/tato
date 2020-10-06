const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const { paramCase } = require('change-case');
const { createFilePath } = require(`gatsby-source-filesystem`);

let netlifyCmsAdminConfigTemplate = `
backend:
  name: git-gateway
  branch: main

media_folder: static/img
public_folder: /img

collections:
  - name: 'recipe'
    label: 'Recipe'
    folder: '__CONTENT_PATH__'
    create: true
    slug: 'index'
    media_folder: ''
    public_folder: ''
    path: '{{title}}/index'
    editor:
      preview: false
    fields:
      - label: 'Title'
        name: 'title'
        widget: 'string'

      - label: 'Tags'
        name: 'tags'
        widget: 'list'
        required: false

      - label: 'Source'
        name: 'source'
        widget: 'string'
        required: false

      - label: 'Body'
        name: 'body'
        widget: 'markdown'
`;

exports.onPreBootstrap = (
  { reporter },
  { contentPath = 'recipes', icon = `assets/icon.png` },
) => {
  if (!fs.existsSync(contentPath)) {
    reporter.info(
      `creating the ${contentPath} directory & populating with example content`,
    );

    fs.mkdirSync(contentPath, { recursive: true });

    fse.copySync(path.join(__dirname, 'content/recipes'), contentPath);
  }

  if (!fs.existsSync(icon)) {
    reporter.info(`creating default icon at ${icon}`);

    let dir = path.dirname(icon);

    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(path.join(__dirname, 'content/assets/icon.png'), icon);
  }

  // Write the updated netlfiy-cms config
  let netlifyCmsAdminConfig = netlifyCmsAdminConfigTemplate.replace(
    '__CONTENT_PATH__',
    contentPath,
  );
  fs.writeFileSync(
    `${__dirname}/static/admin/config.yml`,
    netlifyCmsAdminConfig,
    'utf8',
  );
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const recipeTemplate = require.resolve(`./src/templates/recipe/index.tsx`);
  const tagTemplate = require.resolve(`./src/templates/tag/index.tsx`);

  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }

        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create notes pages.
  const recipes = result.data.allMarkdownRemark.edges;

  recipes.forEach((recipe) => {
    createPage({
      path: recipe.node.fields.slug,
      component: recipeTemplate,
      context: {
        slug: recipe.node.fields.slug,
      },
    });
  });

  const tags = result.data.tagsGroup.group;

  tags.forEach((tag) => {
    createPage({
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
      path: `/tag/${paramCase(tag.fieldValue)}/`,
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `/recipe${slug}`,
    });
  }
};
