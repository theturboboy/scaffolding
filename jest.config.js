module.exports = {
  moduleDirectories: [
    '<rootDir>',
    'node_modules'
  ],
  setupFiles: ['./devops/jest/shim.js', './devops/jest/setup.js'],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverage: true,
  coverageReporters: ['text'],
  collectCoverageFrom: [
    'app/js/**/*',
  ],
  verbose: true,
  globals: {}
};
