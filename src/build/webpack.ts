import { createWebpackConfig as createPresetWebpackConfig } from '@julienne/react';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import TreatPlugin from 'treat/webpack-plugin';
import merge from 'webpack-merge';

let urlLoader = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  use: [
    {
      loader: require.resolve('url-loader'),
      options: {
        name: 'static/fonts/[name]-[contenthash].[ext]',
        limit: 1000,
      },
    },
  ],
};

export function createWebpackConfig({ dev }: { dev: boolean }) {
  let config = createPresetWebpackConfig({ dev });

  let server = merge(config.server, {
    module: {
      rules: [urlLoader],
    },
    plugins: [new TreatPlugin({ outputCSS: false })],
  });

  let client = merge(config.client, {
    module: {
      rules: [urlLoader],
    },
    plugins: [
      new TreatPlugin({
        outputLoaders: [dev ? 'style-loader' : MiniCssExtractPlugin.loader],
      }),
    ],
  });

  return { client, server };
}
