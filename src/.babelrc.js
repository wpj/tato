let plugins = [
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
];

let presets = [
  '@babel/preset-typescript',
  '@babel/preset-react',
  ['@babel/preset-env', { targets: { node: 'current' } }],
];

module.exports = {
  plugins,
  presets,
};
