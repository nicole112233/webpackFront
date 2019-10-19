const conf=require('./base.conf')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const merge=require('webpack-merge')
const miniCss=require('mini-css-extract-plugin')
const terser=require('terser-webpack-plugin')
const optimizeCss=require('optimize-css-assets-webpack-plugin')
const webpack=require('webpack')
const uglifyJs=require('uglifyjs-webpack-plugin')
const {res}=require('./utils')

module.exports=merge(conf,{
  mode:'production',
  module:{
    rules:[
      {
        test:/\.(le|c)ss$/,
        use:[
          miniCss.loader,
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss'
            }
          },
          'less-loader',
          {
            loader:'style-resources-loader',
            options:{
              preProcessor:'less',
              patterns:[res('src/common/style/fn.less')]
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new miniCss({
      filename:'css/[name].[hash:5].css',
      chunkFilename:'css/[id].[hash:5].css'
    }),
    new webpack.DefinePlugin({
      MOCK:false,
      IS_DEV:false
    })
  ],
  optimization:{
    minimizer:[
      new terser({
        parallel:true,
        cache:true,
      }),
      new optimizeCss({}),
      new uglifyJs({
        exclude:/\/mock/,
        uglifyOptions:{
          compress:{
            drop_debugger:true,
            drop_console:true
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 300,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name:'vendor'
        }
      }
    }
  }
})