import PeerDepsExternal from 'rollup-plugin-peer-deps-external';
import PostCss from 'rollup-plugin-postcss';
import Babel from 'rollup-plugin-babel';
import NodeResolve from 'rollup-plugin-node-resolve';
import Commonjs from 'rollup-plugin-commonjs';
import BabelMinify from 'rollup-plugin-babel-minify';

import pkg from './package.json';

export default {
  input: pkg.source,
  output: [{
    name: 'Geetest',
    file: pkg.main,
    format: 'cjs',
    sourcemap: true
  }, {
    name: 'Geetest',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true,
    globals: {
      'react': 'React'
    }
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  }],
  external: [
    'react'
  ],
  plugins: [
    PeerDepsExternal(),
    PostCss({
      modules: true
    }),
    Babel({
      exclude: 'node_modules/**'
    }),
    NodeResolve(),
    Commonjs(),
    BabelMinify({
      comments: false,
      sourceMap: true
    })
  ]
};
