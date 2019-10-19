const path=require('path')
const param=require('minimist')(process.argv.slice(2))
let consoleNum=0
module.exports={
  res(o){
    return path.resolve(__dirname,`../${o}`)
  },
  log(o){
    console.log(consoleNum++,o)
  },
  mock:param.mock?true:false,
  moduleName:param.module,
  isDev:process.env.NODE_ENV==='development '
}