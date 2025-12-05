module.exports = {
  ignorePatterns: ['package*', '.npmrc', '*.md', '.*', '__tests__'],
  extends: ['eslint:recommended', 'airbnb-base'],
  rules: {
    'class-methods-use-this': 'off',
  },
};
