export default {
  "parser": "@typescript-eslint/parser",
  "root": true,
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "settings": {
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
  ],
  "globals": {
    "describe": true,
    "test": true,
    "expect": true,
    "it": true
  },
  "rules": {
    "indent": [
      "error",
      4,
      {
        "SwitchCase": 1
      }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "spaced-comment": [
      1,
      "always"
    ],
    "no-unused-vars": [
      1
    ],
    "no-var": 2,
    "no-useless-escape": 0,
    "@typescript-eslint/no-empty-function": [
      0
    ],
    "typescript-eslint/ban-ts-comment": [
      0
    ],
    "typescript-eslint/no-var-requires": [
      0
    ],
    "@typescript-eslint/no-extra-semi": 0
  }
}