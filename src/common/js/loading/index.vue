<template>
  <div v-show='show' @touchmove.stop='' class="v-loading">
    <div class="v-loading-content"></div>
  </div>
</template>

<script>
export default {
  name:'loading',
  data(){
    return{
      show:false
    }
  },
  methods:{
    change(o){
      this.show=o
    }
  }
}
</script>

<style lang='less' scoped>
  @c1:rgba(240, 14, 228,.5);
  @c2:rgba(240, 14, 228,1);
  @keyframes load{
    0%{
      box-shadow:-30px 30px 0px 4px @c2,0px 30px 0px 0px @c1,30px 30px 0px 0px @c1;
    }
    33%{
      box-shadow:-30px 30px 0px 0px @c1,0px 30px 0px 4px @c2,30px 30px 0px 0px @c1;

    }
    66%{
      box-shadow:-30px 30px 0px 0px @c1,0px 30px 0px 0px @c1,30px 30px 0px 4px @c2;

    }
    100%{
      box-shadow:-30px 30px 0px 4px @c2,0px 30px 0px 0px @c1,30px 30px 0px 0px  @c1;
    }
  }
  .v-loading{
    .fixed;
    left:0px;
    right:0px;
    top:0px;
    bottom:0px;
    background-color:rgba(0,0,0,.1);
    z-index:9000;
    .v-loading-content{
      border-radius:50%;
      .fixed-center(16,16);
      animation:load 1s infinite;
      transform: translateY(-30px);
    }
  }
</style>