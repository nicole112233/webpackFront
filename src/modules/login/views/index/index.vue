<template>
  <div class='login'>
    <div class="content">

      <div class="inp">
        <img src="./imgs/user.png" alt="">
        <input type="text" v-model='name'>
      </div>
      <div class="inp">
        <img src="./imgs/key.png" alt="">
        <input type="password">
      </div>
      <v-button type='warning' @click.native='login'>登录</v-button>
      <p class='ext'>还没有账号？<span @click='register'>马上注册</span></p>
    </div>

    <div class="bot">
      <div class="left">
        <img src="./imgs/f.png" alt="">
        <span>联系我们</span>
      </div>
      <div class="right">
        <span>跳过</span>
        <img src="./imgs/to.png" alt="">
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  methods:{
    register(){
      App.go({
        url:'login.html#/resgister',
        data:{
          name:''
        }
      })
    },
    login(){
      let {name}=this
      App.go({
        url:'home.html#/index',
        data:{
          name:name,
          age:8,
          height:'190'
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .login{
    .bg-cover("./imgs/bg.png");
    .absolute;
    z-index:-1;
    left:0px;
    top:0px;
    .w;
    .h;
    .content{
      .fixed-center(656,400);
      .inp{
        .w;
        .b-white;
        .h(90);
        .relative;
        .radius(6px);
        &:first-child{
          .bor-b(#E0E0E0);
        }
        img{
          .ab-m(39);
          .w(39);
          left:33px;
        }
        input{
          font-size:22px;
          color:#263238;
          .block;
          .w;
          .h;
          .t-c;
          padding:0 100px;
        }
      }
      button{
        margin-top:34px;
      }
      .ext{
        .t-c;
        font-size:28px;
        line-height:27px;
        margin-top:34px;
        color:#FFFDE7;
        span{
          color:@warning;
        }
      }
    }
    .bot{
      .fixed;
      left:0px;
      right:0px;
      bottom:0px;
      padding:45px 50px;
      .flex-between;
      .flex-mid;
      font-size:28px;
      line-height:27px;
      color:white;
      img{
        height:27px;
        width:auto;
      }
      .left,.right{
        .flex-mid;
        span{
          margin:0 12px;
        }
      }

    }
  }
</style>