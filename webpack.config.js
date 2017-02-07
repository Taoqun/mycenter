var path = require('path')
var webpack = require('webpack')
module.exports = {
    entry:{
      bunder:"./src/entry.js",
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename:"[name].js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
   },
    module:{
        loaders:[
            {test:/\.css$/,loader:"style!css"},
            {test:/\.scss$/,loader:'style!css!sass'},
            {test:/\.html$/,loader:"html-loader"},
            {test:/\.(png|jpg)$/,loader:"url-loader?limit=8192"},
            {test:/\.vue$/,loader:"vue-loader"},
            {test:/\.js$/,loader:'babel-loader',exclude:/node_module/},
            {test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,loader: 'file-loader'},
        ]
    },
    vue:{
      loaders:{
        js:"babel",
        scss:'style!css!sass'
      }
    },
    babel:{
      presets:["es2015"],
      plugins:['transform-runtime']
    },
    resolve: {
      extensions:['','.js','.vue'],
      alias: {
        'vue$': 'vue/dist/vue.js'
      }
    },
    devServer:{
      historyApiFallback:true,
      hot:false,
      inline:true,
      grogress:true,
    },
    devtool: '#eval-source-map'
};

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
      compress: {
        warnings: false
      }
    })
  ])
}
