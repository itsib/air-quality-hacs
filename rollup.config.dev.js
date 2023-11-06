import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import litScss from './rollup-plugins/lit-scss';
import clean from 'rollup-plugin-delete';

const plugins = [
  clean({ targets: 'custom_components/air_quality_krasnoyarsk/lovelace/*' }),
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
    targets: [{ src: 'src/images/**/*', dest: 'custom_components/air_quality_krasnoyarsk/lovelace' }],
  }),
];

export default [
  {
    input: 'src/air-quality-krasnoyarsk-card.ts',
    output: {
      dir: 'custom_components/air_quality_krasnoyarsk/lovelace',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
