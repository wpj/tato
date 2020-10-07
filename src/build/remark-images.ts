import { join as pathJoin } from 'path';
import { createReadStream } from 'fs';
import hasha from 'hasha';
import type { Store } from 'julienne';
import type { Image } from 'mdast';
import { extname, resolve as resolvePath } from 'path';
import sharp from 'sharp';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import visit from 'unist-util-visit';

function getImagesFromTree(ast: Node) {
  let images: Image[] = [];

  visit(ast, 'image', (imageNode: Image) => {
    images.push(imageNode);
  });

  return images;
}

/**
 * Performs the following operations on images found in markdown files:
 *
 * 1. Generate a hashed URL based on the image file contents
 * 2. Resizes the image
 * 3. Copies the image to the `public/static/images` directory
 * 4. Replaces the original image path with its updated path in `public/static/images`.
 */
export const remarkImages: Plugin = ({
  contentDirectory,
  outputDirectory = '/static/images',
  store,
}:
  | {
      contentDirectory?: string;
      outputDirectory?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store?: Store<any>;
    }
  | undefined = {}) => {
  if (store === undefined) {
    throw new TypeError('options.store is required.');
  }

  if (contentDirectory === undefined) {
    throw new TypeError('options.contentDirectory is required.');
  }

  return transformer;

  async function transformer(ast: Node) {
    let images = getImagesFromTree(ast);

    await Promise.all(
      images.map(async (image) => {
        let imagePath = resolvePath(contentDirectory!, image.url);
        let hash = await hasha.fromFile(imagePath);
        let extension = extname(imagePath);
        let publicFilename = `${hash}${extension}`;

        let publicPath = pathJoin(outputDirectory, publicFilename);

        image.url = publicPath;

        store!.createFile(publicPath, () => {
          let transformer = sharp().resize(300);
          return createReadStream(imagePath).pipe(transformer);
        });
      }),
    );
  }
};
