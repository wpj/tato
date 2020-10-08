import { Site } from '@julienne/react';
import { promises as fs } from 'fs';
import { safeLoad } from 'js-yaml';
import { Store } from 'julienne';
import type { Root } from 'mdast';
import {
  dirname,
  join as pathJoin,
  resolve as resolvePath,
  sep as pathSeparator,
} from 'path';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter, { YamlNode } from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import sade from 'sade';
import { totalist } from 'totalist';
import unified from 'unified';
import { copyDirectory } from './build/copy-directory';
import { processImages } from './build/process-images';
import { createWebpackConfig } from './build/webpack';

let sharedProps = {
  siteTitle: 'Tato',
};

const templates = {
  index: require.resolve('./pages/index.js'),
  recipe_index: require.resolve('./pages/recipes.js'),
  settings: require.resolve('./pages/settings.js'),
  tag_index: require.resolve('./pages/tags.js'),
  recipe: require.resolve('./templates/recipe/index.js'),
  // tag: require.resolve('./templates/tag/index.js'),
};

function extractFrontmatter<T>(node: Root) {
  let frontmatterNode =
    node.children[0].type === 'yaml'
      ? (node.children.shift() as YamlNode)
      : null;

  return (frontmatterNode !== null
    ? safeLoad(frontmatterNode.value)
    : {}) as Partial<T>;
}

/*
 * Employs a simple caching mechanism to speed up file reads shared between recipe
 * creation and recipe index creation.
 */
let recipeCache = new Map();
async function getAndCreateRecipe(store: Store<Templates>, recipePath: string) {
  if (recipeCache.has(recipePath)) {
    return recipeCache.get(recipePath);
  }

  let resolvedPath = resolvePath(recipePath);

  let contentDirectory = dirname(resolvedPath);

  let markdown = await fs.readFile(resolvedPath, 'utf8');

  let markdownAst = unified()
    .use(remarkParse, {})
    .use(remarkFrontmatter, ['yaml'])
    .parse(markdown);

  let transformedMarkdown = (await unified().run(markdownAst)) as Root;

  let frontmatter = extractFrontmatter<{ tags: string[]; title: string }>(
    transformedMarkdown,
  );

  let hast = await unified()
    .use(remarkToRehype)
    .use(processImages, { store, contentDirectory })
    .run(markdownAst);

  // @ts-ignore
  let html = unified().use(rehypeStringify).stringify(hast);

  let recipe = {
    content: html,
    title: frontmatter.title,
  };

  recipeCache.set(recipePath, recipe);

  return recipe;
}

function slugifyRecipePath(recipePath: string) {
  let slug = recipePath
    .replace(/\/index\.md$/, '')
    .split(pathSeparator)
    .pop();
  return `/recipe/${slug}`;
}

/**
 * Creates a page for each recipe and processes its images.
 */
export async function createRecipePage(
  store: Store<Templates>,
  recipePath: string,
) {
  let slug = slugifyRecipePath(recipePath);
  store.createPage(slug, async () => {
    let { content, title } = await getAndCreateRecipe(store, recipePath);

    return {
      template: 'recipe',
      props: {
        content,
        title,
        ...sharedProps,
      },
    };
  });
}

type Templates = typeof templates;

async function getStore({ dir }: { dir: string }): Promise<Store<Templates>> {
  let store = new Store<Templates>();

  await copyDirectory(store, resolvePath('./static'), '/');

  let recipes: string[] = [];

  await totalist(dir, (_rel, abs) => {
    if (abs.endsWith('.md')) {
      recipes.push(abs);
      createRecipePage(store, abs);
    }
  });

  store.createPage('/', () => ({
    template: 'index',
    props: {
      title: 'Tato',
      ...sharedProps,
    },
  }));

  store.createPage('/recipes/', async () => {
    return {
      template: 'recipe_index',
      props: {
        recipes: [],
        ...sharedProps,
      },
    };
  });

  store.createPage('/tags/', async () => {
    return {
      template: 'tag_index',
      props: {
        tags: [],
        ...sharedProps,
      },
    };
  });

  return store;
}

let prog = sade('tato');

prog
  .command('build')
  .option(
    '--dir -d',
    'Directory containing markdown files to render',
    pathJoin(process.cwd(), 'recipes'),
  )
  .action(async ({ dir }) => {
    let site = new Site({
      dev: false,
      templates,
      webpackConfig: createWebpackConfig({ dev: false }),
    });

    let store = await getStore({ dir: resolvePath(dir) });

    await site.build({ store });
  });

prog
  .command('dev')
  .option(
    '--dir -d',
    'Directory containing markdown files to render',
    pathJoin(process.cwd(), 'recipes'),
  )
  .action(async ({ dir }) => {
    let site = new Site({
      dev: true,
      templates,
      webpackConfig: createWebpackConfig({ dev: true }),
    });

    let store = await getStore({ dir: resolvePath(dir) });

    let port = 3000;
    await site.dev({ port, store });

    console.log(`Started on http://localhost:${port}`);
  });

prog.parse(process.argv);
