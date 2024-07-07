import { defineWorkersProject, readD1Migrations } from '@cloudflare/vitest-pool-workers/config';
import path from 'path';

export default defineWorkersProject(async () => {
  const migrationsPath = path.join(__dirname, 'drizzle/migrations');
  const migrations = await readD1Migrations(migrationsPath);
  return {
    test: {
      setupFiles: ['./test/setup.ts'],
      globals: true,
      poolOptions: {
        workers: {
          singleWorker: true,
          isolatedStorage: false,
          miniflare: {
            compatibilityFlags: ['nodejs_compat', 'rpc'],
            compatibilityDate: '2024-04-01',
            d1Databases: ['DB'],
            bindings: { TEST_MIGRATIONS: migrations },
          },
        },
      },
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      coverage: {
        provider: 'istanbul',
        reportsDirectory: './coverage',
        reporter: ['text', 'html'],
        include: ['src/app/api/**/*.ts'],
        exclude: ['src/app/api/**/route.ts'],
      },
    },
  };
});
