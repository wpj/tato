import type { Site } from '@julienne/static';
import { join as pathJoin } from 'path';
import { totalist } from 'totalist';

export async function copyDirectory(
  site: Site<string>,
  from: string,
  to: string = '/',
) {
  await totalist(from, (_name, abs) => {
    let publicPath = pathJoin(to, abs.replace(new RegExp(`^${from}`), ''));
    site.copyFile(publicPath, abs);
  });
}
