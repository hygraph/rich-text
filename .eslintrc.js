module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['testing-library', 'jest-dom'],
  settings: {
    react: {
      version: '999.999.999',
    },
  },
};
