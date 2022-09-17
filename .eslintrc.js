module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      // Script parser for `<script lang="ts">`
      ts: '@typescript-eslint/parser',
      // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
      // and vue interpolations (e.g. `{{variable}}`).
      // If not specified, the parser determined by `<script lang ="...">` is used
      '<template>': 'espree'
    },
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    }
  },
  env: {
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off'
  }
};
