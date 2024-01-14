// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    // environmentMatchGlobs: [['./src/http/controllers/**', 'prisma']],
    // environmentMatchGlobs: [['src/http/controllers/**/*', 'prisma']],
    // dir: 'src',
  },
});
