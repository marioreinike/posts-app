"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    modulePathIgnorePatterns: ['<rootDir>/build/'],
    setupFilesAfterEnv: [
        './src/setupTests.ts',
    ],
};
