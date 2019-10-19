const param=require('minimist')(process.argv.slice(2))
module.exports={
  mock:param.mock?true:false,
  moduleName:param.module==true?'':param.module,
  isDev:process.env.NODE_ENV==='development ',
  openB:param.open || false
}