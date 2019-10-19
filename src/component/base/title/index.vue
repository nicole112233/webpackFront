<template>
  <h1 class='v-title'><slot></slot></h1>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .v-title{
    .fixed;
    left:0px;
    top:0px;
    right:0px;
    z-index:1000;
    background-color:@warning;
    color:white;
    .t-c;
    height:80px;
    line-height:80px;
    font-size:40px;
  }
</style>