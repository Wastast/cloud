<template>
  <div class="main" v-show="ml == true">
    <div class="title">
        <h3>登录</h3>
    </div>
    <div class="box-body">
        <div>
            <div class="log">
              <div class="u-main">
                <div class="u-plt"></div>
                <div class="f-mgt10">
                  <a href="javascript:;" class="register" @click="register()">
                    <i>注&nbsp;&nbsp;&nbsp;册</i>
                  </a>
                </div>
              </div>
              <div class="u-alt">
                <ul>
                  <li>
                    <a href="javascript:;" @click="phoneLogin()">
                      <i class="u-mlg u-mlg-sj">
                        <i class="iconfont icon-iphone"></i>  
                      </i>手机号登录
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="emailLogin()">
                      <i class="u-mlg u-mlg-wy"></i>网易邮箱账号登录
                    </a>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div> 
  </div>
</template>

<script>
import eventVue from '../../../assets/js/eventVue.js'
export default {
  data(){
    return {
      ml:false,
      pl:true,
      re:true,
      el:true
    }
  },
  created:function(){
    this.mlShow();
  },
  methods:{
    mlShow(){
      eventVue.$on("ml",(message)=>{
        this.ml = message
      })
    },
    phoneLogin(){
      this.ml = false;
      eventVue.$emit("pl",this.pl)
    },
    register(){
      this.ml = false;
      eventVue.$emit("re",this.re)
    },
    emailLogin(){
      this.ml = false;
      eventVue.$emit("el",this.el)
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/login.styl';
  .main
    .title
      height 38px
      padding 0 45px 0 18px
      font-weight bold
      color #fff
      line-height 38px
      background #2d2d2d
      border-bottom 1px solid #191919
      border-radius 3px 3px 0 0
      position relative
      cursor move
      h3
        font-size 14px
        float left
    .box-body
      width 528px
      border 1px solid #878787
      border-width 0 1px 1px
      border-radius 0 0 4px 4px
      overflow-y auto
      overflow-x hidden
      .log
        padding 40px 0 39px
        color #333
        font-size 12px
        &:after
          clear()
        .u-main
          float left
          width 224px
          padding 0 35px 3px 40px
          border-right 1px dotted #ccc
          .u-plt
            background url(/staticimg/platform.png) no-repeat 13px 0
            height 120px
          .f-mgt10
            margin-top 20px
            .phone-login
              width 219px
              color #fff
              background url(/staticimg/button2.png) right -428px
              padding 0 5px 0 0
              display inline-block
              height 31px
              line-height 31px
              overflow hidden
              vertical-align top
              text-align center
              cursor pointer
              &:hover
                background url(/staticimg/button2.png) right -510px
              &:hover i
                background url(/staticimg/button2.png) 0 -469px
              i
                width 184px
                background url(/staticimg/button2.png) 0 -387px
                padding 0 15px 0 20px
                pointer-events none
                display inline-block
                font-style normal
            .register
              width 219px
              color #333
              background url(/staticimg/button2.png) right -100px
              padding 0 5px 0 0
              display inline-block
              height 31px
              line-height 31px
              overflow hidden
              vertical-align top
              text-align center
              cursor pointer
              &:hover
                background url(/staticimg/button2.png) right -182px
              &:hover i
                background url(/staticimg/button2.png) 0 -141px
              i
                width 184px
                background url(/staticimg/button2.png) 0 -59px
                padding 0 15px 0 20px
                pointer-events none
                display inline-block
                font-style normal
        .u-alt
          float left
          padding 25px 0 30px 39px
          margin-top -15px
          li
            margin-top 25px
            a
              font-size 12px
              color #333
              line-height 38px
              cursor pointer
              &:hover
                text-decoration underline
              .u-mlg
                margin-right 14px
                width 38px
                height 38px
                display inline-block
                vertical-align middle
                font-style normal
              .u-mlg-sj
                width 36px
                height 36px
                border 1px solid #bbb
                border-radius 50%
                position relative
                i
                  font-size 26px
                  color green
                  position absolute
                  left 50%
                  top 50%
                  transform translate(-50%,-50%)
              .u-mlg-wy
                background url(/staticimg/logo.png) no-repeat -271px -670px
</style>