import app from "./app.vue"
import Vue from "vue"
import store from "./store"
import router from "./router"
import "@js/App.js"
import "@style/reset.less"

App.vm = new Vue({
  router,
  store,
  render: h => h(app)
})

document.addEventListener("DOMContentLoaded", function () {
  App.vm.$mount("#root")
}, false)
