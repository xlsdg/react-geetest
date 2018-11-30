'use strict';

module.exports = {
  input: 'src/geetest.jsx',
  outDir: 'dist',
  // config: '',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  moduleName: 'Geetest',
  global: {
    'react': 'React'
  },
  filename: '[name][suffix].js',
  name: 'geetest',
  // inline: false,
  // cwd: '',
  external: [
    'react'
  ],
  banner: false,
  postcss: {
    modules: true
  },
  js: 'babel',
  // plugin: ['vue'],
  target: 'browser',
  jsx: 'react',
  // objectAssign: undefined,
  // exports: 'auto',
  // replace: {},
  // alias: {},
  pretty: true
  // env: {},
  // virtualModules: {},
  // sizeLimit: {},
  // extendOptions: {},
};
