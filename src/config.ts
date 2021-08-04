import { Site } from '@julienne/static';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { UserConfig } from 'julienne';
import type { Root } from 'mdast';
import { paramCase } from 'param-case';
import { dirname, resolve as resolvePath, sep as pathSeparator } from 'path';
import type { ComponentType } from 'react';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter, { YamlNode } from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import { totalist } from 'totalist';
import unified from 'unified';
import { copyDirectory } from './build/copy-directory';
import { hash } from './build/hash';
import { processImages } from './build/process-images';
import { createResolve } from './module';
import { createJsonSlug } from './shared/helpers';
import type { IndexData } from './site/components/search/types';
import { render } from './ssr';

let resolve = createResolve(import.meta.url);

let output = {
  internal: resolve('../dist/.julienne'),
  public: resolve('../dist/public'),
};

const templates = {
  index: resolve('./site/templates/index.tsx'),
  recipe: resolve('./site/templates/recipe.tsx'),
  recipes: resolve('./site/templates/recipes.tsx'),
  search: resolve('./site/templates/search.tsx'),
  settings: resolve('./site/templates/settings.tsx'),
  tag: resolve('./site/templates/tag.tsx'),
  tags: resolve('./site/templates/tags.tsx'),
};

export type Template = keyof typeof templates;

export let config: UserConfig<ComponentType, Template> = {
  // experimental: {
  //   partialHydration: {
  //     flags: ['export const hydrate = true;'],
  //     wrap: resolve('./wrap.ts'),
  //   },
  // },
  output,
  render: {
    client: resolve('./site/render.tsx'),
    server: render,
  },
  templates,
};

let sharedProps = {
  siteTitle: 'Tato',
};

function extractFrontmatter<T>(node: Root) {
  let frontmatterNode =
    node.children[0].type === 'yaml'
      ? (node.children.shift() as YamlNode)
      : null;

  return (
    frontmatterNode !== null ? load(frontmatterNode.value) : {}
  ) as Partial<T>;
}

type Recipe = {
  html: string;
  slug: string;
  source: string | null;
  tags: string[];
  title: string;
};

/*
 * Employs a simple caching mechanism to speed up file reads shared between recipe
 * creation and recipe index creation.
 */
let recipeCache = new Map();

async function getAndCreateRecipe(
  site: Site<Template>,
  recipePath: string,
): Promise<Recipe> {
  if (recipeCache.has(recipePath)) {
    return recipeCache.get(recipePath);
  }

  let resolvedPath = resolvePath(recipePath);

  let contentDirectory = dirname(resolvedPath);

  let markdown = await readFile(resolvedPath, 'utf8');

  let markdownAst = unified()
    .use(remarkParse, {})
    .use(remarkFrontmatter, ['yaml'])
    .parse(markdown);

  let transformedMarkdown = (await unified().run(markdownAst)) as Root;

  let frontmatter = extractFrontmatter<{
    source: string;
    tags: string[];
    title: string;
  }>(transformedMarkdown);

  let hast = await unified()
    .use(remarkToRehype)
    .use(processImages, { site, contentDirectory })
    .run(markdownAst);

  let html = unified().use(rehypeStringify).stringify(hast);

  let recipe = {
    html,
    slug: slugifyRecipePath(recipePath),
    source: frontmatter.source ?? null,
    tags: frontmatter.tags ?? [],
    title: frontmatter.title ?? '',
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

function slugifyTag(tag: string): string {
  return `/tag/${paramCase(tag)}/`;
}

export async function getSite(dir: string): Promise<Site<Template>> {
  let site = new Site<Template>();

  function createPageAndPageJson(
    slug: string,
    getPage: Parameters<typeof site.createPage>[1],
  ) {
    site.createPage(slug, getPage);
    site.createFile(createJsonSlug(slug), async () =>
      JSON.stringify(await getPage()),
    );
  }

  await copyDirectory(site, resolve('./static'), '/');

  let recipePaths: string[] = [];

  await totalist(dir, (_rel, abs) => {
    if (abs.endsWith('.md')) {
      recipePaths.push(abs);
    }
  });

  let tags = new Map();

  let recipes = await Promise.all(
    recipePaths.map(async (path) => {
      let recipe = await getAndCreateRecipe(site, path);

      recipe.tags.forEach((tagName: string) => {
        let tag = tags.get(tagName) ?? {
          name: tagName,
          count: 0,
          slug: slugifyTag(tagName),
          recipes: [],
        };

        tag.count += 1;

        tag.recipes.push({
          title: recipe.title,
          slug: recipe.slug,
        });

        tags.set(tagName, tag);
      });

      return recipe;
    }),
  );

  createPageAndPageJson('/', () => ({
    template: 'index',
    props: {
      title: 'Tato',
      ...sharedProps,
    },
  }));

  recipes.forEach((recipe) => {
    createPageAndPageJson(recipe.slug, () => ({
      template: 'recipe',
      props: {
        content: recipe.html,
        title: recipe.title,
        ...sharedProps,
      },
    }));
  });

  tags.forEach((tag) => {
    createPageAndPageJson(tag.slug, () => ({
      template: 'tag',
      props: {
        ...tag,
        recipes: tag.recipes,
      },
    }));
  });

  createPageAndPageJson('/recipes/', async () => {
    return {
      template: 'recipes',
      props: {
        recipes,
        ...sharedProps,
      },
    };
  });

  createPageAndPageJson('/tags/', async () => {
    return {
      template: 'tags',
      props: {
        tags: Array.from(tags.values()),
        ...sharedProps,
      },
    };
  });

  let searchIndexData: IndexData = {
    documents: recipes.map((recipe) => ({
      source: recipe.source,
      tags: recipe.tags,
      slug: recipe.slug,
      title: recipe.title,
    })),
    indexFields: ['content', 'source', 'tags', 'title'],
  };

  let searchIndexString = JSON.stringify(searchIndexData);

  let searchIndexHash = hash(searchIndexString);

  let searchIndexPath = `/search/index-${searchIndexHash}.json`;

  site.createFile(searchIndexPath, () => searchIndexString);

  createPageAndPageJson('/search/', () => ({
    template: 'search',
    props: {
      searchIndexPath,
      ...sharedProps,
    },
  }));

  return site;
}
