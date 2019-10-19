<template>
  <div class='page'>
    <v-title>hello {{name}}!</v-title>
    <ul class="ul">
      <li v-for='li in data' :key='li.id' @click='toDetail(li.id)'>
        <img :src="li.img" alt="">
        <h5>{{li.name}}</h5>
        <p>{{li.des}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { request } from 'http'
export default {
  data(){
    return{
      data:[],
      name:''
    }
  },
  methods:{
    request(){
      App.request({
        url:'test',
        data:{}
      }).then(r=>{
        console.log(r)
        this.data=JSON.stringify(r)
      })
    },
    toDetail(o){
      App.go({
        url:'home.html#/detail',
        data:{
          id:o
        }
      })
    }
  },
  created(){
    let name=App.getParam().name
    this.name=name=='undefined'?'boy':name
    let _this=this
    App.request({
      url:'home/data',
    }).then(r=>{
      console.log(r)
      _this.data=Object.freeze(r.data)
    })
  }
}
</script>

<style lang='less' scoped>
  .page{
    padding-top:90px;
    .ul{
      li{
        .relative;
        height:230px;
        border-bottom:1px solid rgba(224, 224, 224, 1);
        color:#263238;
        background:white;
        &:active{
          background:#efefef;
        }
        &:last-child{
          border:none;
        }
        img{
          .ab-m(130);
          .w(130);
          object-fit: contain;
          left:50px;
        }
        h5{
          .absolute;
          font-size:42px;
          line-height:41px;
          left:253px;
          top:49px;
        }
        p{
          .absolute;
          font-size:23px;
          line-height:36px;
          left:253px;
          right:56px;
          top:100px;
          color:#263238;
        }
      }
    }
  }
</style>