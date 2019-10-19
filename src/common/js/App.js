/* eslint-disable */
import axios from "axios"
import "./registerComponent"
import "./loading/index.js"
const { router } = require(IS_DEV ? "../../../config/local.js" : "../../../config/prod.js")

window.App = {
  vm: {},
  request (o) {
    const _this = this.vm
    return new Promise((resolve, reject) => {
      if (MOCK) {
        try {
          const data = require(`@mock/${o.url.replace(/\//g, "_")}.js`)
          _this.$load.open()
          setTimeout(() => {
            _this.$load.hide()
            resolve(data)
          }, 500)
        } catch (err) {
          reject({
            errCode: 1,
            msg: "404 wrong Router"
          })
        }
      } else {
        const { url, data } = o
        axios({
          url,
          data,
          type: "post"
        }).then(r => [
          resolve(r)
        ]).catch(err => [
          reject(err)
        ])
      }
    })
  },
  go (param) {
    let { url, data } = param
    let r = ""
    if (data) {
      Object.keys(data).map(item => {
        r += `&${item}=${data[item]}`
      })
      r = r.slice(1)
    }
    url = url.replace(/(\.html)/, `$1?${r}`)
    const m = url.split(".")[0]
    location.href = window.encodeURI(`http://localhost:${router[m]}/${url}`)
  },
  getParam () {
    const search = window.decodeURI(location.search).slice(1)
    const obj = {}
    search.split("&").map(item => {
      const arr = item.split("=")
      obj[arr[0]] = arr[1]
    })
    return obj
  }
}
