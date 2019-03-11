<template>
  <div class="desc"> 
    <!-- 修改模块 -->
    <div class="gather-update" v-show="isDesc">
      <div class="header">
        <router-link to="/">cloud</router-link>
        >
        <span>编辑歌单</span>
      </div>
      <div class="body">
        <div class="info">
          <div class="update-name">
            <label for="mname">歌单名：</label>
            <input type="text" id="mname">
          </div>
          <div class="update-desc">
            <label for="desc">介绍：</label>
            <textarea name="desc" id="" cols="30" rows="10">
            </textarea>
          </div>
          <div class="btn">
            <a href="javascript:;" class="affirm">保存</a>
            <a href="javascript:;" class="close">确认</a>
          </div>
        </div>
        <div class="img-box">
          <img src="/staticimg/109951163264186297.jpg" alt="">
        </div>
      </div>
    </div>

    <!-- 歌单信息模块 -->
    <div class="gather-item" v-show="!isDesc">
      <div class="header">
        <div class="img-box">
          <img :src="list.gimgurl?'/api'+list.gimgurl:uinfo.upic?'/api'+uinfo.upic:'/staticimg/default_avatar.jpg'" alt="">
        </div>
        <div class="info">
          <div class="info-header">
            <i class="img"></i>
            <router-link :to="'/gather/'+list.gid" class="title">{{list.gname?list.gname:uinfo.uname+'喜欢的音乐'}}</router-link>
            <!-- <a href="javascript:;" class="update" @click="handleedit">编辑</a> -->
          </div>
          <div class="info-user">
            <router-link :to="/user_home/+uinfo.uid"> 
              <img :src="uinfo.upic?'/api/'+uinfo.upic+'':'/staticimg/default_avatar.jpg'">
            </router-link>
            <router-link :to="/user_home/+uinfo.uid" class="user-name">{{uinfo.uname}}</router-link>
          </div>

          <div class="info-btn">
            <a href="javascript:;">
              <span class="play">播放</span>
            </a>
            <a href="javascript:;">
              <span class="collect">收藏</span>
            </a>
            <a href="javascript:;">
              <span class="download">下载</span>
            </a>
            <a href="javascript:;">
              <span class="word">评论</span>
            </a>
          </div>
        </div>
      </div>

      <div class="card-head">
          <a class="tilte">歌曲列表</a>
          <span class="more">
              <a class="more-a">播放: <span style="color:#c10d0c;">0</span>次</a>
          </span>
      </div>

      <div>
        <table class="gather-table">
          <thead>
            <tr>
              <th class="first-w1"></th>
              <th class="w2">歌曲标题</th>
              <th class="w3">时长</th>
              <th class="w4">歌手</th>
              <th class="w5">专辑</th>
            </tr>
          </thead>
          <tbody>
            <tr class="item" v-for="(item,i) of songs" :key="item.mid" :style="{background: (i%2==0?'#fff':'#f7f7f7')}">
              <!-- 下标 -->
              <td>
                <span class="count">{{i+1}}</span>
                <span class="play" :class="pid==item.mid?'now-paly':''" @click="getsid(item)"></span>
              </td>
              <!-- 歌名 -->
              <td >
                <router-link :to="'/my_playlist/'+item.mid" href="javascripg:;">{{item.mname}}</router-link>
              </td>
              <!-- 歌曲时间 -->
              <td>
                <span class="time">{{item.mtime}}</span>
                <div class="btn">
                  <span class="add" @click="addplaylist(item)"></span>
                  <span class="collet" @click="addsong(item)"></span>
                  <a class="download" :href="'/staticaudio'+item.mpath" download=""></a>
                  <span class="delect" @click="delsong(item)"></span>
                </div>
              </td>
              <td>
                <a href="javascript:;">{{item.msinger}}</a>
                </td>
              <td>
                <a href="javascript:;">{{item.mtime}}</a>
                </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-head">
        <a class="tilte">评论</a>
        <span class="more" style="float:left; margin-left: 20px;">
            <a class="more-a"> 共 <span>{{comments.length}}</span>条评论</a>
        </span>
      </div>
      <div class="user-comment">
        <!-- 评论框 -->
        <div class="info-box">
          <div class="img-box">
            <img :src="this.userInfo.upic?'/api/'+this.userInfo.upic:'/staticimg/default_avatar.jpg'">
          </div>
          <div class="info-msg">
            <textarea cols="30" rows="10" v-model="text"></textarea>
            <div class="info-btn">
              <span>140</span>
              <a href="javascript:;" @click="getText">评论</a>
            </div>
          </div>
        </div>
        <div class="into-title">
          <span>最新评论({{comments.length}})</span>
        </div>
        <ul class="list">
          <li class="item" v-for="item of comments" :key="item.cid">
            <router-link tag="div" :to="'/user_home/'+item.uid" class="user-head">
              <img :src="'/api'+item.upic">
            </router-link>
            <div class="user-msg">
              <div class="msg-title">
                <router-link :to="'/user_home/'+item.uid">{{item.uname}} &nbsp;</router-link>:&nbsp; {{item.ccontent}}
              </div>
              <div class="msg-time">
                <span>{{item.ctime|dataFilter}}</span>
                <!-- <div class="msg-back">
                  <i></i>
                  <span>|</span>
                  <a href="javascript:;">回复</a>
                </div> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
