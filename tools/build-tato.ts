import { build } from 'esbuild';
import { mkdir, readFile } from 'fs/promises';
import { createResolve } from '../src/module';
import { copyDirectory } from '../src/fs';

const resolve = createResolve(import.meta.url);

async function buildApp() {
  const pkg = JSON.parse(await readFile(resolve('../package.json'), 'utf8'));

  let external = [
    ...Object.keys(pkg.dependencies || []),
    ...Object.keys(pkg.peerDependencies || []),
  ].flatMap((pkgName) => [pkgName, `${pkgName}/*`]);

  await build({
    bundle: true,
    entryPoints: [resolve('../src/tato.ts')],
    external,
    format: 'esm',
    outfile: resolve('../dist/tato.js'),
    platform: 'node',
    sourcemap: true,
  });
}

let staticConfig = {
  input: resolve('../src/static'),
  output: resolve('../dist/static'),
};

async function copyStatic() {
  await mkdir(staticConfig.output, { recursive: true });
  await copyDirectory(staticConfig.input, staticConfig.output);
}

async function buildTato() {
  await Promise.all([buildApp(), copyStatic()]);
}

buildTato();
