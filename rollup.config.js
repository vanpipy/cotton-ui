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

const createBuildConfig = (input, format = 'es', dir) => {
  return {
    input,

    output: {
      dir,
      format,
      sourcemap: true,
    },

    plugins: [
      vue(),
      typescript({
        clean: true,
        check: false,
      }),
    ],

    external: ['element-ui', 'vue', 'vue-property-decorator', 'lodash'],
  };
};

const input = {
  cotton: path.resolve(__dirname, 'src/index.ts'),
  ...collectComponents(),
};

module.exports = [
  createBuildConfig(input, 'es', path.resolve(__dirname, 'lib/es')),
  createBuildConfig(input, 'cjs', path.resolve(__dirname, 'lib/cjs')),
];
