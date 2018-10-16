module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: './coverage',
    testMatch: ['**/test/**/*.(test|spec).ts?(x)'],
    clearMocks: true
};