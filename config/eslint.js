module.exports = {
  extends: require.resolve('eslint-config-react-app'),
  rules: {
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/href-no-hash': 0,
    'react/jsx-no-undef': [true, { allowGlobals: true }],
  },
  globals: {
    wp: true,
    React: true,
  },
};
