// eslint-disable-next-line import/extensions
import nextJest from "next/jest.js"
import type { Config } from "jest"
const createJestConfig = nextJest({ dir: "./" })

const customJestConfig: Config = {
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/__test__/**",
    "!**/*.routes.ts",
    "!**/*.config.ts",
    "!**/constants.ts",
    "!**/interface/**",
    "!**/interfaces/**",
    "!**/mocks/**",
    "!**/__mocks__/**",
    "!**/node_modules/**",
    "!src/pages/_app.tsx",
    "!src/app/layout.tsx",
    "!src/pages/_document.tsx",
    "!**/*.d.ts",
    "!.next/**",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
}

module.exports = createJestConfig(customJestConfig)
