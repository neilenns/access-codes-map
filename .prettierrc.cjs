/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  jsonRecursiveSort: true,
  plugins: [
    "prettier-plugin-sort-json",
    "prettier-plugin-packagejson",
    "prettier-plugin-organize-imports",
    "prettier-plugin-multiline-arrays",
  ],
  multilineArraysWrapThreshold: -1,
};
