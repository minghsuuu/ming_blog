module.exports = {
  env: {
    browser: true,
  },
  extends: ['eslint:recommended', 'react-app', 'airbnb'],
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
