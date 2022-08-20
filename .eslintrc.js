module.exports = {
	env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended","prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint","prettier"],
	rules: {
	  "prettier/prettier":2,
    indent: ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
  },
};
