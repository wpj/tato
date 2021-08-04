import { mkdir, copyFile } from 'fs/promises';
import * as path from 'path';
import { totalist } from 'totalist';

export async function copyDirectory(from: string, to: string) {
  let paths: string[] = [];
  await totalist(from, (_name, abs) => {
    if (path.basename(abs).startsWith('.')) {
      return;
    }

    paths.push(abs);
  });

  await Promise.all(
    paths.map(async (fromPath) => {
      let toPath = fromPath.replace(new RegExp(`^${from}`), to);

      await mkdir(path.dirname(toPath), { recursive: true });
      await copyFile(fromPath, toPath);
    }),
  );
}
