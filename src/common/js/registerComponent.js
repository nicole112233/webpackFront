import Vue from "vue"

const files = require.context("@component/base", true, /index\.vue$/)
files.keys().map(files).map(item => {
  const name = item.default.__file.replace(/^(.+\/)((\w|-|_)+)(\/index.vue)$/, "$2").replace(/(\w)/,(v)=>v.toUpperCase()) //eslint-disable-line
  Vue.component(`v${name}`, item.default)
})
