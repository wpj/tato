import { write } from '@julienne/static';
import { createRenderer } from 'julienne';
import { join as pathJoin, resolve as resolvePath } from 'path';
import type { ComponentType } from 'react';
import sade from 'sade';
import { config, getSite, Template } from './config';
import { copyDirectory } from './fs';
import { createResolve } from './module';

let resolve = createResolve(import.meta.url);

let publicDir = resolve('./public');
let outputDir = pathJoin(process.cwd(), './public');

let prog = sade('tato');

prog
  .command('build')
  .option('--dir -d', 'Directory containing markdown files to render')
  .action(async ({ dir }: { dir: string }) => {
    let renderer = await createRenderer(config);
    let site = await getSite(resolvePath(dir));

    await write<ComponentType, Template>({ renderer, site });
    await copyDirectory(publicDir, outputDir);
  });

prog.parse(process.argv);
