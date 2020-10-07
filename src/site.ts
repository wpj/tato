import { createWebpackConfig, Site } from '@julienne/react';
import { Store } from 'julienne';
import { resolve as resolvePath } from 'path';
import sade from 'sade';
import { copyDirectory } from './build/copy-directory';
// @ts-ignore
import TreatPlugin from 'treat/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const templates = {
  index: require.resolve('./pages/index.tsx'),
  recipe_index: require.resolve('./pages/recipes.tsx'),
  settings: require.resolve('./pages/settings.tsx'),
  tag_index: require.resolve('./pages/tags.tsx'),
  // recipe: require.resolve('./templates/recipe/index.tsx'),
  // tag: require.resolve('./templates/tag/index.tsx'),
};

type Templates = typeof templates;

function getStore(): Store<Templates> {
  let store = new Store<Templates>();

  copyDirectory(store, resolvePath('./static'), '/');

  store.createPage('/', () => ({
    template: 'index',
    props: {
      title: 'Tato',
    },
  }));

  store.createPage('/recipes/', async () => {
    return {
      template: 'recipe_index',
      props: {
        recipes: [],
        siteTitle: 'Tato',
      },
    };
  });

  store.createPage('/tags/', async () => {
    return {
      template: 'tag_index',
      props: {
        tags: [],
        siteTitle: 'Tato',
      },
    };
  });

  return store;
}

function webpackConfig({ dev }: { dev: boolean }) {
  let config = createWebpackConfig({ dev });
  config.client.plugins = config.client.plugins || [];
  config.client.plugins.push(
    new TreatPlugin({
      outputLoaders: dev ? undefined : [MiniCssExtractPlugin.loader],
    }),
  );

  config.server.plugins = config.server.plugins || [];
  config.server.plugins.push(
    new TreatPlugin({
      outputCSS: false,
    }),
  );

  return config;
}

let prog = sade('tato');

prog.command('build').action(async () => {
  let site = new Site({
    templates,
    webpackConfig: webpackConfig({ dev: false }),
  });

  let store = getStore();

  await site.build({ store });
});

prog.command('dev').action(async () => {
  let site = new Site({
    dev: true,
    templates,
    webpackConfig: webpackConfig({ dev: true }),
  });

  let store = getStore();

  let port = 3000;
  await site.dev({ port, store });

  console.log(`Started on http://localhost:${port}`);
});

prog.parse(process.argv);
