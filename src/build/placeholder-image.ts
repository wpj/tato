import lqip from 'lqip';

export async function generatePlaceholder(path: string) {
  return lqip.base64(path);
}
