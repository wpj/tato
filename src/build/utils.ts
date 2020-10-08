import { promisify } from 'util';
import { imageSize as _imageSize } from 'image-size';

export const imageSize = promisify(_imageSize);
