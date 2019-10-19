module.exports = {
  router: {
    test: 8083,
    login: 8080,
    home: 8081,
    car: 8082
  },
  getMax () {
    const { router } = this
    let port = 8080
    for (const i in router) {
      port = port > router[i] ? port : router[i]
    }
    return ++port
  }
}
