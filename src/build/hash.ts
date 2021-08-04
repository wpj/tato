import  { readFile } from 'fs/promises';
import { createHash } from 'crypto';

export function hash(input: string | Buffer): string {
  return createHash('md5').update(input).digest('hex').slice(0, 10);
}

export async function fromFile(path: string): Promise<string> {
  let file = await readFile(path, 'utf-8');

  return hash(file);
}
