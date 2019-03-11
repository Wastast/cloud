<template>
<div>
  <div class="g-bd">
    <div class="notlogin">
      <a href="javascript:;" class="bdlogina" @click="box"></a> 
    </div>
      <p>
        你可以关注明星和好友品味他们的私房歌单<br>
        通过他们的动态发现更多精彩音乐
      </p>
  </div>
  <msg-box ref="msgbox"> </msg-box>
  <!-- <index-footer> </index-footer> -->
</div>
</template>

<script>
import IndexFooter from '../../Index/components/Footer'
import MsgBox from '../../pub/Msgbox'
export default {
  data () {
    return{}
  },
  methods:{
    deng(){
    },
    box () {
      this.$refs.msgbox.$refs.msgbox.style.cssText = 'display:block;'
    }
  },
  components: {
    IndexFooter,
    MsgBox
  }
}
</script>
<style lang="stylus">
  .g-bd
    position relative
    width 982px
    height 700px
    margin 0 auto 
    background-color #fff
    border 1px solid #d3d3d3
    border-width 0 1px
    .notlogin
      background url(/staticimg/notlogin.jpg) no-repeat center 0;
      width: 902px;
      height: 414px;
      margin: 0 auto 0;
      padding-top: 70px;
      background-position: 0 70px;
      position relative
    p
      position absolute
      top 260px
      left 569px
      line-height 23px
      color #666
      font-size 14px
    .bdlogin
      position absolute
      top 70px
      right 120px
      width 902px
      height 484px    
    .bdlogina
      position absolute
      bottom: 106px
      right: 210px
      display: block
      width: 157px;
      height: 48px;
      &:hover
        background url(/staticimg/notlogin.jpg)
        background-position: 0 -430px;  
</style>