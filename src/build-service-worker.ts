import { join as joinPath } from 'path';
import {
  generateSW,
  GenerateSWOptions,
  ManifestTransform,
} from 'workbox-build';

/*
 * Remove all HTML file entries except for the shell. There may be a way to do
 * this purely with globs, but I can't figure it out.
 */
const removeNonShellHtml: ManifestTransform = async (manifestEntries) => {
  let manifest = manifestEntries.filter((manifestEntry) => {
    let isHtml = manifestEntry.url.endsWith('.html');
    if (isHtml) {
      return manifestEntry.url === '__shell.html';
    } else {
      return true;
    }
  });

  return { manifest, warnings: [] };
};

export async function build({ dir }: { dir: string }) {
  let options: GenerateSWOptions = {
    clientsClaim: true,
    globDirectory: dir,
    globPatterns: ['**/*'],
    globIgnores: ['**/*.map', '**/!(__shell)/*.html', 'admin/**'],
    manifestTransforms: [removeNonShellHtml],
    navigateFallback: '/__shell.html',
    skipWaiting: true,
    swDest: joinPath(dir, 'sw.js'),
  };

  // workbox-build resolves paths against the current working directory.
  await generateSW(options);
}
