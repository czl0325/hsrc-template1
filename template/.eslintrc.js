module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "eol-last": "off",
    quotes: "off",
    camelcase: "off",
    "space-before-function-paren": "off",
    "vue/no-multiple-template-root": "off",
    "no-trailing-spaces": "off",
    "vue/no-v-model-argument": "off",
    "vue/no-mutating-props": "off",
    "no-multiple-empty-lines": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  }
}
