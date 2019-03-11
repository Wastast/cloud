<template>
<div class="video">
  <div class="video-fir" v-show="isVidShow==true"> 
    <div class="video-suspend" @click="show()">
      <div class="video-fir-top">
        <i class="icn mv-icn"></i>
        <span class="f-pre">{{share.vdename}}</span>
        <span class="f-name"> - 
          <span title="Lauv / Troye Sivan">
            <a href="javascript:;">{{share.vdesinger}}</a>
          </span>
        </span>
      </div>
      <div class="video-fir-bot clearfix">
        <span class="duration">
          <i class="icn duration-icn"></i>
          {{allTime}}
        </span>
      </div>
      <i class="icn ply-icn"></i>
      <img :src="'/api/'+share.videoimg">
    </div>
  </div>
  <div class="video-sec" v-show="isVidShow==false">
    <div class="fold">
      <span class="up">
        <i class="icn up-icn"></i>
        <a href="javascript:;" @click="noshow()">收起</a>
      </span>
      <span class="sep"></span>
      <span class="s-pre">{{share.vdename}}</span>
      <span class="s-name">-
        <a href="javascript:;">{{share.vdesinger}}</a>
      </span>
    </div>
    <div class="mv" ref="j_mv" @mouseover="progress">
      <div class="player"  ref="j_full">
        <video @play="vplay()"  @click="play()" @timeupdate="updateTime()"  @canplaythrough="totalTime()" @ended="vEnd()" ref="video" class="media"  :src="'/api/'+ share.video" preload="auto" ></video>
        <div>
          <a @click="play()" href="javascript:;" class="icn ply-icn-b" ref="j_ply" :class="replayIcnClass"></a>
        </div>
        <!-- 视频底部控件 -->
        <div class="controls" >
          <div class="progress-1" ref="j_pro1">
            <div class="out-1" ref="j_out1"></div>
            <div class="out-2"></div>
          </div>
          <div class="wrap" ref="j_proWrap2" style="display:none">
            <!-- 视频时间、音量 -->
            <div class="wrap-right clearfix">
              <div class="all-time">{{allTime}}</div>
              <div class="volume" >
                <a href="javascript:;" class="mute" :class="noVolIcnClass"></a>
                <div class="sliderbg">
                  <div class="slider" ref="j_volSlider"> 
                    <div class="slider-out" :style="{height:volHeight}"></div>
                    <div class="dot-s"  @mousedown="moveVol" ref="j_vbtn" ></div>
                  </div>
                  <i class="arrow"></i>
                </div>
              </div>
              <div class="brs">标清</div>
              <a class="full" href="javascript:;" @click="FullScreen"></a>
            </div>
            <div class="wrap-left">
              <div class="playing" ref="j_playIcn">
                <a href="javascript:;" class="ply-icn-s" :class="pauseIconClass" @click="play()"></a>
                <span class="ply-time">{{presentTime}}</span>
              </div>
              <div class="wrap-progress" ref="j_allPrg">
                <div class="progress-2" ref="j_pro2" @click="point" @mousemove="proHover">
                  <div class="played" :style="progressBarStyle">
                    <div class="in">
                      <span class="dot" @mousedown="move" ref="btn"></span>
                    </div>
                  </div>
                  <div class="hovertime" :style="timeHoverStyle">
                    <span class="ht" ref="j_ht">{{timeHover}}</span> <!--悬浮框-->
                    <span class="arrow arr" ref="j_arr"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
