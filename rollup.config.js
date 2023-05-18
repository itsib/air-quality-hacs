import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore';
import copy from 'rollup-plugin-copy';

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  terser(),
  ignore({
    debug: true,
    files: [
      `${__dirname}/node_modules/@material/mwc-ripple/mwc-ripple.js`,
      `${__dirname}/node_modules/@material/mwc-menu/mwc-menu.js`,
      `${__dirname}/node_modules/@material/mwc-menu/mwc-menu-surface.js`,
      `${__dirname}/node_modules/@material/mwc-list/mwc-list.js`,
      `${__dirname}/node_modules/@material/mwc-list/mwc-list-item.js`,
      `${__dirname}/node_modules/@material/mwc-icon/mwc-icon.js`,
      `${__dirname}/node_modules/@material/mwc-notched-outline/mwc-notched-outline.js`,
    ],
  }),
  copy({
    targets: [{ src: 'src/icons/**/*', dest: 'custom_components/air_quality/lovelace' }],
  }),
];

export default [
  {
    input: 'src/air-quality-card.ts',
    moduleContext: id => {
      if (id.includes('@formatjs/intl-utils/lib/src/diff') || id.includes('@formatjs/intl-utils/lib/src/resolve-locale')) {
        return 'window';
      }
      return undefined;
    },
    output: {
      dir: 'custom_components/air_quality/lovelace',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
