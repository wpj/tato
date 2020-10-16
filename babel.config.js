module.exports = (api) => {
  let plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ];

  let presets = ['@babel/preset-typescript', '@babel/preset-react'];

  // Don't use preset-env when compiling the CLI or the site components for npm.
  if (!api.env('site') && !api.env('cli')) {
    presets.push([
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
      },
    ]);
  }

  return { plugins, presets };
};
