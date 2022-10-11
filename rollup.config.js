const fs = require('fs');
const path = require('path');
const { filter } = require('lodash');
const typescript = require('rollup-plugin-typescript2');
const vue = require('rollup-plugin-vue');

const SRC = 'src';

const collectComponents = () => {
  const components = {};

  const filenames = fs.readdirSync(path.resolve(__dirname, SRC));
  const target = filter(filenames, (filename) => filename.includes('vue'));

  target.forEach((each) => {
    const key = each.replace('.vue', '');
    const value = path.resolve(__dirname, SRC, each);
    components[key] = value;
  });

  return components;
};

module.exports = {
  input: {
    cotton: path.resolve(__dirname, 'src/index.ts'),
    Confirm: path.resolve(__dirname, 'src/Confirm.ts'),
    ...collectComponents(),
  },

  output: {
    dir: path.resolve(__dirname, 'lib'),
    format: 'es',
    sourcemap: true,
  },

  plugins: [
    vue(),
    typescript({
      clean: true,
    }),
  ],

  external: ['element-ui', 'vue', 'vue-property-decorator', 'lodash'],
};