import eventVue from '../../../assets/js/eventVue.js'
export default {
  props: ['gather','user','list','pid','comments','msg'],
  data () {
    return {
      usersongmusic:[],
      uinfo: [],
      text: '',
      isDesc: false
    }
  },
  watch:{
    gather () {
      this.userg(this.gather.mid)
    },
    user () {
      this.uinfo=this.userList[this.user-1]
    },
    list () {
      if(this.list.uid == undefined) {
        this.uinfo = this.userInfo
      }else{
        if(this.list.uid!=null){
          this.uinfo = this.userList[this.list.uid-1]
        }
      }
    }
  },
  computed: {
    songs () {
      var arr = []
      if(this.list.mid == null) {
        arr = this.list
      }else{
        var g = this.list.mid.split(',')
        for(var key of g) {
          arr.push(this.songList[key-1])
        }
      }
      return arr
    },
    ...mapState(['songList','gatherList','userList','userInfo','play','playlist'])
  },
  methods:{
    addsong(data){
      if(this.userInfo) {
        eventVue.$emit("coll",data)
        this.msg.style.cssText = "dispaky:block;"
      }else {
        this.$alert('您还未登录，请登陆后操作', {
          confirmButtonText: '确定',
        });
      }
    },
    delsong (item) {
      this.$emit('delsong',item.mid)
    },
    handleedit () {
      this.isDesc = !this.isDesc
      console.log(1111)
    },
    addplaylist (item) {
      var bool = false
      if(this.playlist){ 
        this.playlist.forEach((e) => {
          if(e.mid == item.mid) {
            bool = true
            alert('已经存在该歌曲，无法添加')
            return
          }
        })
      }
      if(!bool){
        this.addPlayList(item)
      }
    },
    userg (gids) {
      var arr = []
      if(gids!=''){
        gids = gids.split(',')
        const song = []
        gids.forEach(element => {
          song.push(this.$store.state.songList[element-1])
        });
        this.usersongmusic = song
      }
    },
    getsid (item) {
      this.$store.state.audio.src = '/api'+item.mpath
      this.getPlay(item)
      this.$store.state.audio.play()
      var bool = false
      if(this.playlist){
        this.playlist.forEach((e) => {
          if(e.mid == item.mid) {
            console.log(1)
            bool = true
            return
          }
        })
      }
      if(!bool){
        this.addPlayList(item)
      }
    },
    getText () {
      if(this.text!=''){
          this.$emit('changeComment',this.userInfo,this.text)
          this.text = ''
          return
      }
      this.$alert('内容不能为空', {
        confirmButtonText: '确定',
      });
    },
    ...mapMutations(['deletePlayList','getGatherList','getUserSongList','getSongList','getPlay','addPlayList']),
  }
}
</script>

