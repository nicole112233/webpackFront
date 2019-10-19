import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const rout= new Router({
  mode:'hash',
  linkActiveClass:'act',
  routes: [
    
  ]
})

rout.afterEach(r=>{
  document.title=r.meta.title || ''
})

export default rout