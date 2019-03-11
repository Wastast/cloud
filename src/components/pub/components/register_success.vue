<template>
  <div class="main" v-show="rs == true">
    <div class="title">
        <h3>手机号注册</h3>
    </div>
    <div class="box-body">
        <div class="lyct">
            <div class="f-fs1">
                恭喜你，注册成功
                <br><br>
                以后你可以直接用该手机号+密码登录
            </div>
            <div class="lybtn" @click="know">
                <a href="javascript:;" class="btn-know">
                    <i>知道了</i>
                </a>
            </div>
        </div>
    </div> 
  </div>

</template>

<script>
import eventVue from '../../../assets/js/eventVue.js'
export default {
  inject: ['reload'],
  data(){
    return {
      rs:false,
    }
  },
  created(){
    this.rsShow();
    
  },
  methods:{
    rsShow(){
      eventVue.$on("rs",(message)=>{
        this.rs = message
      });
    },
    know(){
      this.rs = false;
      this.$emit('close'); 
      this.reload()       
    },
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
      .lyct
        padding 40px 0
        text-align center
        &:after
            clear both
            content " "
            display block
        .f-fs1
            line-height 22px
            font-size 14px
            strong
                color #333
                font-weight bold
        .lybtn
            margin-top 30px
            .btn-know
                margin 0 10px
                color #fff
                background url(/staticimg/button2.png)
                background-position right -428px
                padding 0 5px 0 0
                display inline-block
                height 31px
                line-height 31px
                overflow hidden
                vertical-align top
                text-align center
                &:hover
                  background-position right -510px
                &:hover i
                  background-position 0 -469px
                i
                    width 40px
                    color #fff
                    background url(/staticimg/button2.png)
                    background-position 0 -387px
                    padding 0 15px 0 20px
                    pointer-events none
                    display inline-block
                    height 31px
                    line-height 31px
                    overflow hidden
                    vertical-align top
                    text-align center
                    font-style normal
</style>

