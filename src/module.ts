import { dirname, resolve as resolvePath } from 'path';

export function createResolve(url: string) {
  const dir = dirname(new URL(url).pathname);

  return function resolve(path: string) {
    return resolvePath(dir, path);
  };
}