data () {
  return {
    isVidShow: true,  
    replayIcnClass: "",
    pauseIconClass: "",
    noVolIcnClass: "",
    duration: "",
    currentTime: "",
    curTimeHover: "",
    progressBar: "",
    progressBarStyle: {
      width: ""
    },
    timeHoverStyle: {
      left: "",
      display: ""
    },
    volHeight: "",
    timer: null,
    activeIndex:-1
  }
},
props:["share","i"],
methods: {
  toArticleDetail(index){
    this.activeIndex = index;
  },
  //点击视频
  show(){
    this.isVidShow = false;
    this.$refs.video.play(); 
  },
  //收起
  noshow(){
    this.isVidShow = true;
    this.$refs.video.load(); 
  },
  vplay(){
    var video = this.$refs.video;
    this.$refs.j_ply.style.display= "none";
    this.pauseIconClass = "pause-icn-s";
  },
  // 控制播放/暂停
  play(){
    var video = this.$refs.video;
    if(video.paused){
      video.play();
    }else{
      video.pause();
      this.pauseIconClass = "";
    }
  },
  //视频结束
  vEnd(){
    this.$refs.j_ply.style.display= "block"
    this.pauseIconClass = ""
    this.replayIcnClass = "reply-icn"
    this.progressBarStyle.width = 0
  },
  //视频总时长
  totalTime () {
    this.duration = this.$refs.video.duration;
  },
  //当前时间点
  updateTime () {
    this.currentTime = this.$refs.video.currentTime
    var w = parseInt((this.currentTime / this.duration)*100)
    this.progressBarStyle.width = w + "%"
    this.$refs.j_out1.style.width = w + "%"
  },
  //播放移动进度条
  move (e) {
    var btn = this.$refs.btn;     //圆点按钮
    var prgW = this.$refs.j_pro2.clientWidth;     //透明进度条宽度，即总宽度
    var disX = e.clientX - btn.offsetLeft;       //进度条最左侧距离浏览器的差值
    var dotW = btn.clientWidth/2;     //圆点的宽度的一半
    this.duration = this.$refs.video.duration;    //视频总时长
    document.onmousemove = (e) => {    //鼠标按下并移动的事件
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置=left
      var left = e.clientX - disX + dotW;
      //移动当前元素
      if(left < -dotW){
        left = -dotW;
      }else if(left > prgW-dotW){
        left = prgW-dotW;
      }

      if(left < 2){
        this.timeHoverStyle.left = -8;
      }else if(left > 275){
        this.timeHoverStyle.left = 275;
      }else{
        this.timeHoverStyle.left = left-10 + "px"
      }
      this.timeHoverStyle.display = "block";
      this.progressBarStyle.width = parseInt((((left+dotW) /prgW)*100)) + '%'; //红色进度条的width
      this.$refs.video.currentTime = ((left+dotW) /prgW) * this.duration; //当前视频播放时间 
      this.curTimeHover = this.$refs.video.currentTime //hover小方框的时间
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.timeHoverStyle.display = "none";
    };
  },
  //点击播放进度条
  point (e) {
    var btn = this.$refs.btn; 
    if(e.target===btn){
      //点击滑块自身不做任何事情  
    }else{
      var prgW = this.$refs.j_pro2.clientWidth;    //进度条总长
      this.duration = this.$refs.video.duration;  //视频总时长

      this.progressBarStyle.width = parseInt((e.layerX/prgW*100)) + '%'  //红色进度条width  
      this.$refs.video.currentTime = e.layerX/prgW *  this.duration; //视频当前播放时间
      this.curTimeHover = this.$refs.video.currentTime;  //悬浮框的时间
    }
  },
  //悬停视频时间
  proHover(e){
    this.timeHoverStyle.display = "block";
    var btn = this.$refs.btn; 
    if(e.target === btn){
      this.timeHoverStyle.display = "none";
    }else{
      var prgW = this.$refs.j_pro2.clientWidth;    //进度条总长
      this.duration = this.$refs.video.duration;  //视频总时长

      if( e.layerX > prgW-33){
        this.timeHoverStyle.left = prgW-33 + "px";
      }else if( e.layerX > 20 && e.layerX < prgW-33){
        this.timeHoverStyle.left = e.layerX-19 + "px";
      }
      this.curTimeHover =  e.layerX / prgW * this.duration //悬浮框的时间
    }
    document.onmouseout = (e) => {
      this.timeHoverStyle.display = "none";
    };
  },

  /**=========================== 声音 ========================== **/
  //移动音量
  moveVol (e) {
    var btn = this.$refs.j_vbtn;  //圆点
    var disY = e.clientY - btn.offsetTop;   

    btn.onmousemove = (e) => {    //鼠标按下并移动的事件
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      var top = e.clientY - disY;
      
      if(top>-9 && top<63){
        btn.style.top = top + "px";
        this.volHeight = 70-(top+8)  + "px"
        this.$refs.video.volume = (70- ( top + 8 ))/70
        if(this.volHeight == 0 + "px"){
          this.noVolIcnClass = "novol"
        }else{
          this.noVolIcnClass = ""
        }
      }
    };
    btn.onmouseup = (e) => {
      btn.onmousemove = null;
      btn.onmouseup = null;
      btn.onmousedown = null;
    };
  },
  /**=========================== 全屏 ========================== **/
  //点击全屏
  FullScreen(el){
    var el = this.$refs.j_full;
    var isFullscreen=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;
    if(!isFullscreen){//进入全屏,多重短路表达式
    (el.requestFullscreen&&el.requestFullscreen())||
    (el.mozRequestFullScreen&&el.mozRequestFullScreen())||
    (el.webkitRequestFullscreen&&el.webkitRequestFullscreen())||(el.msRequestFullscreen&&el.msRequestFullscreen());
    
    }else{	//退出全屏,三目运算符
    document.exitFullscreen?document.exitFullscreen():
    document.mozCancelFullScreen?document.mozCancelFullScreen():
    document.webkitExitFullscreen?document.webkitExitFullscreen():'';
    }
  },
  //控件显示隐藏
  progress(){
    var mv = this.$refs.j_mv
    this.$refs.j_proWrap2.style.display = "block"
    this.$refs.j_pro1.style.display = "none"
    mv.onmouseout = ()=>{
      this.timer = setTimeout(()=>{
        this.$refs.j_proWrap2.style.display = "none"
        this.$refs.j_pro1.style.display = "block"
      },3000)
    },
    mv.onmouseover = ()=>{
      clearTimeout(this.timer)
    }
  }
  
},
//计算时间
computed: {
  allTime () {
    var m = parseInt(this.duration/60);
    var s = parseInt(this.duration%60);
    m = m<10 ? "0" + m : m;
    s = s<10 ? "0" + s : s;
    return m +':'+ s;
  },
  presentTime() {
    var m = parseInt(this.currentTime/60);
    var s = parseInt(this.currentTime%60);
    m = m<10 ? "0" + m : m;
    s = s<10 ? "0" + s : s;
    return m +':'+ s;
  },
  timeHover(){
    var m = parseInt(this.curTimeHover/60);
    var s = parseInt(this.curTimeHover%60);
    m = m<10 ? "0" + m : m;
    s = s<10 ? "0" + s : s;
    return m +':'+ s;
  },
},

}
</script>

