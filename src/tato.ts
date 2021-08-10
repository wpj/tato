import { write } from '@julienne/static';
import { createRenderer } from 'julienne';
import { join as pathJoin, resolve as resolvePath } from 'path';
import type { ComponentType } from 'react';
import sade from 'sade';
import { createConfig, getSite, Template } from './config';
import { copyDirectory } from './fs';
import { createResolve } from './module';
import { build as buildServiceWorker } from './build-service-worker';

let resolve = createResolve(import.meta.url);

let publicDir = resolve('./public');
let outputDir = pathJoin(process.cwd(), './public');

let prog = sade('tato');

prog
  .command('build')
  .option('--dir -d', 'Directory containing markdown files to render')
  .option(
    '--service-worker',
    'Generate a service worker to enable offline access',
    false,
  )
  .action(async (options: { dir: string; 'service-worker': boolean }) => {
    const { dir, 'service-worker': serviceWorker } = options;

    let config = createConfig({ serviceWorker });

    let renderer = await createRenderer(config);
    let site = await getSite(resolvePath(dir));

    await write<ComponentType, Template>({ renderer, site });
    await copyDirectory(publicDir, outputDir);

    if (serviceWorker) {
      await buildServiceWorker({ dir: outputDir });
    }
  });

prog.parse(process.argv);
