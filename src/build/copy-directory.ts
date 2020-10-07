import type { Store } from 'julienne';
import { join as pathJoin } from 'path';
import { totalist } from 'totalist';

export async function copyDirectory(
  store: Store<any>,
  from: string,
  to: string = '/',
) {
  await totalist(from, (_name, abs) => {
    let publicPath = pathJoin(to, abs.replace(new RegExp(`^${from}`), ''));
    store.copyFile(publicPath, abs);
  });
}
