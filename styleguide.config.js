const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.vue'],
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: 'vue-loader',
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: { appendTsSuffixTo: [/\.vue$/] },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    plugins: [new VueLoaderPlugin()],
  },

  require: [path.resolve(__dirname, 'node_modules/element-ui/lib/theme-chalk/index.css')],

  components: ['src/Confirm.ts', 'src/**/*.vue'],
};
