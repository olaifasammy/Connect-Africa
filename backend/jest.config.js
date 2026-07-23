module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src/modules'
  ],
  testMatch: [
    '<rootDir>/tests/**/*.spec.{ts,js}',
    '<rootDir>/tests/**/*.test.{ts,js}',
    '<rootDir>/src/modules/*/tests/**/*.spec.{ts,js}',
    '<rootDir>/src/modules/*/tests/**/*.test.{ts,js}'
  ],
  moduleNameMapper: {
    '^@modules/ai/infrastructure/security/PromptSanitizationService$': '<rootDir>/tests/mocks/mockAiModule.js',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@domain/shared/(.*)$': '<rootDir>/src/shared/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/shared/infrastructure/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/shared/interfaces/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@shared/infrastructure/(.*)$': '<rootDir>/src/shared/infrastructure/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@bootstrap/(.*)$': '<rootDir>/src/bootstrap/$1',
    '^@workers/(.*)$': '<rootDir>/src/workers/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
  },
  transformIgnorePatterns: []
};