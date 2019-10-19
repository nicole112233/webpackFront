import load from "./index.vue"
import Vue from "vue"

const Loading = Vue.extend(load)
const profile = new Loading({
  el: document.createElement("div")
})
document.body.append(profile.$el)
const method = {
  open () {
    profile.change(true)
  },
  hide () {
    profile.change(false)
  }
}

Vue.prototype.$load = method
