const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.paths.json')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [
      '<rootDir>'
  ],
  // globalSetup: "<rootDir>/__test__/globalSetup.ts",
  // globalTeardown: "<rootDir>/__test__/globalTeardown.ts",
  // setupFilesAfterEnv: [
  //   "<rootDir>/__test__/setupFile.ts"
  // ]
};