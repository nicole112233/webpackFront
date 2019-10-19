<template>
  <button class='v-input' :class='`v-input-${type}`'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props:{
    type:{
      default:'primary'
    }
  }
}
</script>

<style lang='less' scoped>
.v-input{
  .block;
  .w;
  .h(80);
  .radius(6px);
  color:white;
  background-color:blue;
  .transition;
}
  .v-input-warning{
    background-color:@warning;
    &:active{
     background-color:rgba(244,81,30,.8);

    }
  }
</style>