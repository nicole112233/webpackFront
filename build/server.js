const {moduleName,mock}=require('./param')
const {exec}=require('child_process')
const port=require('../config/local.js').router
const chalk=require('chalk')

//错误处理
let err={msg:''}
Object.defineProperty(err,'msg',{
  set(val){
    if(val!==''){
      console.log(chalk.red(val))
      process.exit()
    }
  }
})
err.msg=moduleName?'':'please input a module name'
let line=mock?"set NODE_ENV=development && node build/dev.js --mock  --module":"set NODE_ENV=development && node build/dev.js --module"

//本地配置的模块名
let modules=Object.keys(port).reduce((ret,item)=>{
  ret.push(item)
  return ret
},[])

//遍历并过滤输入的模块
moduleName.split(',').filter(item=>{
  let ret= modules.indexOf(item)>-1
  if(!ret){
    console.log(chalk.yellow(`${item} module not found port config;please check in /config/local.js \n`))
  }
  return ret
}).map(item=>{
  // 启动子进程
  exec(`${line} ${item}`,(error,stdout,stdErr)=>{
    console.log(stdErr)
    error && console.log(error)
  })
  console.log(chalk.green(`${item} running  at  http://localhost:${port[item]}/${item}.html`))
})



