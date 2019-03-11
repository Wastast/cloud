<template>
  <div class="HomeCollection">
    <div class="collectionTitle">
        <h3>
        <span>{{info.uid==this.userInfo.uid?'我':info.uname}}收藏的歌单（{{arr.length}}）</span>
        </h3>
    </div>
    <ul class="collectionBody">
        <li v-for="item in arr" :key="item.gid">
        <router-link tag="div" :to="'/gather/'+item.gid" class="listHead">
            <img :src="'/api'+item.gimgurl">
            <a href="javascript:;" class="msk" title="云音乐飙升榜"></a>
            <div class="listBottom">
            <span class="icon-headset"></span>
            <span class="nb">16.6亿</span>
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
import {mapState} from 'vuex'
export default {
  props: ['info'],
  data () {
    return {
      arr: []
    }
  },
  watch: {
    info () {
      this.get()
    }
  },
  computed: {
    ...mapState(['userInfo','gatherList'])
  },
  methods: {
    get () {
      if(this.info.enshgid!=null) {
        var arr = this.info.enshgid.split(',')
        var g = []
        for(var key of arr) {
          for(var i of this.gatherList) {
            if(i.gid == key){
              g.push(i)
            }
          }
        }
        this.arr = g
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/userhome.styl';
    .collectionTitle
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
    .collectionBody
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
              overflow hidden
              text-overflow ellipsis
              display inline-block
              max-width 100%
              vertical-align middle
              color #000
              overflow hidden
</style>