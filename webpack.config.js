var path = require('path')
var webpack = require('webpack')
var VUEMODULES = path.resolve(__dirname,'vue_modules')
var CSS = path.resolve(__dirname,'public/css')
var JS = path.resolve(__dirname,'public/js')
var ROOT = path.resolve(__dirname)
var entryObj ={
    "account/login/index":'./src/account/login/index.js',
    "account/register/index":'./src/account/register/index.js',
    "index/index":'./src/index/index.js',
    "task/index":"./src/task/index.js",
}
module.exports = {
    entry:entryObj,
    output:{
        path: path.resolve(__dirname, './views/'),
        filename:"[name].js",
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:"style!css"},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test:/\.html$/,loader:"html-loader"},
            {test:/\.(png|jpg|gif|jpeg)$/,loader:"url-loader?limit=8192"},
            {test:/\.vue$/,loader:"vue-loader"},
            {test:/\.js$/,loader:'babel-loader',exclude:/node_module/},
            {test:/\.(eot|svg|ttf|woff)(\?\S*)?$/,loader: 'url-loader'},
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
        'vue$': 'vue/dist/vue.js',
        VUEMODULES:VUEMODULES,
        CSS:CSS,
        JS:JS,
        ROOT:ROOT,
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
