const presets = [
  [
    '@babel/env',
    {
      targets: '> 0.25%, not dead, not ie > 0, not ie_mob > 0, not edge > 0',
      exclude: ['transform-regenerator'],
    },
  ],
  '@babel/preset-react',
];
const plugins = [
  '@babel/plugin-transform-modules-commonjs',
  '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
