import { createReadStream } from 'fs';
import hasha from 'hasha';
import type { Element, Node } from 'hast';
import type { Store } from 'julienne';
import { extname, join as pathJoin, resolve as resolvePath } from 'path';
import sharp from 'sharp';
import type { Plugin } from 'unified';
import h from 'unist-builder';
import visit from 'unist-util-visit';
import { generatePlaceholder } from './placeholder-image';
import { imageSize } from './utils';

function createSrcset(images: { width: number; url: string }[]) {
  return images.map(({ width, url }) => `${url} ${width}w`).join(', ');
}

function style(obj: { [propName: string]: string }): string {
  let result =
    Object.entries(obj)
      .map((entry) => entry.join(':'))
      .join('; ') + ';';

  return result;
}

type Options = {
  contentDirectory?: string;
  maxWidth?: number;
  outputDirectory?: string;
  sizes?: number[];
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
  sizes = [1920, 1280, 640, 320],
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
    let nodes: {
      image: Element;
      placeholder: Element;
      wrapper: Element;
    }[] = [];

    visit(ast, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        let image = node as Element;

        let placeholder: Element = h(
          'element',
          { tagName: 'div', properties: {} },
          [],
        );

        let wrapper: Element = h(
          'element',
          { tagName: 'div', properties: {} },
          [placeholder, image],
        );

        parent!.children[index] = wrapper;

        nodes.push({ image, placeholder, wrapper });
      }
    });

    await Promise.all(
      nodes.map(async ({ image, placeholder, wrapper }) => {
        let imagePath = resolvePath(
          contentDirectory!,
          image.properties!.src as string,
        );
        let hash = await hasha.fromFile(imagePath);
        let extension = extname(imagePath);

        let dimensions = await imageSize(imagePath);
        let { width = 1, height = 1 } = dimensions ?? {};
        let aspectRatio = height / width;

        let placeholderImage = await generatePlaceholder(imagePath);

        let images = sizes.map((width) => {
          let filename = `/${hash}/${width}${extension}`;
          return {
            url: pathJoin(outputDirectory, filename),
            width,
          };
        });

        let src = pathJoin(outputDirectory, `/${hash}/original${extension}`);
        let srcset = createSrcset(images);

        Object.assign(wrapper.properties, {
          style: style({
            'max-width': `${maxWidth}px`,
            'margin-left': 'auto',
            'margin-right': 'auto',
            position: 'relative',
          }),
        });

        Object.assign(placeholder.properties, {
          style: style({
            'background-image': `url("${placeholderImage}")`,
            'background-size': 'cover',
            'padding-bottom': `${aspectRatio * 100}%`,
            bottom: '0',
            left: '0',
            overflow: 'hidden',
            position: 'relative',
          }),
        });

        Object.assign(image.properties, {
          decoding: 'async',
          loading: 'lazy',
          sizes: `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
          src,
          srcset,
          style: style({
            'vertical-align': 'middle',
            height: '100%',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '100%',
          }),
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
