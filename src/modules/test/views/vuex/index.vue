<template>
  <div>
    <v-button>{{test}}</v-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      test:''
    }
  },
  created(){
    this.test=this.$store.state.test
  }
}
</script>

<style lang='less' scoped>

</style>