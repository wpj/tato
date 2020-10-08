import { createWebpackConfig as createPresetWebpackConfig } from '@julienne/react';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import TreatPlugin from 'treat/webpack-plugin';

export function createWebpackConfig({ dev }: { dev: boolean }) {
  let config = createPresetWebpackConfig({ dev });

  config.server.plugins = config.server.plugins ?? [];
  config.server.plugins.push(new TreatPlugin({ outputCSS: false }));

  config.client.plugins = config.client.plugins ?? [];
  config.client.plugins.push(
    new TreatPlugin({
      outputLoaders: [dev ? 'style-loader' : MiniCssExtractPlugin.loader],
    }),
  );

  return config;
}
