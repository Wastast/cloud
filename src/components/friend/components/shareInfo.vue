<template>
  <div class="timeline">
    <ul class="timeline-ul">
      <!-- 分享mv -->
      <li v-for="(share,i) of shareInfo" :key="i">
        <div class="head-img">
          <a href="javascript:;" >
            <img :src="info.upic?'/api'+info.upic:'/staticimg/default_avatar.jpg'" alt="头像">
          </a>
        </div>
        <div class="timeline-right">
          <div class="timeline-main">
            <div class="type">
              <a class="name" href="javascript:;">{{info.uname}}</a>
              <!-- <sup class="u-icon u-icon-1"></sup> -->
              <!-- <span class="share">分享MV</span> -->
            </div>
            <!-- <div class="time">
              <a href="javascript:;">2月15日 17:29</a>
            </div> -->
            <div class="text">{{share.msg}}</div>
            <!-- 视频 -->
            <video-info :share="share" :i="i" v-if="share.video" ref="videoss" :videos="video"></video-info>
            <music-pic :share="share" v-if="share.audio"></music-pic>
            <!-- 赞、评论 -->
            <!-- <comment-info></comment-info> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import VideoInfo from "./video"
import MusicPic from "./MusicPic"
import CommentInfo from "./comment"
import {mapState} from 'vuex'
export default {
  data () {
    return {
      video:''
    }
  },
  props:["shareInfo",'info'],
  methods:{
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components:{
    VideoInfo,
    MusicPic,
    CommentInfo
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.clearfix:before,
.clearfix:after
  display table 
  content ""
.clearfix:after  
  clear both
.display
  display none
.icn
  background url(/staticimg/frd_dyn_sprite.png) 0 9999px no-repeat
.timeline-ul li:after
  display block
  content ""
  clear both
.timeline-ul li
  padding 20px 0
  border-bottom 1px solid #e8e8e9
.head-img 
  float left
  width 54px
  height 45px
  a
    img
      width 45px
      height 45px
.timeline-right
  width 564px
  margin-left 1px
  float left
.type
  font-size 14px
.name
  color #0c73c2
.u-icon
  margin -3px 0 0 1px
  width 12px
  height 13px
  display inline-block
  overflow hidden
  vertical-align middle
.u-icon-1
  background url(/staticimg/icon.png) 0 1px no-repeat
.u-icon-2
  background url(/staticimg/icon2.png) -110px -190px no-repeat
.share
  color #666
.time
  margin-top 7px
  a
    color #999
.text
  margin-top 10px
  line-height 24px
  font-size 14px
  word-break break-word

// .slider-in
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   height: 100%;
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
.face img 
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
      &:hover
        color:#0c73c2
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
</style>
