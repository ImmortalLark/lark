const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 向html中注入js脚本引用

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出路径
    filename: 'bundle.js',
    publicPath: '/dist' // 静态文件加载路径
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 80
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      minSize: 30000,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true // 强制打包
        }
      }
    }
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage'
              }],
              ['@babel/preset-react', {
                useBuiltIns: true
              }]
            ]
          }
        }
      },
      { 
        test: /.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader', 
            options: { 
              import: true,
              importLoaders: 1
            }
          },
          { 
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
                require('postcss-nested'),
                require('precss')
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
}