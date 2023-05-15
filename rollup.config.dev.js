import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore';
import { ignoreTextfieldFiles } from './elements/ignore/textfield';
import { ignoreSelectFiles } from './elements/ignore/select';
import { ignoreSwitchFiles } from './elements/ignore/switch';
import copy from 'rollup-plugin-copy';

export default {
  input: ['src/air-quality-card.ts'],
  moduleContext: id => {
    if (id.includes('@formatjs/intl-utils/lib/src/diff') || id.includes('@formatjs/intl-utils/lib/src/resolve-locale')) {
      return 'window';
    }
    return undefined;
  },
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    resolve(),
    typescript(),
    json(),
    copy({
      targets: [{ src: 'src/icons/**/*', dest: 'custom_components/air_quality/lovelace' }],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    ignore({
      files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map(file => require.resolve(file)),
    }),
  ],
};
