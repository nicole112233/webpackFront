const chalk=require('chalk')
const fs=require('fs')
const copy=require('copy-template-dir')
const rm=require('rimraf')
const pathParam=require('minimist')(process.argv.slice(2))
const args=pathParam.path
const isDelete=pathParam.d==true
const {prompt}=require('inquirer')
const path=require('path')
const res=p=>path.join(process.cwd(),p)

const router=require(res('config/local')).router
const port=require(res('config/local')).getMax() //获取最大端口数



//异常处理
let err={msg:''}
Object.defineProperty(err,"msg",{
  set(val){
    if(val){
      console.log(chalk.red(val))
      process.exit(1)
    }
  }
})

err.msg=args?'':'input a router like： npm run init-page fund/index or npm run init-page fund/index'
err.msg=/^((\w|-)+)(\/)((\w|-|\/)+)?((\w|-)+)$/.test(args)?'':'input a useful param, not include "*、？、&" and so on'

const mod=args.split('/')[0]
const pat=args.split('/').slice(1).join('/')
fs.stat(res(`src/modules/${mod}/router/${pat}`),(er)=>{
  if(!er&&!isDelete){
    err.msg='file already existed,no create again '
  }else if(er&&!isDelete){
    createProject()
  }else if(isDelete){
    deleteProject()
  }
})

const createProject=()=>{
  const exist=fs.existsSync(res(`src/modules/${mod}`))
    if(!exist){
      copy(res('template/init'),res(`src/modules/${mod}`),er=>{
        err.msg=er?'fail to create module,please checkout':''
        console.log('copy module')        

        //修改 /config/local.js 的router
        if(!router[mod]){
          let file=fs.readFileSync(res('config/local.js')) 
          let files=file.toString().replace(/(router: \{)/,`$1\n    ${mod} : ${port},`)
          fs.writeFileSync(res('config/local.js'),files)
        }

        processProject() 
      })
    }else{
      processProject()
    }
}

const processProject=()=>{
  prompt([
    {
      type:'input',
      message:'please input a title',
      name:'title'
    }
  ]).then(r=>{
    copy(res('template/views'),res(`src/modules/${mod}/views/${pat}`),er=>{
      err.msg=er?'fail to copy views,please checkout':''
      console.log('copy views')    
    })
    copy(res('template/router'),res(`src/modules/${mod}/router/${pat}`),{path:pat,module:mod,title:r.title},er=>{
      err.msg=er?'fail to copy router,please checkout':''   
      console.log('copy router')
    })
    const str= fs.readFileSync(res(`src/modules/${mod}/router/index.js`))
    let str2=str.toString()
    let patName=pat.replace(/\//g,'_')
    let str3=str2.replace(/(Vue.use\(Router\))/,`$1\nimport ${patName} from "\.\/${pat}/index.js"`).replace(/(routes: \[)/,`$1\n    \.\.\.${patName},`)
    fs.writeFileSync(res(`src/modules/${mod}/router/index.js`),str3)

  })

}

const deleteProject=()=>{
  let patName=pat.replace(/\//g,'_')
  let pat1=pat.split('/')[pat.split('/').length-1]
  rm(res(`src/modules/${mod}/views/${pat1}`),err=>{
    
    console.log('delete view')
  })
  rm(res(`src/modules/${mod}/router/${pat1}`),err=>{
    console.log('delete router')
  })
  const str= fs.readFileSync(res(`src/modules/${mod}/router/index.js`))
  let str2=str.toString()
  let reg1=new RegExp(`\nimport ${patName} from "\.\/${pat}\/index\.js"`)
  let reg2=new RegExp(`\n    \.\.\.${patName},?`)
  str2=str2.replace(reg1,'').replace(reg2,'')
  console.log(str2)
  fs.writeFileSync(res(`src/modules/${mod}/router/index.js`),str2)
}