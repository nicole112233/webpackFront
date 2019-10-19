const webpack=require('webpack')
const conf=require('./prod.conf')

webpack(conf,(err,status)=>{
  const str=err?err:status
  process.stdout.write(str.toString({
    colors:true,
    modules:false,
    children:false,
    chunks:false,
    chunkModules:false
  }))
})