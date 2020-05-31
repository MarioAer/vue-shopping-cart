import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;
const port = 8080;

export default {
  input: 'src/main.js',
  output: {
    file: 'public/assets/app.js',
    format: 'iife',
    sourcemap: false,
    name: 'app',
    globals: {
      axios: 'axios',
    },
  },
  plugins: [
    postcss({ extract: true }),
    vue({ css: false }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve(),
    commonjs(),
    esbuild({
      minify: production,
      target: 'es2015',
    }),
    !production &&
      serve({
        contentBase: 'public',
        historyApiFallback: true,
        port,
      }),
    !production && livereload({ watch: 'public' }),
  ],
};
