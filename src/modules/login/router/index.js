import Router from "vue-router"
import Vue from "vue"
import resgister from "./resgister/index.js"
import index from "./index/index.js"
Vue.use(Router)

const rout = new Router({
  mode: "hash",
  linkActiveClass: "act",
  routes: [
    ...resgister,
    ...index
  ]
})

rout.afterEach(r => {
  console.log("111111111111", r)
  document.title = r.meta.title || ""
})

export default rout
