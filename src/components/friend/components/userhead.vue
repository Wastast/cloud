<template>
  <div class="friend-right">
    <div class="user">
      <div class="clearfix">
        <a href="javascript:;" class="face">
          <img :src="info.upic?'/api'+info.upic:'/staticimg/default_avatar.jpg'">
        </a>
        <a href="javascript:;" class="uname">{{info.uname}}</a>
      </div>
      <ul class="view clearfix">
        <li>
          <a href="javascript:;">
            <em>0</em>
            <i>动态</i>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <em>0</em>
            <i>关注</i>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <em>0</em>
            <i>粉丝</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:["info"],
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.clearfix:before,
.clearfix:after  
  display table 
  content: ""
.clearfix:after  
  clear both
.friend-right
  float left
  width 300px
  box-sizing border-box
.user
  height 153px
  padding 40px 0 0 30px
  background url(/staticimg/frduser.png) repeat-x 0 0
.face
  display block
  float left 
  width 62px
  height 62px
  padding 2px
  background #fff
  border 1px solid #dadada
  img 
    width 62px
    height 62px
.uname
  display block
  float left
  width 160px
  padding-left 20px
  font-size 14px
  color #333
  font-weight bold
.view
  margin-top 26px
  li:first-child
    border-left 0
    a
      padding-left 0
  li
    float left
    margin 0 2px 0 -2px
    border-left 1px solid #c2c2c2
    a
      display block
      padding 0 20px
      color #666
      em
        display block
        padding 0 0 9px
        font-size 20px
        line-height 20px
        font-family Arial
        font-style:normal
      i 
        display block
        padding-left 2px
        font-style:normal
  a:hover
    color:#0c73c2
</style>
