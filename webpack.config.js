var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // ./src/main.js是本地测试的打包入口
  // entry: './src/main.js',
  // entry: './src/lib/index.js',
  entry: process.env.NODE_ENV === 'production' ? './src/lib/index.js' : './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'nav.js',
    // require时的模块名
    library: 'nav',
    // 会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    libraryTarget: 'umd',
    // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   'vue-style-loader',
        //   'css-loader'
        // ],
        // use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
        // fallback:编译后用什么loader来提取css文件
        // publicfile:用来覆盖项目路径,生成该css文件的文件路径
        use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({ 
              fallback: 'vue-style-loader',
              use: 'css-loader'
            })
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(svg|ttf|woff|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 500000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('cq-nav.css')
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
