module.exports = {
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '\\.css$': '<rootDir>/node_modules/razzle/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/node_modules/razzle/config/jest/fileTransform.js',
  },
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};
