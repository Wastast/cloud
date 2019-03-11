<template>
  <div class="sidebar">
    <vuescroll :ops="ops">
      <div class="usergedan-list">
        <!-- 创建歌单列表 -->
        <div class="create-list">
          <h3 class="list-title" @click="listHidden(1)">创建的歌单({{createGather.length+1}})</h3>
          <!-- <a href="javascript:;" class="u-btn-new" @click.prevent="createMusic()">
            <i>新建</i>
          </a> -->
          <ul v-show="createList">
            <router-link tag="li" to="/user_music/my" class="item">
              <div class="item-img-box">
                <a href="javascript:;"> 
                  <img :src="'/api'+this.userInfo.upic">
                </a>
              </div>
              <div class="item-info" @click="cloud('my')">
                <a href="javascript:;">
                  <p class="item-title">我喜欢的音乐</p>
                </a>
                <p class="item-count">9首</p>
              </div>
            </router-link>
            
            <router-link tag="li" :to="/user_music/+i.gid" class="item" v-for="i of createGather" :key="i.gid">
              <div class="item-img-box">
                <a href="javasctipt:;"> 
                  <img :src="i.gimgurl?'/api'+i.gimgurl:'/staticimg/download.jpg'">
                </a>
              </div>
              <div class="item-info">
                <a href="javasctipt:;">
                  <p class="item-title">{{i.gname}}</p>
                </a>
                <p class="item-count">{{i.mid.split(',').length}}首</p>
              </div>
              <span class="item-btn">
                <!-- <a class="btn-update"></a> -->
                <!-- <a class="btn-delete" @click.prevent="deleteMusic(i.gid)"></a> -->
              </span>
            </router-link>
          </ul>
        </div>
        <!-- 收藏歌单列表 -->
        <div class="collect-list">
          <h3 class="list-title" @click="listHidden(2)">收藏的歌单({{collectGather.length}})</h3>
          <ul class="collectList" v-show="collectList">
            <!-- @click="cloud(item)" -->
            <router-link tag="li" :to="/user_music/+item.gid" class="item" v-for="(item) of collectGather" :key="item.gid"  >
              <div class="item-img-box">
                <a href="javascript:;"> 
                  <img :src="'/api'+item.gimgurl" alt="">
                </a>
              </div>
              <div class="item-info">
                <a href="javascript:;">
                  <p class="item-title">{{item.gname}}</p>
                </a>
                <p class="item-count">{{item.mid.split(',').length}}首 by {{item.uname}}</p>
              </div>
              <span class="item-btn">
                <a class="btn-delete" @click.prevent="deleteMusic(item.gid)"></a>
              </span>
            </router-link>
          </ul>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
import eventVue from '../../../assets/js/eventVue.js'
import vuescroll from 'vuescroll'
export default {
  props: ['user'],
  data () {
    return {
      ops: {
        bar: {
          background: '#c1c1c1',
        }
      },
      createList: true,
      collectList: true,
      songlis:[],
      lissong:[],
      liss:[],
      createGather: [],
      // collectGather: [],
      show:'display:block;'
    }
  },
  watch:{
    user: {
      handler () {
      },
      immediate: true 
    }
  },
  components: {
    vuescroll
  },
  computed: {
    collectGather () {
      var arr = this.userInfo.enshgid.split(',')
      var g = []
      for(var key of arr) {
        for(var i of this.gatherList) {
          if(i.gid == key){
            g.push(i)
          }
        }
      }
      return g
    },
    ...mapState(['songList','gatherList','userInfo'])
  },
  methods: {
    listHidden (i) {
      if(i==1){
        this.createList = !this.createList
        return;
      }
      this.collectList = !this.collectList
    },
    //页面刷新时
    songlist(){
      var i=5
      for(var os in this.gatherList){
        if(i == parseInt(this.gatherList[os].gid)) {
          this.songlis.push(this.gatherList[os])
          break;
        }
      }
      for(var s of this.gatherList){
        for( var j of s.mid.split(',')){
          if(i==parseInt(j)){
            this.liss.push(s)
            break;
          }
        }
      }
    },
    create (data) {
      var arr = data.split(',')
      var g = []
      for(var key of arr) {
        for(var i of this.gatherList) {
          if(i.gid == key){
            g.push(i)
          }
        }
      }
      this.createGather = g
    },
    createMusic(){
      eventVue.$emit("myFun",this.show);
    },
    deleteMusic(i){
      eventVue.$emit("myBad",this.show,i);
    },
    ...mapMutations(['deletePlayList','getGatherList','getCollectSong','getUserInfo','getUserSongList']),
  },
  mounted (){
    this.create(this.userInfo.creategid)
    this.songlist()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/pub.styl';
  .router-link-exact-active
    background: #e6e6e6;
  .sidebar
    position fixed
    top: 75px
    bottom 0
    width 240px
    height 100%
    padding-bottom: 100px
    box-sizing border-box
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid #d3d3d3;
    // border-left: 1px solid #d3d3d3;
    .usergedan-list
      padding-top: 40px
      .list-title
        color: #000
        font-size 14px
        padding: 5px 10px 12px 15px 
        cursor pointer 
      .u-btn-new
        color #333
        width 52px
        height 22px
        display inline-block
        background url(/staticimg/button.png)
        float right
        background-position 0 -96px
        position absolute
        top: 45px
        right: 20px
        &:hover
          background-position -94px -39px
        i
          display inline-block
          line-height 22px
          overflow hidden
          padding-left 20px
          color #515151
          font-size 12px
          font-weight normal
          font-style normal
          text-align left
      .item
        box-sizing border-box
        padding: 6px 0 6px 15px
        overflow hidden
        position relative
        cursor pointer
        &:hover
          background-color #f4f2f2
        &:hover .item-btn
          display block
        .item-img-box
          float left
          img
            width 40px
            height 40px
        .item-info
          float left
          margin-left 10px
          height 40px
          p
            ellipsis()
          .item-title
            color: #000
            margin-bottom: 8px
            width: 140px
          .item-count
            color: #999
            width: 140px
        .item-btn
          position absolute
          bottom 6px
          right: 0
          z-index 50
          display none
          a
            display inline-block
            width 17px
            height 17px
            cursor pointer
            opacity 0.7
          .btn-update
            background url(/staticimg/table.png) 0 -280px
            &:hover
              background url(/staticimg/table.png) 0px -259px
          .btn-delete
            background url(/staticimg/table.png) 0 -215px
            margin-right 10px
            &:hover
              background url(/staticimg/table.png) -20px -215px
    .item-bg
      background: #e6e6e6
</style>
