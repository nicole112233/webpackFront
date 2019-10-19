const glob=require('glob')
const {exec}=require('child_process')
const path=require('path')
const chalk=require('chalk')

glob(path.join(process.cwd(),'/src/modules/*/main.js'),(err,files)=>{
  console.log(files)
  files.map(item=>{
    let name=item.replace(/(\/main.js)$/,'')
    let n=name.slice(name.lastIndexOf('/')+1)
    console.log(n)
    exec(`set NODE_ENV=production && node build/build.js --module ${n}`,(error,stdout,stdErr)=>{
      console.log(stdout,stdErr)
      if(error){
        console.log(error)
        process.exit()
      }
    })
  })  
})