const {moduleName}=require('./param')
const vuePlugin=require('vue-loader/lib/plugin')
const htmlPlugin=require('html-webpack-plugin')
const merge=require('webpack-merge')
const pretreat=require('./pretreat')
const path=require('path')
const res=p=>path.join(process.cwd(),p)

module.exports=merge(pretreat,{
  module:{
    rules:[
      {
        test:/\.(jpe?g|gif|png|svg)(\?.*)?$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:10000,
              filename:'[name].[hash:5].[ext]',
              outputPath:'imgs/'
            }
          }
        ]
      },
      {
        test:/\.js$/,
        use:[
          'babel-loader?cacheDirectory',
          {
            loader:'eslint-loader',
            options:{
              fix:true
            }
          }
        ]
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      }
    ]
  },
  plugins:[
    new vuePlugin(),
    new htmlPlugin({
      template:res('template/template.html'),
      title:'',
      filename:`${moduleName}.html`,
      minify:{
        collapseWhitespace:true,
      }
    })
  ],
  resolve:{
    extensions:['.js','.vue','.json'],
    alias:{
      '@':res('src'),
      '@style':res('src/common/style'),
      '@js':res('src/common/js'),
      '@mock':res('mock'),
      '@component':res('src/component')
    }
  },
  externals:{
    'vue':'Vue',
    'vuex':'Vuex',
    'vue-router':'VueRouter',
    'axios':'axios'
  }
})