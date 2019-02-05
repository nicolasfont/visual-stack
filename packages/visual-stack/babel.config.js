const presets = [
  [
    "@babel/env",
    {
     "targets": "> 0.25%, not dead",
    },
  ],
    "@babel/preset-react",

];
const plugins = [
    "@babel/plugin-transform-modules-commonjs",
];

module.exports = { presets, plugins };
