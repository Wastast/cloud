<template>
  <div class="HomeCreate">
    <div class="createTitle">
      <h3>
        <span>{{info.uid==this.userInfo.uid?'我':info.uname}}创建的歌单（{{gather.length+1}}）</span>
      </h3>
    </div>
    <ul class="createBody">
      <li>
        <div class="listHead">
          <div class="heartBox">
            <i class="heart iconfont icon-xinyi"></i>
          </div>
          <img :src="info.upic?'/api'+info.upic:'/staticimg/default_avatar.jpg'">
          <a href="javascript:;" class="msk" title="IAMABOT喜欢的音乐"></a>
          <div class="listBottom">
            <span class="icon-headset"></span>
            <span class="nb">1376</span>
            <a class="icon-play" href="javascript:;" title="播放"></a>
          </div>
        </div>
        <p class="listDec">
          <a class="listName" href="javascript:;" :title="info.uname + '喜欢的音乐'">{{info.uname}}</a>
        </p>
      </li>
      <li v-for="item in gather" :key="item.gid">
        <router-link tag="div" :to="'/gather/'+item.gid" class="listHead">
          <img :src="'/api'+item.gimgurl">
          <a href="javascript:;" class="msk" :title="item.gname"></a>
          <div class="listBottom">
            <span class="icon-headset"></span>
            <span class="nb">1376</span>
            <a class="icon-play" href="javascript:;" title="播放"></a>
          </div>
        </router-link>
        <p class="listDec">
          <router-link :to="'/gather/'+item.gid" class="listName" href="javascript:;" :title="item.gname">{{item.gname}}</router-link>
        </p>
      </li>
    </ul>
  </div>    
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  props: ['info','uid'],
  data() {
    return {
      list:[],
      gather:[],
    }
  },

  watch: {
    info () {
      this.userCreate()
    }
  },
  computed: {
    ...mapState(['gatherList','userInfo'])
  },
  methods: {
    userCreate (info) {
      if(this.info.creategid!=null) {
        var arr = this.info.creategid.split(',')
        var g = []
        for(var key of arr) {
          for(var i of this.gatherList) {
            if(i.gid == key){
              g.push(i)
            }
          }
        }
        this.gather = g
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/userhome.styl';
  .createTitle
    width 100%
    height 33px
    border-bottom 2px solid #c20c0c
    &:after
      clear()
    h3
      font-size 20px
      line-height 28px
      float left
      font-weigth normal
      span
        font-weight normal
  .createBody
    margin 20px 0 0 -50px
    font-size 12px
    color #333
    &:after
      clear()
    li
      width 140px
      height 165px
      overflow hidden
      float left
      display inline-block
      margin 0 0 30px 50px
      .listHead
        width 140px
        height 140px
        position relative
        .heartBox
          width 140px
          height 140px
          background-color rgba(00,00,00,0.4)
          position absolute
          top 0
          left 0
          .heart
            display inline-block
            // width 100%
            // height 100%
            position absolute
            top 50%
            left 50%
            // right 0
            // bottom 0
            transform translate(-50%,-50%)
            font-size 80px
            color #fff
        img 
          display block
          width 100%
          height 100%
        .msk
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background url(/staticimg/)
        .listBottom
          position absolute
          bottom 0
          left 0
          width 100%
          height 27px
          background url(/staticimg/coverall.png) 0 -537px
          color #ccc
          .icon-headset
            float left
            width 14px
            height 11px
            background url(/staticimg/iconall.png) 0 -24px
            margin:9px 5px 9px 10px
            display inline-block
          .nb
            float left
            margin 7px 0 0 0
          .icon-play
            position absolute
            right 10px
            bottom 5px 
            width 16px
            height 17px
            background url(/staticimg/iconall.png) 0 0
            display inline-block
            float right
            cursor pointer
      .listDec
        margin 8px 0 3px
        font-size 14px
        width 100%
        display block
        color #333
        .listName
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
          display inline-block
          max-width 100%
          vertical-align middle
          color #000
          overflow hidden
</style>