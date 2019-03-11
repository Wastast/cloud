<template>
  <div class="footerbar">
    <div class="foooter" @mouseover="transup(0)" @mousemove="transdown(0)"  @mouseout="transdown(y)"   :style="{transform: translateY,transition: transition}">
      <div class="player" >
        <div class="player-btn">
          <a class="prev" @click="tabSong(-1)"></a>
          <a class="play" @click="playsuspend()" ref="plays"></a>
          <a class="next" @click="tabSong(1)"></a> 
        </div>

        <!-- 用户头像区域 -->
        <div class="head-img">
          <img :src="this.play.mimgurl?'/api'+this.play.mimgurl:'/staticimg/download.jpg'" ref="audioimg">
        </div>

        <!-- 播放器进度条区域 -->
        <div class="player-schedule">
          <div class="user-info">
            <router-link class="songname" to="/">{{this.play.mname}}</router-link>
            <a class="singername">{{this.play.msinger}}</a>
          </div>
          <div class="schedule" @click="point" ref="j_pro">
            <div class="defalut" ref="red" :style="{width: redwidth}">
            </div>
            <div class="schedule-btn" @mousedown="move" ref="btn" :style="{left: btnLeft}">
            </div>
          </div>
          <!-- 歌曲时间 -->
          <span class="songtime">
            <em>{{aPresentTime}}</em> / {{aAllTime}}
          </span>
        </div>
        <div class="play-box">
          <div class="volume">
            <a class="volply" :class="volIconClass" ref="j_volply"></a>
            <div class="volume-list" ref="j_volBar" v-show="isVolBar == true">
                <div class="volbg" >
                  <div class="v-list" :style="{height: listHeight}"></div>
                  <div class="v-btn" @mousedown="moveVolu" ref="vbtn"></div>
                </div>
            </div>
          </div>
          <!-- 播放方式 -->
          <a class="play-style" @click="print()" ref="play"></a>
          <a class="play-list" @click="on()">
            <span class="song-count">{{aplaylistlength}}</span>
          </a>
          <div class="tip" ref="tip1" style="display:none"></div>
        </div>
      </div>
      <div class="f-fixed">
        <a href="javascript:;" :class="y==44?'not-look':'look'" @click="handleFix"></a>
      </div>
    </div>
    <audio @timeupdate="aUpdateTime()"  @canplaythrough="aTotalTime()" @ended="aEnd()" ref="audio" autoplay></audio>
    <!-- 播放列表 -->
    <div class="playlist" v-show="isshow">
      <div class="playlisthd">
        <h4>播放器({{aplaylistlength}})</h4>
        <!-- <a href="javascript:;" class="addall"><span class="icond"></span>收藏全部</a>
        <span class="line"></span> -->
        <a href="javascript:;" class="clear" @click="eliminate">
          <span class="icond"></span>清除
        </a>
        <span class="close" @click="on()"></span>
        <p></p>
      </div>
      <!-- 音乐盒子 -->
      <div class="playlistbd">
        <div class="playlistleft" style="display:none" ref="playlistleft1">
          <div class="nocnt">
            <i></i>
            你还没有添加任何歌曲
            <br>
            去首页
            <a href="javascript:;">发现音乐</a>
            或在
            <a href="javascript:;">我的音乐</a>
            收听自己收藏的歌单。
          </div>
        </div>
        <div class="playlistleft" ref="playlistleft2">
          <vuescroll :ops="ops">
            <ul class="f-cb">
                <!-- 播放列表 -->
              <li class="z-se" v-for="item of aplaylist" :key="item.mid" :ref="item.mid" :style="{backgroundColor: pid==item.mid ? 'rgba(0,0,0,0.3)':''}">
                <div class="col col-1">
                  <div class="playicn"></div>
                </div>
                <div class="col col-2" @click="getsid(item)">{{item.mname}}</div>
                <div class="col col-3">
                  <div class="icns">
                    <i class="ico ico1" @click="delet(item.mid)"></i>
                    <i class="ico ico2"></i>
                    <i class="ico ico3"></i>
                    <i class="ico ico4"></i>
                  </div>
                </div>
                <div class="col col-4">
                  <span title="">
                    <a href="javascript:;">{{item.msinger}}</a>
                  </span>
                </div>
                <div class="col col-5">{{item.mtime}}</div>
                <div class="col col-6">
                  <a href="javascript:;" class="ico ico-src"></a>
                </div>
              </li>
            </ul>
          </vuescroll>
        </div>
        <div class="bline"></div>
        <div>
          <a href="javascript:;" class="ico-ask"></a>
        </div>
        
          <div class="lyicbox">
            <div class="lyichid">
              <vuescroll :ops="ops" ref="vs"> 
                <p 
                ref="lyricLine"
                :id="i+'5'"
                v-for="(item,i) of lyic.lines" :key="i"
                :class="{'now':paragraph===i}">
                {{item.txt}}</p>
              </vuescroll>
            </div>
          </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import vuescroll from 'vuescroll'
