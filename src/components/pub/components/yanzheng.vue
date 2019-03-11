<template>
  <div class="main" v-show="re == true">
    <div class="title">
        <h3>手机号注册</h3>
    </div>
    <div class="box-body">
        <div>
            <div class="log">
                <div class="log1">
                    <label>手机号：</label>
                </div>
                <div class="log2">
                    <div class="txtwrap">
                    <input type="text" class="phone" placeholder="请输入手机号" autocomplete="off" v-model="uphone">
                    </div>
                </div>
                <div class="log3">
                    <label>密码：</label>
                </div>
                <div class="log4">
                    <input type="password" class="pwd" placeholder="设置登录密码，不少于6位" autocomplete="new-password" v-model="upwd">
                </div>
                <div class="log5" ref="log5">
                    <i class="u-icn"></i>
                    <span>{{tip}}</span>
                </div>
                <div class="log6" @click="butRegister">
                    <a href="javascript:;" class="loginBtn">
                    <i>下一步</i>
                    </a>
                </div>
            </div>
            <div class="btmbar">
                <a href="javascript:;" class="fl" @click="moreLogin()">&lt;&nbsp;&nbsp;其他登陆方式</a>
                <a href="javascript:;" class="fr" @click="phoneLogin()">返回登录&nbsp;&nbsp;&gt;</a>
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
      re:false,
      pl:true,
      ml:true,
      rs:true,
      uphone:'',
      upwd:'',
      tip:''
    }
  },
  created:function(){
    this.reShow();
  },
  methods:{
    reShow(){
      eventVue.$on("re",(message)=>{
        this.re = message
      })
    },
    moreLogin(){
      this.re = false;
      eventVue.$emit("ml",this.ml)
    },
    phoneLogin(){
      this.re = false;
      eventVue.$emit("pl",this.pl)
    },
    registerSuccess(){
      this.re = false;
      eventVue.$emit("rs",this.rs);
      // setTimeout(()=>{
      //   console.log(1)
      //   this.$emit('close')
      // },3000)
    },

    log5(){
      this.$refs.log5.style.cssText = 'display:block;'
    },
    butRegister(){
      var regP=/^1[3-8]\d{9}$/;
      var regU=/^\d{6,16}$/;
      if(!regP.test(this.uphone)){
        this.tip="请输入正确的手机号";
        this.log5();
        return;
      }
      if(this.upwd == ""){
        this.tip="请输入登录密码";
        this.log5();
        return;
      }
      if(!regU.test(this.upwd)){
        this.tip="请输入6-16位的密码";
        this.log5();
        return;
      }
      var url=`/api/user/userinfo?uphone=${this.uphone}`;
      this.axios.get(url).then( result => {
        console.log(123123);
        if(result.data.code == 1){
          this.tip="该用户已注册";
          this.log5();
          console.log("已注册");
        }else{
          var url=`/api/user/register?uphone=${this.uphone}&upwd=${this.upwd}`;
          this.axios.get(url).then(result=>{
            console.log(6666666);
            console.log(result.data.code);
            if(result.data.code == 1){
              this.registerSuccess();
            }
          })
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
        padding 30px 0 43px
        width 220px
        margin 0 auto
        .log1
            color #666
            label
                cursor default
        .log2
          margin-top 10px
          position relative
          width 218px
          height 30px
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
        .log3
            color #666
            margin-top 10px
        .log4
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
        .log5
          height auto
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
          .auto
            color #666
            cursor default
            .l-auto
              margin 0 12px 0 0
              vertical-align middle
          .forget
            color #666
            float right
            &:hover
              text-decoration underline
        .log6
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
          color #0c72c3
          font-size 12px
          float right
           
</style>