<style lang="stylus" scoped>
  .desc
    width 740px
    float right
    .gather-update
      padding 40px
      width 660px
      height 404px
      .header
        height 28px
        border-bottom 1px solid #ccc
        a
          color #0c73c2
      .body
        width 660px
        height 346px
        margin-top: 30px
        .info
          float left
          width 364px
          height 346px
          margin-right: 30px
          label 
            margin-left 10px
            line-height 30px
          .update-name
            margin-bottom 20px
            input
              float right
              width: 292px
              height: 19px
              padding: 4px 6px 5px
              outline none
              border: 1px solid #cdcdcd
              border-radius: 2px
          .update-desc
            textarea
              width 306px
              height 135px
              border: 1px solid #cdcdcd      
              float right
              outline none
          .btn
            text-align center
            a
              line-height 30px
              text-align center
              margin 20px 20px 0 0
              display inline-block
              width 80px
              height 30px
              border 1px solid #ccc
              
        .img-box
          float left
          img
            width 140px
            height 140px
    .gather-item
      width 740px
      .header
        padding: 40px;
        width 660px
        height 200px
        .img-box
          width 208px
          height 208px
          padding 3px 0 0 3px
          box-sizing border-box
          border 1px solid #ccc
          float left
          margin-right 20px
          img
            width 200px
            height 200px
        .info
          font left 
          .info-header
            height 24px
            margin-top 8px
            margin 8px 0 10px 0
            .img
              width 54px
              height 24px
              margin-right 5px
              display inline-block
              background url(/staticimg/icon.png) 0 -243px
              vertical-align top
            .title 
              width 300px
              color: #333
              display inline-block
              font-size: 22px;
              white-space nowrap
              text-overflow ellipsis
              overflow hidden
            .update
              display inline-block
              float right
              background url(/staticimg/table.png)  0px -259px
              padding 2px 0 0 18px
              line-height: 17px;
              color: #0c73c2
              &:hover
                background url(/staticimg/table.png) 0 -280px
          .info-user
            height 35px
            margin-bottom 20px
            img
              width 35px
              height 35px
              vertical-align middle
              margin-right 10px
            .user-name
              color: #0c73c2
              line-height 35px
              margin-right: 20px
            .time
              color: #999
          .info-btn
            height 31px
            margin-bottom 25px
            a
              display inline-block
              width 59px
              line-height 31px
              color: #000
              font-family: simsun,\5b8b\4f53;
              span
                display block
      .card-head
        height 33px
        padding 0 10px 0 34px
        border-bottom 2px solid #C10D0C
        .tilte 
          float left
          font-size 20px
          line-height 28px
          color #000
        .tabs
          float left
          margin 7px 0 0 20px
          .tab-a
            color #666
          .tab-span
            color #ccc
            margin 0 10px
        .more
          float right
          margin-top 7px
          .more-a 
            color #666
    .gather-table
      border-collapse: collapse
      margin-bottom 40px
      th
        height 34px
        padding-bottom 4px
        text-align left 
        color: #666;
        padding-left: 10px
        background url(/staticimg/table.png) 0 0
      .first-w1
        width 64px
      .w2
        width 299px
      .w3
        width 101px
      .w4
        width 103px
      .w5
        width 147px
      .item
        &:hover .btn
          display block
        &:hover .time
          display none
        .btn
          display none 
          span
            cursor pointer
            width 16px
            height 16px
          a
            display inline-block
            width 16px
            height 16px
          .add
            background url(/staticimg/icon.png) 0 -698px
            &:hover
              background url(/staticimg/icon.png) -22px -698px
          .collet
            background url(/staticimg/icon.png) -45px -86px
            &:hover
              background url(/staticimg/icon.png) -45px -109px
          .download
            background url(/staticimg/table.png) -82px -173px
            &:hover
              background url(/staticimg/table.png) -105px -173px
          .delect
            background url(/staticimg/table.png) 0 -215px
            &:hover
              background url(/staticimg/table.png) -20px -215px
        td
          padding-left: 10px
          height 30px
          color: #333
          a
            color:#333
            &:hover
              text-decoration underline 
          span
            display inline-block
          .play
            width 17px
            height 17px
            vertical-align middle
            margin-right: 10px
            float right
            cursor pointer
            background url(/staticimg/table.png) 0 -103px
            &:hover
              background url(/staticimg/table.png) 0 -128px
          .now-paly
            background-position: -20px -128px;
            &:hover
              background-position: -20px -128px; 
          .count
            margin-top: 3px
    .user-comment
      width 740px
      overflow hidden
      padding 20px 30px 0 30px
      box-sizing border-box
      .info-box
        width 676px
        height 98px
        margin-top 20px
        margin-bottom: 20px;
        .img-box
          width 50px
          height 50px
          float left
          img
            width 50px
            height 50px
        .info-msg
          width 614px
          height 98px
          float right
          textarea
            width 100%
            box-sizing border-box
            padding: 5px 6px 6px;
            border 1px solid rgb(205, 205, 205)
            height 63px
            resize: none;
            overflow: auto;
            outline: none
          .info-btn
            height 35px
            float right
            margin-top 20px
            span
              color: rgb(153, 153, 153)
              margin-right: 10px
              line-height 25px
            a
              display inline-block
              width 46px
              height 25px
              text-align center
              line-height 25px
              float right
              background-color blue
              color: #fff
      .into-title
        width 100%
        height 21px
        border-bottom: 1px solid rgb(207, 207, 207);
        color: rgb(51, 51, 51)
      .list
        overflow hidden
        .item
          padding: 15px 0px;
          overflow hidden
          border-bottom: 1px dotted rgb(204, 204, 204);
          .user-head
            display inline-block
            width 50px
            height 50px
            float left
            cursor pointer
            img
              width 50px
              height 50px
          .user-msg
            width 610px
            height 50px
            float right
          .msg-title
            line-height: 20px;
            a
              color: rgb(12, 115, 194);
          .msg-time
            margin-top: 15px;
            color: rgb(153, 153, 153);
            .msg-back
              float right
              span
                color: rgb(204, 204, 204);
                margin: 0px 8px;
              i
                display inline-block
                width: 15px;
                height: 14px;
                background url(/staticimg/icon.png) -36px -680px
              a
                color: rgb(102, 102, 102);
</style>
