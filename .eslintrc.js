module.exports = {
    // 'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
      'jest': true,
    },
    'rules': {
        "linebreak-style": 0,
        "react/state-in-constructor": 0,
        "semi": 0,
        'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off'
    },
    'globals': {
      "fetch": false
    }
  }