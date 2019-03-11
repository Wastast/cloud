<template>
  <div class="au-pic">
    <div class=" audio clearfix">
      <div class="lnk">
        <img :src="'/api'+share.audioimg">
        <a href="javascript:;" class="icn" @click="getsid(share.audioname)"></a>
      </div>
      <div class="scnt">
        <a href="javascript:;" class="audio-name">{{share.audioname}}</a>
        <a href="javascript:;" class="singer-name">{{share.singer}}</a>
      </div>
    </div>
    <div class="pic">
      <ul class="pic-ul clearfix" v-show="isPicShow==true">
        <li v-for="(pic,i) of banner" :key="i" @click="bigPic(i,$event)" ref="j_pic_li">
          <img :src="/api/+pic">
        </li>
      </ul>
      <div class="showpic" ref="j_picContainer" v-show="isPicShow==false">
        <div class="up showpic-btn">
          <i class="icn up-icn"></i>
          <a href="javascript:;" @click="noBigPic()">收起</a>
        </div>
        <!-- 图片放大 -->
        <div class="banner">
          <div class="banner-wrap" ref="j_picWrap" :class="curIcnClass" @mouseover="showPic">
            <img :src="picSrc" ref="j_banImg">
          </div>
        </div>
        <div class="pages"> 
          <span v-for="(num,j) of 9" :key="j" :class=" j == picNum ? 'z-curr':'' " @click="pagePic(j)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
data () {
  return {
    isPicShow: true,
    banner: [],
    curIcnClass: "",
    picNum: "",
    picSrc: "",
    pagesClass: "z-curr",
    timer: null,
  }
},
props:["share"],
computed: {
  ...mapState(['songList','play','playlist'])
},
created(){
  if(this.share.img != null){
    this.banner = this.share.img.split(",")
  }
},
methods:{
  // 歌曲播放
  getsid (item) {
    this.songList.forEach((element,index) => {
      if(element.mname == item){
        item = element
      }
    });
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
  //点击收起
  noBigPic(){
    this.isPicShow = !this.isPicShow;
  },
  //点击小图出现大图
  bigPic(index,e){
    this.isPicShow = !this.isPicShow;
    this.picSrc = e.target.src;
    this.picNum = index;
  },
  //点击小点出现对应大图
  pagePic(index){
    this.picNum = index
    this.picSrc = "/api/" + this.banner[index];
  },
  //图片切换
  showPic(e){
    var picWrap = this.$refs.j_picWrap;
    var wrapW = picWrap.clientWidth;    //图片外层div的宽
    var disX = e.clientX-e.layerX;
    picWrap.onmousemove = (e)=>{//鼠标移入并移动
      var curWidth = e.clientX-disX   //鼠标距离左侧j_picWrap的距离
      if( curWidth>=0 && curWidth <=wrapW/3 ){ //鼠标在左边区块
        this.curIcnClass = "f-curleft";
        if(this.picNum ==0) this.curIcnClass = "f-cursmall";
        picWrap.onclick = (e)=>{
          if(this.picNum==0){
            this.picNum = 0
          }else{
            this.picNum--
          }
          //第一张图鼠标变缩小镜，隐藏
          if( this.picNum == 0 && this.curIcnClass == "f-cursmall"){
            this.isPicShow = !this.isPicShow
          }
          //淡入淡出
          this.$refs.j_banImg.style.opacity = 0;
          if(this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(()=> {
            this.$refs.j_banImg.style.opacity = 1;
            this.picSrc = "/api/" + this.banner[this.picNum];
          },100)
        }
      }else if( curWidth>wrapW/3 && curWidth <=wrapW*2/3 ){  //鼠标在中间区块
        this.curIcnClass = "f-cursmall";
        picWrap.onclick = ()=>{
          //中间隐藏
          this.isPicShow = !this.isPicShow;
        }
      }else if( curWidth>wrapW*2/3 && curWidth <=wrapW ){ //鼠标在右边区块
        this.curIcnClass = "f-curright";
        if( this.picNum == this.banner.length-1 ) this.curIcnClass = "f-cursmall";
        picWrap.onclick = ()=>{
          if(this.picNum == this.banner.length-1){
            this.picNum == this.banner.length-1
          }else{
            this.picNum ++
          }
          //右边出现缩小镜，隐藏
          if( this.picNum == this.banner.length-1 && this.curIcnClass == "f-cursmall"){
            this.isPicShow = !this.isPicShow
          }
          //淡入淡出
          this.$refs.j_banImg.style.opacity = 0;
          if(this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(()=> {
            this.$refs.j_banImg.style.opacity = 1;
            this.picSrc = "/api/" + this.banner[this.picNum];
          },100)
        }
      }
    }
  },
  ...mapMutations(['getPlay','addPlayList'])
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
.icn
  background url(/staticimg/frd_dyn_sprite.png) 0 9999px no-repeat
.audio
  position relative
  padding 10px
  margin 4px 0 5px 
  background #f5f5f5
  .lnk
    position relative
    width 40px
    height 40px
    float left 
    a
      position absolute
      top 0
      left 0
      z-index 100
      width 40px
      height 40px
      background-position  -100px -70px
      opacity 0.8
      &:hover
        opacity 1
    img 
      width 40px
      height 40px
  .scnt 
    position absolute
    top 10px
    left 60px
    right 30px
    line-height 22px
    a:hover
      text-decoration underline
    .audio-name,
    .singer-name
      display block
    .audio-name
      font-size 14px
      color #333
    .singer-name
      color #666
.pic
  .pic-ul 
    width 345px
    li
      float left
      margin 4px 0 0 4px
      padding 0
      width 110px
      height 110px
      border 0
      background #e5e5e5
      img
        display block
        width 100%
        height 100%
        object-fit cover
        cursor url(/staticimg/big.cur),auto  
  .showpic
    background #f5f5f5
    .showpic-btn
      width 525px
      padding 12px 0 12px 20px
      line-height normal
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
    .banner
      position relative
      zoom 1
      width 525px
      padding-top 1px
      min-height 306px
      margin 0 auto
      user-select none
      background-repeat no-repeat
      background-position center center
      .banner-wrap
        position relative
        margin-top 0px
        img
          display block
          min-width 100px
          min-height 100px
          max-width 100%
          margin 0 auto
          transition all .3s linear
      .f-cursmall
        cursor url(/staticimg/small.cur), auto
      .f-curleft
        cursor url(/staticimg/frd_show_left.cur), auto
      .f-curright
        cursor url(/staticimg/frd_show_right.cur), auto
    .pages
      height 16px
      text-align center
      span
        display inline-block
        width 16px
        height 16px
        cursor pointer
        opacity 0.8
        vertical-align top
        transition all .5s ease
        background url(/staticimg/frd_dyn_sprite.png) -80px -130px no-repeat
      .z-curr
        background-position -80px -150px
        opacity 1
</style>
