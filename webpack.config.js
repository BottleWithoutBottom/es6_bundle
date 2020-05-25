const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const{CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  devServer: {

    overlay: true,
    host: 'localhost',
    proxy: {
      '/create-api/**': {
        target: 'http://localhost:8888/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  mode: 'development',
  entry: {
    // Входные данные могут быть не одним файлом, а быть представленны в виде объекта, который принимает ключи - как входные точки
    main: ['@babel/polyfill', './src/lesson5-fetch/index.js'],
    anal: './src/clickanalytics.js'
  },
  output: {
    //следовательно, меняется и выходной файл, который принимает паттерн [name], который будет названием файла, (main, anal)!!!
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'welcome',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-async-generator-functions',
              '@babel/plugin-transform-typeof-symbol',
              '@babel/plugin-transform-async-to-generator'
            ]
          }
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],

      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
        "@style": path.resolve(__dirname, 'src/styles')
      }
  }
  
}