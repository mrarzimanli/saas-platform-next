import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Path to your Next.js app to load `next.config.js` and `.env` files
  dir: "./",
});

// Add custom Jest configuration
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom", // Simulate a browser-like environment for tests
  testMatch: [
    "**/?(*.)+(test).[tj]s?(x)", // Match test files with `.test.tsx` or `.test.js`
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Support path aliases
    "\\.module\\.(css|scss)$": "identity-obj-proxy", // Mock CSS/SCSS modules
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional setup file
};

// Ensure Next.js loads the config properly
export default createJestConfig(config);
