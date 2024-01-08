import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 15 * 60 * 1000,
  workers: 8,
  projects: [
    {
      name: 'Desktop_Firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true
      },
      testMatch: ['tests/*.spec.js', 'tests/*.spec.ts', 'tests/ci/*.spec.js', 'tests/ci/*.spec.ts'],
      testIgnore: ['tests/local/*', 'tests/local/mobile/*', 'tests/mobile/*'],
    },
    {
        name: 'iPhone_X_Light',
        use: {
          ...devices['iPhone X'],
          colorScheme: 'light',
          ignoreHTTPSErrors: true,
        },
      testMatch: ['tests/*.spec.js', 'tests/*.spec.ts', 'tests/ci/*.spec.js', 'tests/ci/*.spec.ts', 'tests/ci/mobile/*.spec.js', 'tests/ci/mobile/*.spec.ts', 'tests/mobile/*.spec.js', 'tests/mobile/*.spec.ts'],
      testIgnore: ['tests/local/*'],
    },
    {
      name: 'Pixel_7_Dark',
      use: {
        ...devices['Pixel 7'],
        colorScheme: 'dark',
        ignoreHTTPSErrors: true,
      },
      testMatch: ['tests/*.spec.js', 'tests/*.spec.ts', 'tests/ci/*.spec.js', 'tests/ci/*.spec.ts', 'tests/ci/mobile/*.spec.js', 'tests/ci/mobile/*.spec.ts', 'tests/mobile/*.spec.js', 'tests/mobile/*.spec.ts'],
      testIgnore: ['tests/local/*'],
    },
  ],
});
