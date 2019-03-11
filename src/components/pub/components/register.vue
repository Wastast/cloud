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
                <!-- 验证码 -->
                <div class="log6">
                  <input type="text" class="codeIn" v-model="inputCode" placeholder="请输入验证码">
                  <a href="javascript:;" title="点击切换验证码">
                    <canvas id="createC" class="createCode" width="60px" height="30px" background-color="#ddd" @click="handleCode"></canvas>
                  </a>
                </div>
                <div class="log7" @click="butRegister">
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
      tip:'',
      inputCode:'',  //用户输入的验证码
      ccode:'',
      vCode:'',
    }
  },
  created:function(){
    this.reShow();
  },

  //在页面加载完毕就执行该函数生成一个验证码
  mounted () {
    this.generatedCode()
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
    },

    log5(){
      this.$refs.log5.style.cssText = 'display:block;'
    },
    butRegister(){
      this.checkCode();
      if(this.vCode == true){
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
            if(result.data.code == 1){
            this.tip="该用户已注册";
            this.log5();
            }else{
            var url=`/api/user/register?uphone=${this.uphone}&upwd=${this.upwd}`;
            this.axios.get(url).then(result=>{
                if(result.data.code == 1){
                this.registerSuccess();
                }
            })
            }
        })
      }
    },

    //系统生成随机验证码
    generatedCode () {
        var createC=document.getElementById("createC");  //获取画布
        var ctx=createC.getContext("2d");  //创建画笔
        ctx.clearRect(-100,-50,200,100);  //清空画布
        ctx.font="18px SimHei";  //定义字体
        //绘制小黑点
        for(let i = 0;i < 150;i++){
            ctx.beginPath();
            ctx.arc(Math.random()*80,Math.random()*50,Math.random()*0.8,0*Math.PI/180,360*Math.PI/180)
            ctx.fillStyle = "black";
            ctx.fill();
        }
        //绘制验证码
        const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const color = ['#3b8ad4','#c20c0c','#f1a77a','#97d152','#303643','#e74c3c','#aa8866','#601f44','#dd28b4','#c2c7d8','#11f4bf'];
        let allCode = '';
        ctx.textBaseline="top";  //移动文本基准线
        ctx.translate(-5,5);    //移动原点        
        for (let i = 0; i < 4; i++) {
            //随机生成code
            let code = ''
            let index = Math.floor(Math.random() * 36)
            code = random[index];
            allCode += random[index]
            //随机颜色
            let codeColor = ''
            let colorIndex = Math.floor(Math.random() * 5)
            codeColor = color[colorIndex];
            ctx.fillStyle=codeColor;
            //移动原点
            let moveY=Math.random()*2*(0.5-Math.random()*1);
            ctx.translate(15,moveY);  //移动原点
            //旋转角度
            let arr=[Math.random()*-15*Math.PI/180,Math.random()*15*Math.PI/180]
            let jiaodu =arr[Math.floor(Math.random()*2)]
            ctx.rotate(jiaodu);  //旋转角度
            ctx.fillText(code,0,0);  //绘制code
            ctx.rotate(-jiaodu);  //清除旋转角度
            ctx.translate(-5,-moveY);  //移动原点
        }
        ctx.translate(-35,-5);  //回到初始原点
        this.ccode = allCode;  //将随机生成的code赋值给ccode
    },
    // 用户点击生成验证码
    handleCode () {
      this.generatedCode()
    },
    // 判断验证码是否输入准确
    checkCode () {
      let inputCode = this.inputCode
      inputCode = inputCode.toUpperCase()
      let ccode = this.ccode
      ccode = ccode.toUpperCase()
      if (inputCode != ccode) {
        this.tip="验证码错误";
        this.log5();
        var checkError=setTimeout(()=>{
          this.generatedCode();  //刷新验证码
          this.inputCode = '';  //清空验证码输入框
          clearTimeout(checkError);
        },1000);
      } else {
        this.vCode = true
      }
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
          &:after
            clear()
          .codeIn          
            float left
            width 100px
            display block
            padding 5px 8px 5px
            height 18px
            line-height 18px
            margin 0
            outline none
          a
            display block
            width 60px
            height 30px
            float right
            color #333
            font-size 20px
            .createCode
              width 60px
              height 32px
              background-color #ddd
        .log7
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