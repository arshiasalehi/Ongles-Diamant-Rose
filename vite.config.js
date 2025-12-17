import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

function getBaseFromHomepage() {
  try {
    const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));
    const homepage = pkg.homepage;
    if (!homepage) return '/';
    const pathname = new URL(homepage).pathname;
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
  } catch {
    return '/';
  }
}

export default defineConfig({
  base: getBaseFromHomepage(),
  plugins: [react({ include: '**/*.{js,jsx,ts,tsx}' })],
  esbuild: {
    jsx: 'automatic'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js']
  }
});
