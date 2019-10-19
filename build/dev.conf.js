const merge=require('webpack-merge')
const conf=require('./base.conf')
const vConsole=require('vconsole-webpack-plugin')
const webpack=require('webpack')
const {mock}=require('./param')
const path=require('path')
const res=p=>path.join(process.cwd(),p)

module.exports=merge(conf,{
  mode:'development',
  devtool:'inline-sourceMap',
  module:{
    rules:[
      {
        test:/\.(le|c)ss$/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              sourceMap:true,
            }
          },
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              sourceMap:true,
            }
          },
          {
            loader:'less-loader',
            options:{
              sourceMap:true
            }
          },
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
    new vConsole({
      enable:true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      MOCK:mock,
      IS_DEV:true
    })
  ]
})