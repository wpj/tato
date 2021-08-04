import type { UserConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { config } from './config';

let viteConfig: UserConfig = {
  plugins: [vanillaExtractPlugin(), reactRefresh()],
};

let buildConfig = {
  ...config,
  viteConfig: {
    ...config.viteConfig,
    ...viteConfig,
  },
};

export { buildConfig as config }
