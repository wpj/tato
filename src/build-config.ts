import type { UserConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { createConfig } from './config';

let viteConfig: UserConfig = {
  plugins: [vanillaExtractPlugin(), reactRefresh()],
};

let config = createConfig({ serviceWorker: false });

let buildConfig = {
  ...config,
  viteConfig: {
    ...config.viteConfig,
    ...viteConfig,
  },
};

export { buildConfig as config };
