module.exports = (api) => {
  let isNode = api.env('node');

  return {
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      isNode
        ? ['@babel/preset-env', { targets: { node: 'current' } }]
        : '@babel/preset-env',
    ],
  };
};
