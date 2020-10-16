import { createWebpackConfig as createPresetWebpackConfig } from '@julienne/react';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TreatPlugin from 'treat/webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
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

export function createWebpackConfig({
  analyze,
  dev,
}: {
  analyze: boolean;
  dev: boolean;
}) {
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
    optimization: {
      splitChunks: {
        name: false,
        maxInitialRequests: 25,
        minSize: 20000,
      },
    },
    performance: {
      maxAssetSize: 300 * 1024,
      maxEntrypointSize: 300 * 1024,
    },
    plugins: [
      new TreatPlugin({
        outputLoaders: [dev ? 'style-loader' : MiniCssExtractPlugin.loader],
      }),
      analyze ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : null,
    ].filter(Boolean),
  });

  return { client, server };
}
