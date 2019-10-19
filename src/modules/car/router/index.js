import Router from "vue-router"
import Vue from "vue"
import index from "./index/index.js"
Vue.use(Router)

const rout = new Router({
  mode: "hash",
  linkActiveClass: "act",
  routes: [
    ...index

  ]
})

rout.afterEach(r => {
  document.title = r.meta.title || ""
})

export default rout
