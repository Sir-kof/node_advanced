module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/src/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts': 'ts-jest'
  },
  clearMocks: true
}

// const config = {
//   collectCoverage: true,
//   collectCoverageFrom: ['<rootDir>'],
//   coverageDirectory: "coverage",
//   coverageProvider: "babel",
// };

// module.exports = config;
