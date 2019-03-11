<template>
  <div class="leftbar">
    <div class="header">
      <div class="img-box">
        <img :src="'/api/'+gatherList.gimgurl" alt="">
      </div>
      <div class="info">
        <div class="info-header">
          <i class="img"></i>
          <span :title="gatherList.gname">{{gatherList.gname}}</span>
        </div>
        <div class="info-user">
          <router-link :to="'/user_home/'+uinfo.uid"> 
            <img :src="uinfo.upic+''?'/api/'+uinfo.upic+'':'/staticimg/default_avatar.jpg'">
          </router-link>
          <router-link :to="'/user_home/'+uinfo.uid" class="user-name" href="javascript:;">{{uinfo.uname}}</router-link>
        </div>

        <div class="info-btn">
          <!-- <a href="javascript:;">
            <span class="play" @click="allPlay(gatherList.mid)">播放</span>
          </a>
          <a href="javascript:;">
            <span class="collect" @click="collection(gatherList.gid)">收藏</span>
          </a>
          <a href="javascript:;">
            <span class="download">下载</span>
          </a>
          <a href="javascript:;" @click="Jump">
            <span class="word">评论</span>
          </a> -->
          <a href="javacript:;" class="u-btn-addplay" @click="allPlay(gatherList.mid)">
            <i>
              <em class="ply"></em>
              <span>播放</span>
            </i>
            <a href="javacript:;" class="u-btn-add" @click="allPlay(gatherList.mid)">
          </a>  
          </a>
          <a href="javacript:;" class="u-btn-fav" @click="collection(gatherList.gid)">
            <i>收藏</i>
          </a>
          <a href="javacript:;" class="u-btn-share" >
            <i>评论</i>
          </a>
          <!-- <a href="javacript:;" class="u-btn-dl">
            <i>下载</i>
          </a> -->
        </div>
        <div class="desc" v-if="gatherList.gdesc">
          介绍:&emsp;{{gatherList.gdesc}}
        </div>   
      </div> 
    </div>

    <div class="card-head">
      <a class="tilte">歌曲列表</a>
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
          <tr class="item" v-for="(item,i) of songlist" :key="item.mid" :style="{background: (i%2==0?'#fff':'#f7f7f7')}">
            <td>
              <span class="count">{{i+1}}</span>
              <span class="play" :class="pid==item.mid? 'now-paly':''" @click="getsid(item)"></span>
            </td>
            <td>
              <router-link :to="'/my_playlist/'+item.mid"> {{item.mname}} </router-link>
            </td>
            <td>
              <span class="time">{{item.mtime}}</span>
              <div class="btn">
                <span class="add" @click="addplaylist(item)"></span>
                <span class="collet" @click="addsong(item)"></span>
                <a class="download" :href="'/staticaudio'+item.mpath" download=""></a>
              </div>
            </td>
            <td>
              <a href="javascript:;">{{item.msinger}}</a>
              </td>
            <td>
              <a href="javascript:;">{{item.mname}}</a>
              </td>
          </tr>
        </tbody>
      </table>

      <div class="user-comment" ref="comment">
        <div class="card-head">
          <a class="tilte">评论</a>
          <span class="more" style="float:left; margin-left: 20px;">
              <a class="more-a"> 共 <span>{{comments.length}}</span> 条评论</a>
          </span>
        </div>
        <div class="info-box">
          <div class="img-box">
            <img :src="nowUinfo.upic?'/api/'+nowUinfo.upic+'':'/staticimg/default_avatar.jpg'">
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
            <!-- <div class="user-head"> -->
            <router-link :to="'/user_home/'+item.uid" class="user-head">
              <img :src="'/api'+item.upic">
            <!-- </div> -->
            </router-link>
            <div class="user-msg">
              <div class="msg-title">
                <router-link :to="'/user_home/'+item.uid">{{item.uname}} &nbsp;</router-link>:&nbsp; {{item.ccontent}}
              </div>
              <div class="msg-time">
                <span>{{item.ctime|dataFilter}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-button type="text"></el-button>
  </div>
</template>

<script>

import {mapMutations,mapState} from 'vuex'
import eventVue from '../../../assets/js/eventVue.js'
export default {
  props: ['gather','msg','user','pid','comments'],
  data () {
    return {
      gatherList: {},
      songlist: [],
      uinfo: [],
      uid: '',
      nowUinfo: [],
      text: '',
      g: []
    }
  },
  watch: {
    gather () {
      this.gatherList = this.gather
      if(this.gather.mid!=null) {
        const arr = this.gather.mid.split(',')
        const song = []
        arr.forEach(element => {
          song.push(this.$store.state.songList[element-1])
        });
        this.songlist = song
      }
    },
    user () {
      this.uinfo=this.userList[this.user-1]
    }
  },
  computed: {
    ...mapState(['playlist','userList','userInfo','play','songList'])
  },
  methods: {
    load (item) {
      console.log(111)
      var a = document.createElement(a)
      a.href = '/staticaudio/HITA - 眉间雪.mp3'
      a.download = ''
      a.click()
    },
    getsid (item) {
      this.$store.state.audio.src = '/api'+item.mpath
      this.getPlay(item)
      this.$store.state.audio.play()
      var bool = false
      this.playlist.forEach((e) => {
        if(e.mid == item.mid) {
          bool = true
          return
        }
      })
      if(!bool){
        this.addPlayList(item)
      }
    },
    getText () {
      // 判断用户是否登录
      if(this.userInfo) {
        // 判断评论内容是否为空
        if(this.text!=''){
          this.$emit('changeComment',this.userInfo,this.text)
          this.text = ''
          return
        }
        this.$alert('内容不能为空', {
          confirmButtonText: '确定',
        });
        return
      }
      this.$alert('您还未登录，请登陆后操作', {
        confirmButtonText: '确定',
      });
    },
    Jump () {
      var Top = this.$refs.comment.offsetTop
      window.scrollTo(0,Top-150)
    },
    allPlay (item) {
      var arr = item.split(',')
      arr.forEach( (e)=> {
        if(this.playlist.indexOf(this.songList[e-1])==-1){
          this.addPlayList(this.songList[e-1])
        }
      })
    },
    collection (id) {
      // 判定是否有用户登录如果没有登录则提示
      if(this.userInfo){
        var ensh = this.userInfo.enshgid.split(',')
        var crea = this.userInfo.creategid.split(',')
        ensh = ensh.concat(crea)
        // 查询歌曲是否存在
        if(ensh.indexOf(id+'')>=0){
          this.$alert('歌单已存在', {
            confirmButtonText: '确定',
          });
        }else{
          ensh.push(id)
          var enshs = ensh.join(',')
          this.userInfo.enshgid = enshs
          this.userList[this.userInfo.uid-1].enshgid = enshs
          var url = `/api/user/updata?enshgid=${enshs}&uid=${this.userInfo.uid}`
          this.axios.get(url).then((res)=>{
            this.$alert('收藏成功', {
              confirmButtonText: '确定',
            });
          })
        }
        return
      }
      this.$alert('您还未登录，请登陆后操作', {
        confirmButtonText: '确定',
      });
    },
    //点击收藏 收藏列表跳出

    // 点击添加 添加到音乐播放列表
    addplaylist (item) {
      var bool = false
      this.playlist.forEach((e) => {
        if(e.mid == item.mid) {
          bool = true
          alert('已经存在该歌曲，无法添加')
          return
        }
      })
      if(!bool){
        this.addPlayList(item)
      }
    },
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
    ...mapMutations(['getPlay','getPlayList','addPlayList','getCollectSong'])
    // ...mapMutations(['deletePlayList','getGatherList','getUserSongList','getSongList','getPlay','addPlayList']),
  },
  //点击单个收藏歌曲
  
  mounted () {
    this.nowUinfo = this.userInfo
  }
}
</script>

<style lang="stylus" scoped>
  .leftbar
    float left
    width 709px
    box-sizing border-box
    padding: 47px 30px 70px 39px
    border-right: 1px solid #d3d3d3
    .header
      width 640px
      height 231px
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
        width 410px
        height 231px
        float right
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
          span
            width 300px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            display inline-block
            font-size: 22px;
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
        height: 31px;
        margin-bottom: 25px;
        // width:473px;
        // display:flex;
        // justify-content:space-between;
        .u-btn-addplay
          display: inline-block;
          width: 107px;
          height: 31px;
          vertical-align: top;
          text-align: center;
          color: #fff;
          font-style normal
          padding: 0 5px 0 0;
          i   
            display: inline-block;
            height: 31px;
            width: 46px;
            padding: 0 7px 0 8px;
            color: #fff;
            text-align: center;
            background: url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -469px;
            .ply
              display: inline-block;
              width: 18px;
              height: 20px;
              float: left;
              margin: 6px 2px 2px 0;
              vertical-align: middle;
              background: url(/staticimg/iconall.png-0a65b1494f7f0140992c57396b09dff1.png) 0 0;
            span
              display: inline-block;
              width: 26px;
              height: 31px; 
              line-height: 31px;
              text-align: center;
              float: right;
              font-style: normal;
              font-size:12px;  
          i:hover
            background:url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -551px;  
    
          .u-btn-add
              margin-left: -5px;
              margin-bottom: 1px;
              background:url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) -40px -1587px;
          .u-btn-add:hover
              background:url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) -80px -1587px;
        .u-btn-add,.u-btn-fav,.u-btn-share,.u-btn-dl,.u-btn-cmmt
          display: inline-block;
          width: 31px;
          height: 31px;
          margin-right: 6px;
          padding-right: 5px;
          background:#afa;
        .u-btn-fav
          width: 84px;
          i
            padding: 0 2px 0 28px;
            display: inline-block;
            width: 60px;
            height: 31px;
            background: url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -977px;
            color: #000;
            font-style: normal;
            text-align: center;
            line-height: 31px;
            font-size: 12px;
            border-right: 1px solid #ccc;
        .u-btn-share
          width: 66px;
          i
            padding-right: 2px;
            display: inline-block;
            padding-left: 28px;
            width: 40px;
            height: 31px;
            background: url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -1225px;
            color: #000;
            font-style: normal;
            text-align: center;
            line-height: 31px;
            font-size: 12px;
            border-right: 1px solid #ccc;
        .u-btn-dl
          width: 54px;
          i
            padding-right: 2px;
            display: inline-block;
            padding-left: 28px;
            width: 30px;
            height: 31px;
            background: url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -2761px;
            color: #000;
            font-style: normal;
            text-align: center;
            line-height: 31px;
            font-size: 12px;
            border-right: 1px solid #ccc;
      .desc
        line-height 18px
        width: 345px
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
      border: 1px solid rgb(217, 217, 217);
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
          span,a
            width 16px
            height 16px
            cursor pointer
          .add
            background url(/staticimg/icon.png) 0 -698px
            &:hover
              background url(/staticimg/icon.png) -22px -698px
          .collet
            background url(/staticimg/icon.png) -45px -86px
            &:hover
              background url(/staticimg/icon.png) -45px -109px
          .download
            display inline-block
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
            text-decoration: underline
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
      margin-top: 40px
      width 640px
      .info-box
        width 640px
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
          width 578px
          height 98px
          float right
          textarea
            width 100%
            box-sizing border-box
            padding: 5px 6px 6px;
            border 1px solid rgb(205, 205, 205)
            height 50px
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
              background url(/staticimg/button.png) no-repeat -84px -64px
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
          // height 153px
          overflow hidden
          // display inline-block
          border-bottom: 1px dotted rgb(204, 204, 204);
          .user-head
            display inline-block
            width 50px
            height 50px
            float left
            img
              width 50px
              height 50px
          .user-msg
            width 580px
            // height 50px
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
