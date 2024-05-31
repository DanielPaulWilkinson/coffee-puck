import pluginVue from 'eslint-plugin-vue'
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
      files: ["src/**/*.js", "src/**/*.ts"],
      rules: {
          semi: "error",
          "prefer-const": "error"
      },
      languageOptions: {
        globals: {
          "es2021": true,
          "node": true,
        },
        parserOptions: {
          ecmaVersion: 2022,
          ecmaFeatures: {
              jsx: false
          },
          sourceType: "module",
          parser: "@typescript-eslint/parser"
        },
      },
      plugins: {
        "plugin:vue/vue3-recommended": pluginVue,
      },
      rules: {
        "no-console": "error",
        "no-var": "error",
        "object-shorthand": ["warn", "properties"],
        "accessor-pairs": [
            "error",
            {
                "setWithoutGet": true,
                "enforceForClassMembers": true
            }
        ],
    },
  }
];