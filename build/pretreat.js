const {moduleName,isDev}=require('./param')
const copyPlugin=require('copy-webpack-plugin')
const fs=require('fs')
const path=require('path')
const chalk=require('chalk')

const res=p=>path.join(process.cwd(),p)

let Err={msg:''} 
Object.defineProperty(Err,'msg',{
  set(val){
    if(val!==''){
      console.log(chalk.red(val+'\n'))
      process.exit(1)
    }
  }
})



const pretreatConfig=()=>{

  Err.msg=moduleName?'':'please input a module name' //判断是否输入模块名
  const exit=fs.existsSync(res(`src/modules/${moduleName}`))
  Err.msg=exit?'':`module ${moduleName} not found` //判断模块是否存在

  let entry={}
  entry[moduleName]=isDev?['webpack-hot-middleware/client?noInfo=true&reload=true',res(`src/modules/${moduleName}/main.js`)]:res(`src/modules/${moduleName}/main.js`)
console.log('______________________',process.env.NODE_ENV)
  return{
    entry,
    output:{
      filename:'js/index.js',
      path:res(`dist/${moduleName}`),
      publicPath:'/'
    },
    plugins:[
      new copyPlugin([
        {
          from:res( 'public'),
          to: res(`dist/${moduleName}`),
          ignore: ['.*']
        }
      ])
    ]
  }  
}

module.exports=pretreatConfig()

