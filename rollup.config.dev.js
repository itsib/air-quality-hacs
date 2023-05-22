import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import litScss from './rollup-plugins/lit-scss';

const plugins = [
  resolve({ browser: true }),
  commonjs(),
  typescript(),
  litScss({
    minify: false,
    options: { loadPaths: ['node_modules'] },
  }),
  json(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  copy({
    targets: [{ src: 'src/images/**/*', dest: 'custom_components/air_quality/lovelace' }],
  }),
];

export default [
  {
    input: 'src/air-quality-card.ts',
    output: {
      dir: 'custom_components/air_quality/lovelace',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
