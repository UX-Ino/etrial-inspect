const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@capyseo/core$": "<rootDir>/node_modules/@capyseo/core/dist/index.js",
    "^@houtini/geo-analyzer$": "<rootDir>/node_modules/@houtini/geo-analyzer/dist/index.js",
    "^seo-analyzer$": "<rootDir>/node_modules/seo-analyzer/dist/index.js"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@capyseo|@houtini|seo-analyzer|llms-txt-generator)/)"
  ],
};