// @ts-check
import { join as joinPath } from 'path';

let cwd = process.cwd();

/** @type {import('vite').UserConfig} */
export default {
  base: '/admin/',
  build: {
    outDir: joinPath(cwd, 'dist/static/admin'),
  },
  root: joinPath(cwd, 'src/admin'),
};
