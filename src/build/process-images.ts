import { createReadStream } from 'fs';
import hasha from 'hasha';
import type { Node } from 'hast';
import { selectAll } from 'hast-util-select';
import type { Store } from 'julienne';
import { extname, join as pathJoin, resolve as resolvePath } from 'path';
import sharp from 'sharp';
import type { Plugin } from 'unified';

const widths = [1920, 1280, 640, 320];

function createSrcset(images: { width: number; url: string }[]) {
  return images.map(({ width, url }) => `${url} ${width}w`).join(', ');
}

type Options = {
  contentDirectory?: string;
  maxWidth?: number;
  outputDirectory?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store?: Store<any>;
};

/**
 * Performs the following operations on images found in markdown files:
 *
 * 1. Generate a hashed URL based on the image file contents
 * 2. Resizes the image
 * 3. Copies the image to the `public/static/images` directory
 * 4. Replaces the original image path with its updated path in `public/static/images`.
 */
export const processImages: Plugin = ({
  maxWidth = 590,
  contentDirectory,
  outputDirectory = '/static/images',
  store,
}: Options | undefined = {}) => {
  if (store === undefined) {
    throw new TypeError('options.store is required.');
  }

  if (contentDirectory === undefined) {
    throw new TypeError('options.contentDirectory is required.');
  }

  return transformer;

  async function transformer(ast: Node) {
    let imageNodes = selectAll('img', ast);

    await Promise.all(
      imageNodes.map(async (image) => {
        let imagePath = resolvePath(
          contentDirectory!,
          image.properties!.src as string,
        );
        let hash = await hasha.fromFile(imagePath);
        let extension = extname(imagePath);

        let images = widths.map((width) => {
          let filename = `/${hash}/${width}${extension}`;
          return {
            url: pathJoin(outputDirectory, filename),
            width,
          };
        });

        let src = pathJoin(outputDirectory, `/${hash}/original${extension}`);
        let srcset = createSrcset(images);
        Object.assign(image.properties, {
          decoding: 'async',
          loading: 'lazy',
          sizes: `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
          src,
          srcset,
          style: `display: block; margin: 0 auto; max-width: ${maxWidth}px;`,
        });

        images.forEach(({ width, url }) => {
          store!.createFile(url, () => {
            let transformer = sharp().resize(width);
            return createReadStream(imagePath).pipe(transformer);
          });
        });
      }),
    );
  }
};
