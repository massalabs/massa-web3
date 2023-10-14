import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testMatch: ["**/*.spec.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(@massalabs/massa-web3)/)"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "^@massalabs/massa-web3$": "<rootDir>/dist/esm/index.js",
  },
  moduleFileExtensions: ["ts", "js", "json"],
};

export default config;
