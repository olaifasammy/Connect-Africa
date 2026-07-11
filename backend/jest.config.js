module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/tests/setup.ts'],

  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@domain/shared/(.*)$': '<rootDir>/src/shared/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@bootstrap/(.*)$': '<rootDir>/src/bootstrap/$1',
    '^@workers/(.*)$': '<rootDir>/src/workers/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
  },

  transformIgnorePatterns: ['/node_modules/']
};