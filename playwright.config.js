import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'desktop Firefox',
      use: {
        browserName: 'firefox', // run tests on main three browser engines
        ...devices['Desktop Firefox'],
      },
      testMatch: ['tests/*.spec.js', 'tests/*.spec.ts'], // run all tests in the tests folder but not the mobile ones
      testIgnore: 'tests/mobile/*',
    },
    {
        name: 'iPhone X Light',
        use: {
            ...devices['iPhone X'],
            colorScheme: 'light',
        },
        testMatch: ['tests/*.spec.js', 'tests/*.spec.ts', 'tests/mobile/*.spec.js', 'tests/mobile/*.spec.ts'], // run tests in both folders
    },
    {
      name: 'Pixel 7 Dark',
      use: {
        ...devices['Pixel 7'],
        colorScheme: 'dark',
      },
      testMatch: ['tests/*.spec.js', 'tests/*.spec.ts', 'tests/mobile/*.spec.js', 'tests/mobile/*.spec.ts'], // run tests in both folders
    },
  ],
});