<template>
  <div>
    <v-title>注册页</v-title>
    <v-button @click.native='login'>去登陆</v-button>
  </div>
</template>

<script>
export default {
  methods:{
    login(){
      App.go({
        url:'login.html/#/index'
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>