module.exports = {
  extends: ["plugin:vue/vue3-recommended"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "warn",
    "vue/max-attributes-per-line": "off",
  },
};
