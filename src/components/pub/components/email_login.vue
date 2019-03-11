<template>
  <div class="main" v-show="el == true">
    <div class="title">
        <h3>邮箱登录</h3>
    </div>
    <div class="box-body">
        <div>
            <div class="log">
              <div class="log1">
                  <div class="txtwrap">
                  <input type="text" class="phone" placeholder="请输入账号" autocomplete="off" v-model="uemail">
                  </div>
              </div>
              <div class="log2">
                  <input type="password" class="pwd" placeholder="请输入密码" autocomplete="new-password" v-model="upwd">
              </div>
              <div class="log3" ref="log3">
                  <i class="u-icn"></i>
                  <span>{{tip}}</span>
              </div>
              <div class="log4">
                  <label class="auto">
                  <input type="checkbox" class="l-auto" v-model="inputdata">
                  自动登录
                  </label>
                  <!-- <a href="javascript:;" class="forget">忘记密码？</a> -->
              </div>
              <div class="log5" @click="butLogin">
                  <a href="javascript:;" class="loginBtn">
                  <i>登&nbsp;&nbsp;&nbsp;录</i>
                  </a>
              </div>
            </div>
            <div class="btmbar">
              <a href="javascript:;" class="fl" @click="moreLogin()">&lt;&nbsp;&nbsp;其他登陆方式</a>
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
      el:false,
      ml:true,
      uemail:'',
      upwd:'',
      tip:'',
      inputdata:false
    }
  },
  created:function(){
    this.elShow();
  },
  methods:{
    elShow(){
      eventVue.$on("el",(message)=>{
        this.el = message
      })
    },
    moreLogin(){
      this.el = false;
      eventVue.$emit("ml",this.ml)
    },

    log3(){
      this.$refs.log3.style.cssText = 'display:block;'
    },
    butLogin(){
      var reg=/@/;
      if(!reg.test(this.uemail)){
        this.tip="请输入正确的邮箱账号";
        this.log3();
        return;
      }else if(this.upwd == ""){
        this.tip="请输入密码";
        this.log3();
        return;
      }
      var url=`/api/user/login?uemail=${this.uemail}&upwd=${this.upwd}`;
      this.axios.get(url).then( result => {
        if(result.data.code == -1){
          this.tip="邮箱账号或密码错误";
          this.log3();
        }else{
          if(this.inputdata == true){
            localStorage.setItem("uid",result.data.data[0].uid);
          }else{
            sessionStorage.setItem("uid",result.data.data[0].uid);
          }
          location.reload();
          // this.$forceUpdate();
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
        padding 30px 0 40px
        width 220px
        margin 0 auto
        .log1
          position relative
          width 218px
          height 30px
          margin 0
          border 1px solid #cdcdcd
          border-radius 2px
          z-index 10
          .txtwrap
            overflow hidden
            .phone
              width 204px
              display block
              padding 5px 8px 5px
              height 20px
              line-height 20px
              border none
              margin 0
              outline none
        .log2
          margin-top 10px
          .pwd
            width 206px
            height 19px
            margin 0
            padding 5px 6px 6px
            border 1px solid #cdcdcd
            border-radius 2px
            line-height 19px
            outline none
        .log3
          height 18px
          line-height 18px
          margin-top 5px
          color #e33232
          display none
          .u-icn
            margin-top -2px
            margin-right 8px
            width 14px
            height 14px
            background url(/staticimg/icon.png) -50px -270px
            display inline-block
            overflow hidden
            vertical-align middle
        .log4
          margin-top 10px
          .auto
            color #666
            cursor default
            .l-auto
              margin 0 12px 0 0
              vertical-align middle
          // .forget
          //   color #666
          //   float right
          //   &:hover
          //     text-decoration underline
        .log5
          margin-top 20px
          .loginBtn
            width 215px
            color #fff
            background url(/staticimg/button2.png) right -428px
            padding 0 5px 0 0
            white-space nowrap
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
              width 180px
              color #fff
              background url(/staticimg/button2.png) 0 -387px
              padding 0 15px 0 20px
              pointer-events none
              display inline-block
              height 31px
              line-height 31px
              overflow hidden
              vertical-align top
              text-align center
              cursor pointer
              font-style normal
      .btmbar
        padding 0 19px
        height 48px
        border-top 1px solid #c6c6c6
        border-radius 0 0 4px 4px
        line-height 48px
        background-color #f7f7f7
        .fl
          color #0c72c3
          font-size 12px
          float left
        .fr
          font-size 12px
          color #999
          float right
           
</style>
