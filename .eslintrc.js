module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  extends: ['eslint:recommended', 'google'],
  rules: {
    'require-jsdoc': 'off',
    'linebreak-style': 0,
  },
};
