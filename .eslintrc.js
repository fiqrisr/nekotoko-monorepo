module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname
  },
  extends: ["moon", "moon/node", "prettier"],
  rules: {
    // Doesn't understand the new TS 4.7 imports
    "import/no-unresolved": "off",

    // We need to keep "index" around in imports for extensions
    "import/no-useless-path-segments": "off",
    "@typescript-eslint/parameter-properties": "off"
  },
  overrides: [
    {
      files: ["apps/**/*"],
      rules: {
        // App pages require default exports
        "import/no-default-export": "off"
      }
    },
    {
      files: ["*.config.js", ".eslintrc.js"],
      rules: {
        "sort-keys": "off",
        "import/no-commonjs": "off",
        "unicorn/prefer-module": "off"
      }
    }
  ]
};
