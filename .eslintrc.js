module.exports = {
    extends: ['plugin:vue/vue3-recommended'],
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
        // "vue/no-unused-vars": "",
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/attributes-order': 'off',
        'vue/html-indent': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/html-closing-bracket-newline': 'off',
    },
}
