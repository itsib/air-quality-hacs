import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore';
import { ignoreTextfieldFiles } from './elements/ignore/textfield';
import { ignoreSelectFiles } from './elements/ignore/select';
import { ignoreSwitchFiles } from './elements/ignore/switch';
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
    files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map(file => require.resolve(file)),
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
