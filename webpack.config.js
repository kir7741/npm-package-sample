const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {

  const mode = env.mode || 'development';
  const isProduction = mode === 'production';

  return ({
    mode,
    entry: {
      main: path.resolve(__dirname, './src/js/index.js'),
    },
    output: isProduction
    ? {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].min.js',
      }
    : {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].dev.js',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader', 
            'postcss-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      "useBuiltIns": "usage",
                      "corejs": 3
                    }
                  ]
                ],
                plugins: ["@babel/plugin-proposal-class-properties"]
              }

            }
         ]
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({
        path: `./.env.${ mode }`,
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash:8].css',
      })
    ]
  })
};