import Lyric from 'lyric-parser'
export default {
  name:'Footer',
  data () {
    return {
      ops: {
        bar: {
          background: '#ccc',
        }
      },
      y: 44,
      translateY: 'translateY(47px)',
      transition: '1s 1s',
      timer: null,
      btnLeft: '',
      redwidth: '',
      volument: false,
      audio: '',
      aplaylist: [],
      isshow: false,
      aplaylistlength: 0,
      playbutton: true,
      s:null,
      pausedState: '',
      playClass: 2,
      playItem: '',
      isVolBar: false,
      listHeight: '93px',
      aCurrentTime:"",
      aDuration:"",
      pauseIconClass:"",
      volIconClass:"",
      pid: '',
      lyic: '',
      paragraph: ''
    } 
  },
  watch: {
    play () {
      if(this.lyic) {
        this.lyic.stop()
      }
      this.pid = this.play.mid
      this.axios.get(`/lyc/api/song/lyric?os=pc&id=${this.play.lyc}&lv=-1&kv=-1&tv=-1`).then((res)=>{
        this.lyic = new Lyric(res.data.lrc.lyric,this.handleLyric)
        this.lyic.play()
        this.$refs['vs'].scrollTo({y:0},500);
      })
      this.$nextTick(() =>{
        if(this.playItem!=''){
          this.playItem.querySelector('.playicn').style.display ='none'
        }
        var  li = this.$refs[String(this.play.mid)][0]
        li.querySelector('.playicn').style.display ='block'
        this.playItem = this.$refs[String(this.play.mid)][0]
      })
      if(this.$store.state.play!=""){
        this.playbutton=false
        this.$refs.plays.className="play1"
      }
    },
    playlist (){
      this.aplaylist=this.$store.state.playlist
      this.aplaylistlength=this.$store.state.playlist.length
      if(this.aplaylistlength!=0){
       this.$refs.playlistleft1.style.display="none"
       this.$refs.playlistleft2.style.display="block"
      }else{
        this.$refs.playlistleft1.style.display="block"
        this.$refs.playlistleft2.style.display="none"
      }
    },
    playClass: {
      handler () {
        if(this.$store.state.audio!= '') {
          if(this.playClass==0){
            this.$store.state.audio.loop = true
            // this.$refs.audio.onended = () => {
            //   this.lyic.seek(0)
            //   this.$refs['vs'].scrollTo({y:0},500);
            // }
          }else if (this.playClass==1){
            this.$store.state.audio.loop = false
            this.$refs.audio.onended = () => {
              this.tabSong(1)
            }
          }else{
            this.$store.state.audio.onended = null
            this.$refs.audio.onended = () => {
              var r = parseInt(Math.random()*this.playlist.length)
              this.getPlay(this.playlist[r])
              this.$store.state.audio.src = '/api'+this.play.mpath
              this.$store.state.audio.play()
            }
          }
        }
      },
      immediate: true
    },
    paragraph () {
      if(this.paragraph>=4){
        this.$refs['vs'].scrollTo({y:(this.paragraph-3)*32},500);
      }
    }
  },
  computed: {
    aAllTime () {
      // 歌曲总时间计算
      var m = parseInt(this.aDuration/60);
      var s = parseInt(this.aDuration%60);
      m = m<10 ? "0" + m : m;
      s = s<10 ? "0" + s : s;
      return m +':'+ s;
    },
    // 歌曲当前滚动时间进行计算
    aPresentTime() {
      var m = parseInt(this.aCurrentTime/60);
      var s = parseInt(this.aCurrentTime%60);
      m = m<10 ? "0" + m : m;
      s = s<10 ? "0" + s : s;
      return m +':'+ s;
    },
    ...mapState(['play','playlist','collectsong'])
  },
  methods: {
    // 切换底部是否固定定位
    handleFix () {
      this.y = this.y==44?0:44
    },
    getsid (item) {
      this.$store.state.audio.src = '/api'+item.mpath
      this.getPlay(item)
      this.$store.state.audio.play()
    },
    handleLyric({lineNum, txt}){
      this.paragraph = lineNum
    },
    // 上下切换歌曲
    tabSong (i) {
      if(this.playlist) {
        var m = 0;
        for(var key in this.playlist) {
          if(this.playlist[key].mid==this.play.mid) {
            m=parseInt(key)
          }
        }
        m = parseInt(m) + i
        m = m < 0? this.playlist.length-1:m
        m = m > this.playlist.length-1? 0:m
        this.getPlay(this.playlist[String(m)])
        this.$store.state.audio.src = '/api'+this.play.mpath
        this.$store.state.audio.play()
      }
    },
    // 清除播放列表数据
    eliminate () {
      this.clearList()
    },
    // 角落上下走事件
    transup (y,time) {
      this.transition = `0.2s 0s `
      this.translateY = `translateY(${y}px)`
    },
    transdown (y) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.transition = `0.4s 0.5s `
        this.translateY = `translateY(${y}px)`
      },200)
    },
    // 获取音频元素
    getaudio () {
      this.getAudio(this.$refs.audio)
    },
    // 删除播放列表里的歌曲
    delet(data){
      this.deletePlayList(data)
      if(data == this.play.mid){
        this.tabSong(-1)
      }
    },
    //播放状态切换
    playsuspend(){
      if(this.playlist.length != 0) {
        if(this.$store.state.audio.paused) {
          this.$refs.plays.className="play1"
          if(this.play) {
            this.$store.state.audio.play()
            this.lyic.togglePlay()
          }else{
            this.getPlay(this.playlist[0])
            this.$store.state.audio.src = '/api'+this.play.mpath
            this.$store.state.audio.play()
            if(this.lyic) {
              this.lyic.togglePlay()
            }
          }
        }else{
          this.$refs.plays.className="play"
          this.$store.state.audio.pause()
          this.lyic.togglePlay()
        }
      }
    },
    //播放方式切换
    print(){
      var a=this.$refs.play
      var t=this.$refs.tip1
      clearTimeout(this.s)
      // 单曲循环 
      if(this.playClass == 2){
        this.playClass = 0
        a.className="play-style1"
        t.innerHTML="单曲循环"
        t.style.display="block"
        this.s=setTimeout(function(){
          t.style.display="none"
        },2000)
      // 循环列表
      }else if(this.playClass == 0){
        this.playClass = 1
        a.className="play-style2"
        t.innerHTML="循环"
        t.style.display="block"
        this.s=setTimeout(function(){
          t.style.display="none"
        },2000)
      // 随机播放
      }else{
        this.playClass = 2
        a.className="play-style"
        t.innerHTML="随机播放"
        t.style.display="block"
        this.s=setTimeout(function(){
          t.style.display="none"
        },2000)
      }
    },
    // 点击按钮 播放列表的转换
    on(){
      if(this.isshow==false){
        this.isshow=true
      }else{
        this.isshow=false
      }
    },
    // 页面刷新时 播放左列表的转换
    playlistlefton(){
      if(this.aplaylistlength==0){
       this.$refs.playlistleft1.style.display="block"
       this.$refs.playlistleft2.style.display="none"
      }else{
        this.$refs.playlistleft1.style.display="none"
        this.$refs.playlistleft2.style.display="block"
      }
    },
    
    //  歌曲播放总时间
    aTotalTime(){
      this.aDuration = this.$refs.audio.duration;
    },
    //歌曲播放当前时间
    aUpdateTime(){
      // console.log(Math.floor(this.$refs.audio.currentTime*1000))
      // this.lyic.play();
      this.aCurrentTime = this.$refs.audio.currentTime;
      this.btnLeft =  parseInt( this.aCurrentTime/this.aDuration * 493-10 )+ 'px'
      this.redwidth = parseInt( this.aCurrentTime/this.aDuration * 493 )  + 'px'
    },
      // 歌曲按下并移动事件
    move (e) {
      let btn = this.$refs.btn
      let disX = e.clientX - btn.offsetLeft;
      this.aDuration = this.$refs.audio.duration
      this.aCurrentTime = this.$refs.audio.currentTime;
      let prgW = this.$refs.j_pro.clientWidth
      var left = 0
      document.onmousemove = (e) => {    
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        left = e.clientX - disX;
        // let left = 
        //移动当前元素
        if(left >=0 && left< 490) {
          this.btnLeft = left-10 + 'px'
          this.redwidth = left + 'px'
        }
      };
      document.onmouseup = (e) => {
        this.$refs.audio.currentTime = left / prgW * this.aDuration
        this.lyic.seek(this.$refs.audio.currentTime*1000)
        console.log(this.$refs.audio.currentTime*1000)
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    //歌曲点击进度条
    point(e){  
      var btn = this.$refs.btn;  
      if(e.target===btn){    
        //点击滑块自身不做任何事情    
      }else{    
        var prgW = this.$refs.j_pro.clientWidth;    //进度条总长    
        this.aDuration = this.$refs.audio.duration; //歌曲总时长    
        this.redwidth = e.layerX + 'px'  //红色进度条width      
        btn.style.left = e.layerX - 10 + "px"     //视频当前播放时间    
        // 切换时间
        this.$refs.audio.currentTime = e.layerX / prgW * this.aDuration;  
        // 歌词跳转
        this.lyic.seek(this.$refs.audio.currentTime*1000)
      }},
    // 移动音量调节
    moveVolu (e) {
      let btn = this.$refs.vbtn
      let disY = e.clientY - btn.offsetTop;
      document.onmousemove = (e) => {    //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let top = e.clientY - disY;
        //移动当前元素
        if(top >= 0 && top <= 83) {
          btn.style.top = top + 'px'
          this.listHeight = ( 83-top )+ 'px'
          this.$refs.audio.volume = (83-top)/83 //音量大小
        }
        if(this.listHeight == 0 + "px" ){
          this.volIconClass = "volno"
        }else{
          this.volIconClass = ""
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    aEnd(){
      this.redwidth = 0 + 'px'
      this.$refs.btn.style.left = - 10 + "px" 
      this.pauseIconClass = "play"
    },
    ready(){
      document.addEventListener('click',(e)=>{
        if(e.target===this.$refs.j_volply){
          this.isVolBar = !this.isVolBar;
        }
      })
    },
    ...mapMutations(['getAudio','deletePlayList','gatherList','getCollectSong','getPlay','clearList'])
  },
  mounted () {
    this.getaudio()
    this.print()
    this.playlistlefton()
    this.ready()
  },
  components: {
    vuescroll
  }
}
</script>

<style lang="stylus" scoped>
  .footerbar
    width 100%
    position fixed
    bottom 0
    z-index 999999
    .foooter
      width 100%
      height 53px
      position absolute
      bottom 0px
      background url(/staticimg/playbar.png) repeat
      .f-fixed
        width 67px
        height 62px
        background url(/staticimg/playbar.png) 0 -385px
        position absolute
        top: -9px
        right: 0
        a
          position: absolute
          top:  0
          left: 17px
          width 18px
          height 18px 
          background url(/staticimg/playbar.png)
        .not-look
          background-position: -80px -380px;
          &:hover
            background-position: -80px -400px;
        .look
          background-position: -100px -380px
          &:hover
            background-position: -100px -400px;
    .player
      width 980px
      height 47px
      margin 6px auto 0
      position relative
      .player-btn
        width 137px
        height 42px
        padding-top 6px
        float left
        a
          display block
          float left
          cursor pointer
        .prev
          width 25px
          height 25px
          margin-right: 11px
          margin-top: 5px
          background url(/staticimg/playbar.png) -1px -131px
          &:hover
            background url(/staticimg/playbar.png) -31px -131px
        .play
          width 35px
          height 35px
          margin-right: 9px
          background url(/staticimg/playbar.png) 0px -204px
          &:hover
            background url(/staticimg/playbar.png) -40px -204px
        .play1
          width 35px
          height 35px
          margin-right: 9px
          background url(/staticimg/playbar.png) 0 -165px
          &:hover
            background url(/staticimg/playbar.png) -40px -165px
        .next
          width 25px
          height 25px
          margin-right: 8px
          margin-top: 5px
          background url(/staticimg/playbar.png) -82px -131px
          &:hover
            background url(/staticimg/playbar.png) -112px -131px
      .head-img
        float left
        width 35px
        height 35px
        background url(/staticimg/playbar.png) 0 -80px
        margin: 6px 15px 0 0
        img 
          margin: 2px 0 0 2px
          width 30px
          height 30px
      .player-schedule
        float left
        width 608px
        height 37px
        .user-info
          width 608px
          line-height 22px
          padding-top: 3px
          .songname
            color: #e8e8e8
            margin-right 10px
            text-overflow ellipsis
            white-space nowrap
            word-wrap normal
          .singername
            color: #9b9b9b;
        .schedule
          width 493px
          height 9px
          display inline-block
          position relative
          background url(/staticimg/statbar.png) 0 0
          margin-right 10px
          user-select none
          .defalut
            height 9px
            display inline-block
            background url(/staticimg/statbar.png) 0 -65px
            z-index 9999
            position absolute
            left: 0
            top: -1px
          .schedule-btn
            position absolute
            left -10px
            top -2px
            cursor pointer
            z-index 99999
            width 22px
            height 24px
            transform translateY(-3.5px)
            background url(/staticimg/iconall.png) -2px -253px
            &:hover
              background url(/staticimg/iconall.png) -2px -283px
        
        span 
          display inline-block
          color: #a1a1a1
        .songtime
          position relative
          top -2px
          color #797979
          text-shadow 0 1px 0 #121212
          em
            font-style normal
            color #a1a1a1
      .download
        width 60px
        height 36px
        float left
        a
          display inline-block
          width 20px
          height 20px
          vertical-align middle
          cursor pointer
        .collection
          background url(/staticimg/playbar.png) -91px -165px
          margin: 13px 5px 0 0
          &:hover
            background url(/staticimg/playbar.png) -91px -191px
        .load
          background url(/staticimg/playbar.png) -117px -167px
          margin: 16px 7px 0 0
          &:hover
            background url(/staticimg/playbar.png) -117px -193px
      .play-box
        float left
        width: 125px;
        height 36px
        box-sizing border-box
        padding-top 15px
        a
          cursor pointer
          display inline-block
          width 25px
          height 25px
        .volume
          display inline-block
          width 25px
          height 25px
          z-index 9999
          .volply
            width 25px
            height 25px
            display inline-block
            background url(/staticimg/playbar.png) -5px -250px
            &:hover
              background-position -34px -250px
          .volno
            margin-top -2px
            background url(/staticimg/playbar.png) -127px -72px
            &:hover
              background-position -127px -72px
        .play-style
          background url(/staticimg/playbar.png) -66px -248px
          &:hover
            background url(/staticimg/playbar.png) -93px -248px
        .play-style1
          background url(/staticimg/playbar.png) -66px -344px
          &:hover
            background url(/staticimg/playbar.png) -93px -344px
        .play-style2
          background url(/staticimg/playbar.png) -3px -344px
          &:hover
            background url(/staticimg/playbar.png) -33px -344px
        .tip
          position absolute
          top -35px
          right 105px
          width 81px
          height 39px
          line-height 34px
          color #fff
          text-align center
          background url(/staticimg/playbar.png) 0px -457px
        .play-list
          width 55px
          height 24px
          position relative
          background url(/staticimg/playbar.png) -45px -70px
          &:hover
            background url(/staticimg/playbar.png) -45px -100px
          .song-count
            position absolute
            top: 11%
            left: 53%
            color: #666
            // transform translate(50%)
    .volume-list
      width 32px
      height 113px
      background url(/staticimg/playbar.png) 0 -502px
      // position relative
      position absolute
      right 165px
      top -112px
      z-index 999
      .volbg
        position absolute
        top 6px
        left 14px
        width 4px
        padding 4px 0
        height 93px
        .v-btn
          position absolute
          top 0px
          left: -7px
          z-index 999
          width: 18px;
          height: 20px;
          background url(/staticimg/iconall.png) -40px -250px
          cursor pointer
        .v-list
          position absolute
          left: 50%
          bottom: 4px;
          width 4px
          background url(/staticimg/playbar.png) 
          background-position: -40px bottom;
          transform translateX(-50%)
    .playlist
      position absolute
      left 25%
      bottom 47px
      width 960px
      height 301px
      border-radius 7px 7px 0 0
      background-color #0b0b0b
      z-index 999
      .playlisthd
        height 40px
        position relative
        border-radius 7px 7px 0 0
        background-color  #212121
        h4  
          position absolute
          left 25px
          top 0
          height: 39px
          line-height 39px
          font-size 14px
          color #e2e2e2
        .addall 
          position absolute
          left 320px
          top 12px
          height 16px
          color #e2e2e2
          line-height 16px
          cursor pointer
          &:hover span
            background url(/staticimg/playlist.png) -24px -20px no-repeat
          .icond 
            float left
            width 19px
            height 16px
            margin 1px 2px 0 0
            vertical-align middle
            background url(/staticimg/playlist.png) -24px 0 no-repeat
        .line 
          position: absolute
          top 13px
          left 400px
          height 15px
          border-left 1px solid #000
          border-right 1px solid #2c2c2c
        .clear 
          position absolute
          left 410px
          top 12px
          height 16px
          color #e2e2e2
          line-height: 16px
          cursor pointer
          &:hover span
            background url(/staticimg/playlist.png) -51px -20px no-repeat
          .icond 
            float left
            width 19px
            height 16px
            margin 1px 2px 0 0
            background url(/staticimg/playlist.png) -51px 0px no-repeat
        .close 
          cursor pointer
          position absolute
          top 6px
          right 8px
          width 30px
          height 30px
          overflow hidden
          background url(/staticimg/playlist.png) -195px 9px no-repeat
          &:hover 
            background url(/staticimg/playlist.png) -195px -21px no-repeat
        p 
          position absolute
          left 580px
          top 0
          width 346px
          text-align center
          height 39px
          line-height 39px
          color #fff
          font-size 14px
      .playlistbd
        position absolute
        left 0
        top 41px
        width 960px
        height:260px
        overflow hidden
        background url(/staticimg/playlist_bg.png) -1014px 0 repeat
        .playlistleft
          position absolute
          left -2px
          top 0
          z-index 4
          height 260px
          width 541px
          overflow-y auto
          .nocnt
            color #aaa
            padding-top 85px
            text-align center
            line-height 43px
            i 
              float none
              display inline-block
              position relative
              top -4px
              width: 36px
              height 29px
              margin-right: 3px
              background url(/staticimg/playlist.png) -138px 0px no-repeat  
              vertical-align middle
            a 
              color #e2e2e2
          .f-cb 
            user-select: none;
            .z-se
              float left
              width 100%
              &:hover
                background-color rgba(0,0,0,0.4)
              &:hover .col-3 .icns
                display block
              .col
                float left
                padding-left 10px
                height 28px
                line-height 28px
                cursor pointer
                color #fff
                overflow hidden
              .col-1
                width 10px
                .playicn  
                  margin-top 8px
                  width 10px
                  height 13px
                  background url(/staticimg/playlist.png) -182px 0px no-repeat
                  display none
              .col-2 
                width 236px
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
              .col-3
                width 78px
                position relative
                .icns 
                  display none
                  position absolute
                  right 0
                  top 0
                  width 100px
                  height 23px
                  .ico 
                    float right
                    overflow hidden
                    margin 7px 0 0 10px
                    width 13px
                    height 16px
                  .ico1
                    background url(/staticimg/playlist.png) -51px 0px no-repeat
                    &:hover
                      background url(/staticimg/playlist.png) -51px -20px no-repeat
                  .ico2
                    background url(/staticimg/playlist.png) -57px -50px no-repeat
                    &:hover
                      background url(/staticimg/playlist.png) -80px -50px no-repeat
                  .ico3
                    background url(/staticimg/playlist.png) 0px 0px no-repeat
                    &:hover
                      background url(/staticimg/playlist.png) 0px -20px no-repeat
                  .ico4
                    background url(/staticimg/playlist.png) -24px 0px no-repeat
                    &:hover
                      background url(/staticimg/playlist.png) -24px -20px no-repeat
              .col-4 
                width 70px
                a  
                  color  #fff
              .col-5 
                width 35px
              .col-6 
                width 35px
                padding-left 6px
                .ico-src
                  width 14px
                  height 16px
                  float right
                  overflow hidden
                  margin 7px 0 0 10px
                  margin-left 0
                  background url(/staticimg/playlist.png) -80px 0px no-repeat
                  &:hover
                    background url(/staticimg/playlist.png) -80px -20px no-repeat
        .bline
          top -1px
          position absolute
          left: 540px
          z-index 2
          width 6px
          height 260px
          background: #000
        .ico-ask 
          display inline-block
          width 21px
          height 21px
          top 3px
          position absolute
          right 5px
          background url(/staticimg/playlist.png) 0px -50px no-repeat      
        .lyicbox
          width 420px
          height 250px
          float right
          position relative
          .lyichid
            position: absolute;
            right: 40px;
            top: 0;
            z-index: 4;
            margin: 21px 0 20px 0;
            height: 219px;
            width: 354px;
            overflow: hidden;
            p
              text-align center
              font-size: 12px
              line-height: 32px
              color: #989898
            .now
              font-size: 14px
              color: #fff
    
</style>
