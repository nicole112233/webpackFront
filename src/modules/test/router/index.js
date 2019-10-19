import Router from "vue-router"
import Vue from "vue"
import vuex from "./vuex/index.js"
Vue.use(Router)

const rout = new Router({
  mode: "hash",
  linkActiveClass: "act",
  routes: [
    ...vuex

  ]
})

rout.afterEach(r => {
  document.title = r.meta.title || ""
})

export default rout
