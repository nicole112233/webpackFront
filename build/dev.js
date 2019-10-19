const conf=require('./dev.conf')
const devMiddleware=require('webpack-dev-middleware')
const hotMiddleware=require('webpack-hot-middleware')
const express=require('express')
const app=new express()
const webpack=require('webpack')
const open=require('open')
const {mock,moduleName,openB}=require('./param')
const fs=require('fs')
const port=require('../config/local.js').router
const path=require('path')
const res=p=>path.join(process.cwd(),p)
const chalk=require('chalk')


let Err={msg:''} 
Object.defineProperty(Err,'msg',{
  set(val){
    if(val!==''){
      console.log(chalk.red(val+'\n'))
      process.exit(1)
    }
  }
})


const compiler=webpack(conf)

app.use(devMiddleware(compiler,{
  publicPath:conf.output.publicPath,
  quiet:true
}))

app.use(hotMiddleware(compiler,{
  log:false,
  heartbeat:1000
}))

if(mock){
  app.use(express.static(res('mock/assets')))
}

const hasFile=fs.readFileSync(res(`src/modules/${moduleName}/main.js`))
Err.msg=hasFile?'':`${moduleName} not found`
Err.msg=port[moduleName]?'':`${moduleName} port not found`


app.listen(port[moduleName],()=>{
  console.log(`server running at http://localhost:${port[moduleName]}`)
  if(openB){
    open(`http://localhost:${port[moduleName]}/${moduleName}.html/#/`)
  }
})
