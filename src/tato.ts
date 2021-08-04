import type { ComponentType } from 'react';
import { write } from '@julienne/static';
import { createRenderer } from 'julienne';
import { join as pathJoin, resolve as resolvePath } from 'path';
import sade from 'sade';
import { config, getSite, Template } from './config';
import { createResolve } from './module';
import { copyDirectory } from './fs';

let resolve = createResolve(import.meta.url);

let publicDir = resolve('./public');
let outputDir = pathJoin(process.cwd(), './public');

let prog = sade('tato');

prog
  .command('build')
  .option(
    '--dir -d',
    'Directory containing markdown files to render',
    pathJoin(process.cwd(), 'recipes'),
  )
  .action(async ({ dir }: { dir: string }) => {
    let renderer = await createRenderer(config);
    let site = await getSite(resolvePath(dir));

    await write<ComponentType, Template>({ renderer, site });
    await copyDirectory(publicDir, outputDir);
  });

prog.parse(process.argv);