<style lang="stylus" scoped>
.clearfix:before,
.clearfix:after
  display table 
  content ""
.clearfix:after  
  clear both
.icn
  background url(/staticimg/frd_dyn_sprite.png) 0 9999px no-repeat
.video
  position relative
  margin 4px 0 5px
  .video-suspend
    position relative
    width 338px
    height 189px
    cursor pointer
    .video-fir-top
      position absolute
      width 100%
      height 100px
      line-height 15px
      padding 10px
      font-size 12px
      color #fff
      box-sizing border-box
      background-color rgba(0,0,0,0.1)
      i.mv-icn
        display inline-block 
        width 21px
        height 12px
        background-position 0 -210px
      span.f-pre
        word-break break-all
        word-wrap break-word
      span.f-name
        a
          color rgba(255,255,255,0.5) 
    .video-fir-bot
      position absolute
      bottom 0
      width 100%
      padding 33px 10px 10px
      line-height 10px
      box-sizing border-box
      background url(/staticimg/frd_cover_mask.png) 0 -285px repeat-x
      .duration 
        display inline-block
        float right
        font-size 14px
        color #fff
        cursor pointer
        .duration-icn
          display inline-block
          width 9px
          height 10px
          margin-right 4px
          background-position -50px -530px
    .ply-icn
      position absolute
      top 50%
      left 50%
      z-index 10
      display inline-block
      margin -20px 0 0 -20px  
      width 40px
      height 40px
      background-position 0 -510px
  .fold
    margin 7px 0 10px 0
    .up 
      .up-icn 
        display block
        float left
        width 13px 
        height 13px
        margin 1px 3px 0 0 
        background-position -108px -19px
      a
        color #666
        &:hover
          text-decoration underline
    .sep 
      display inline-block
      width 1px
      height 13px
      margin 0 8px
      background #ddd
    .s-pre
      color #666
    .s-name,
    .s-name a
      color #999
  .mv
    position relative
    width 565px
    height 318px
    .player
      position relative
      width 100%
      height 100%
      box-sizing border-box
      .media
        width 100%
        height 100%
        background #000
      .ply-icn-b
        position absolute
        top 50%
        left 50%
        width 74px
        height 74px
        margin-left -37px
        margin-top -37px
        background url(/staticimg/ply-b.png) no-repeat center center
      .reply-icn
        background url(/staticimg/replay.png) no-repeat center center
        &:hover
          background-image url(/staticimg/replay-h.png)
      .controls
        position absolute
        bottom 0
        left 0
        width 100%
        height 42px
        transition transform 0.2s ease-in
        .progress-1
          position absolute
          bottom 0px
          left 0
          display none
          width 100%
          height 4px
          border-radius 2px
          background-color rgba(255, 255, 255, 0.2)
          cursor pointer
          user-select none
          .out-1
            position absolute
            z-index 2
            top 0
            left 0
            height 100%
            border-radius 2px
            background-color #b2072a
          .out-2
            background-color rgba(255, 255, 255, 0.3)
            z-index 1
            position absolute
            top 0
            left 0
            height 100%
            border-radius 2px
        .wrap
          position absolute
          bottom 0
          left 0
          width 100%
          height 100%
          .wrap-right
            float right
            .all-time
              position static
              margin 0
              float left
              height 34px
              line-height 34px
              color rgba(255, 255, 255, 0.5)
            .volume
              position relative
              margin-left 10px
              margin-right 1px
              padding 11px 10px
              float left
              &:hover .sliderbg
                display block
              .mute
                display block
                width 16px 
                height 12px
                background url(/staticimg/volume.png) no-repeat center center
                &:hover
                  background-position url(/staticimg/volume-hover.png)
              .novol
                background url(/staticimg/novol.png) no-repeat center center
                &:hover
                  background-position url(/staticimg/novol.png)
              .sliderbg
                position absolute
                top -2px
                left 6px
                display none
                width 22px
                height 86px
                border 1px solid rgba(255, 255, 255, 0.2);
                background rgba(0, 0, 0, 0.7)
                transform translateY(-100%)
                .slider
                  position relative
                  width 4px
                  height 70px
                  margin 6px 9px
                  border-radius 2px
                  background-color rgba(255, 255, 255, 0.2)
                  .slider-out
                    position absolute
                    bottom 0
                    left 0
                    width 100%
                    height 70px
                    background #b2072a
                    border-radius 2px
                  .dot-s
                    cursor pointer
                    position absolute
                    top -8px
                    left -8px
                    width 20px
                    height 20px
                    background url(/staticimg/dot-s.png) no-repeat center
              .arrow
                position absolute
                bottom -7px
                width 100%
                height 7px
                display block
                background url(/staticimg/arrow.png) no-repeat center top
                cursor default
            .brs
              position relative
              margin-top 9px
              float left
              z-index 3
              width 50px
              height 17px
              line-height 17px
              text-align center
              color rgba(255, 255, 255, 0.5)
              cursor default
            .full
              display block
              width 34px
              height 34px
              float left
              background url(/staticimg/full.png) no-repeat center
              &:hover
                background-image url(/staticimg/full-h.png)
          .wrap-left
            position relative
            top -20px
            overflow hidden
            .playing
              position relative
              width 77px
              float left
              top 20px
              .ply-icn-s
                float left 
                width 34px
                height 32px
                margin 0 6px
                background url(/staticimg/play.png) no-repeat center
                &:hover
                  background-image url(/staticimg/play-h.png)
              .pause-icn-s
                background-image url(/staticimg/pause.png)
                &:hover
                  background-image url(/staticimg/pause-h.png)
              .ply-time
                height 34px
                line-height 34px
                color rgba(255,255,255,0.5)
            .wrap-progress
              position relative
              height 34px
              padding 15px 10px 0
              overflow hidden
              .progress-2
                position absolute
                top 35px
                left 10px
                right 10px
                width auto 
                height 4px
                border-radius 2px
                background-color rgba(255,255,255,0.2)
                cursor pointer
                user-select none
                .played 
                  position absolute
                  top 0 
                  left 0
                  z-index 2
                  height 100%
                  border-radius 2px
                  background-color #b2072a
                  .dot
                    position absolute
                    top -10px
                    right -12px
                    display block
                    width 24px
                    height 24px
                    background url(/staticimg/dot.png) no-repeat center
                    &:hover
                      background-image url(/staticimg/dot-h.png)
                .hovertime
                  position absolute
                  top -27px
                  display none
                  min-width 44px
                  .ht
                    padding 5px
                    color #fff
                    border 1px solid rgba(255,255,255,0.2)
                    background-color rgba(0,0,0,0.7)
                  .arrow
                    position absolute
                    bottom -7px
                    width 100%
                    height 7px
                    display block
                    background url(/staticimg/arrow.png) no-repeat center top
                    cursor default
                    &:before,
                    &:after
                      content ''
                      position absolute
                      top 0
                      border-top 1px solid rgba(255, 255, 255, 0.2)
                      background rgba(0, 0, 0, 0.7)
                    &:before
                      left -1px
                    &:after
                      right -1px
                  .arr
                    bottom -12px
</style>
