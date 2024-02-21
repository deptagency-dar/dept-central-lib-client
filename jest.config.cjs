// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testMatch: ['<rootDir>/src/components/**/*.(spec|test).(j|t)s?(x)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
};
