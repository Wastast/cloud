<template>
  <div class="fixed">
    <div class="msgbox" ref="msgbox" style="display:none;" @mousedown="move">
      <phone-login></phone-login>
      <register @close="none"></register>
      <register-success @close="none"></register-success>
      <email-login></email-login>
      <more-login></more-login>
      <div class="close">
        <i @click="none"></i>
      </div>
    </div>
  </div>

</template>

<script>
import PhoneLogin from './components/phone_login'
// import Register from './components/mimayanzheng'
import Register from './components/register'
import RegisterSuccess from './components/register_success'
import EmailLogin from './components/email_login'
import MoreLogin from './components/moreLogin'
import { mapMutations,mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
    PhoneLogin,
    Register,
    RegisterSuccess,
    EmailLogin,
    MoreLogin
  },
  methods: {
    move (e) {
      if(e.target.className=='title') {
        // let op = e.target;    //获取目标元素
        let op = this.$refs.msgbox
        //算出鼠标相对元素的位置
        let disX = e.clientX - op.offsetLeft;
        let disY = e.clientY - op.offsetTop;
        document.onmousemove = (e)=>{    //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;  
          let top = e.clientY - disY;
          //绑定元素位置到positionX和positionY上面
          this.positionX = top;
          this.positionY = left;
          //移动当前元素
          op.style.left = left + 'px';
          op.style.top = top + 'px';
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    },
    none () {
      this.$refs.msgbox.style.cssText = 'display:none;'
    },
    login () {
      this.changeLogin(this.$refs.msgbox)
    },
    ...mapMutations(['changeLogin'])
  },
  mounted () {
    this.login()
  }
}
</script>

<style lang="stylus" scoped>
  .fixed
    z-index 9999
    .msgbox
      background-color red
      width 530px
      // min-height 313px
      position absolute
      top 147px
      left 676px
      z-index 999
      border-radius 4px
      box-shadow 0 5px 16px rgba(0,0,0,0.8)
      background #fff
      .close
        position absolute
        top 0
        right 0
        i
          position absolute
          top 15px
          right 17px
          cursor pointer
          float right
          display inline-block
          width 10px
          height 10px
          background url(/staticimg/layer.png) 0 -95px
           
</style>