<template>
  <div class="fixed">
    <div class="msg" ref="j_popup">
      <div class="msgbox" ref="msgbox" @mousedown="move">
        <div class="title">
          <h3>分享</h3>
          <i @click="none"></i>
        </div>
        <!-- 主体发表 -->
        <div class="box-body" v-show="show">
          <div class="u-txtwrap">
            <textarea placeholder="一起聊一聊吧" class="u-txt" v-model="msg"></textarea>
            <div class="info">
              <i clas="high"></i>
              <div class="thide" @click="tab" v-show="!this.songItem">
                <i class="logo"></i>
                <span>给动态配上音乐</span>
                <i class="icn"></i>
              </div>
              <div class="thide" @click="tab" v-show="this.songItem">
                <!-- <i class="logo"></i>
                <span>给动态配上音乐</span> -->
                <p class="songdesc">单曲:&nbsp;{{this.songItem.mname}}-{{this.songItem.msinger}}</p>
                <i class="icn icnadd"></i>
              </div>
            </div>
          </div>
          <div class="oper"> 
            <span class="f-span">140</span>
          </div>
          <div class="btnwrap">
            <a href="Javascript:;" class="u-btn1 u-btn" @click="addComment">分享</a>
            <a href="Javascript:;" class="u-btn2 u-btn" @click="none">取消</a>
          </div>
        </div> 
        <!-- 歌单搜索 -->
        <div class="search-music" v-show="!show">
          <div class="search">
            <a href="javascript:;"></a>
            <input type="text" v-model="keyword">
          </div>
          <div class="content">
            <vuescroll>
              <ul>
                <li class="item" v-for="(item,i) of list" :key="item.mid" :style="{background: i%2==1?'#f2f2f2':'#fff'}" @click="tabvalue(item)">
                  <i class="play"></i>
                  <p class="songname">{{item.mname}}</p>
                  <p class="singer">{{item.msinger}}</p>
                </li>
              </ul>
            </vuescroll>
          </div>
          <div class="btnwrap">
            <a href="Javascript:;" class="u-btn1 u-btn" @click="tab">返回</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import vuescroll from 'vuescroll'
// import {mapState} from 'vuex'
export default {
  inject:['reload'],
  data(){
    return {
      show:true,  
      msg:"",
      keyword: '',
      timer: null,
      list: [],
      show: true,
      songItem: ''
    }
  },
  computed: {
    ...mapState(['songList','userInfo'])
  },
  watch:{
    keyword () {
      if(this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(()=>{
        var arr = []
        this.songList.forEach(element => {
          if(element.mname.search(this.keyword+'')>=0) {
            arr.push(element)
          }
        });
        this.list = arr
      },1000)
    }
  },
  props:["shareInfo"],
  methods: {
    tabvalue (item) {
      this.show = !this.show
      this.songItem = item
    },
    tab () {
      this.show = !this.show
    },
    move (e) {
      let op = this.$refs.msgbox
      //算出鼠标相对元素的位置
      let disX = e.clientX - op.offsetLeft;
      let disY = e.clientY - op.offsetTop;
      document.onmousemove = (e)=>{    //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;
        //移动当前元素
        op.style.left = left + 'px';
        op.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    none () {
      this.$refs.j_popup.style.cssText = 'display:none;'
    },
   //添加评论
    addComment(){
      var m = this.msg;
      var item = this.songItem
      var url =`/api/comment/addshare?uid=${this.userInfo.uid}&msg=${this.msg}&audio=${item.mpath}&audioimg=${item.mimgurl}&audioname=${item.mname}`
      this.axios.get(url).then((res)=>{
      })
      this.$refs.j_popup.style.cssText = 'display:none;'
      this.reload()
    }
  },
  components: {
    vuescroll
  },
  mounted () {
    // this.songList
    // console.log(this.songList)
  }
}
</script>

<style lang="stylus" scoped>
.fixed
  .msg
    position fixed 
    display none
    z-index 99999
    top 0
    bottom 0
    left 0
    right 0
    width 100%
    height 100%
    background-image url(/staticimg/bg.gif)
    .msgbox
      position absolute
      top 147px
      left 676px
      z-index 999999
      width 480px
      height 340px
      border-radius 4px
      box-shadow 0 5px 16px rgba(0,0,0,0.8)
      background #fff
    .title
      height 39px
      padding 0 45px 0 18px
      font-weight: bold;
      color: #fff;
      line-height 38px
      background: #2d2d2d;
      border-radius: 3px 3px 0 0;
      position relative
      cursor move
      h3
        font-size 14px
        float left
      i 
        position absolute
        top 15px
        right 17px
        cursor pointer
        float right
        display inline-block
        width 10px
        height 10px
        background url(/staticimg/layer.png) 0 -95px
    .box-body
      max-height 375px
      overflow-y auto
      overflow-x hidden
      padding 20px 40px 30px
      .u-txtwrap
        border 1px solid #d9d9d9;
        border-radius 2px
        position relative
        width 100%
        padding-right 14px
        outline none
        .u-txt 
          height 106px
          padding 5px 6px 6px
          border none
          width 100%
          outline none 
        .info 
          position relative
          height 45px
          line-height 45px
          margin 0 -14px 0 0
          padding 0 10px
          cursor pointer
          .high 
            display none
            position absolute
            top -22px
            height 84px
            background url(/staticimg/highlight.png)
            left -17px
            width 480px
          .thide
            border-top 1px solid #e5e5e5 
            overflowx hidden
            text-overflow ellipsis
            white-space nowrap
            font-size 14px
            width 100%
            float left
            line-height 45px
            .songdesc
              width 380px
              font-size: 14px
              line-height 45px
            .logo 
              margin 8px 8px 8px 0
              width 30px
              height 30px 
              display inline-block
              overflow hidden
              vertical-align middle
              background url(/staticimg/icon2.png) 0 -340px
            .icn  
              position absolute
              top 14px
              right 10px
              width 12px
              height 17px
              display inline-block
              overflow hidden
              vertical-align middle
              background   url(/staticimg/icon2.png) -40px -338px
            .icnadd
              background-position: -40px -354px;
      .oper 
        height 20px
        margin-top 10px
        .f-span 
          color #999
          float right  
      .btnwrap 
        float left
        margin-top 10px
        margin-left 100px
        .u-btn
          margin-right 10px
          border-radius 5px
          display inline-block
          width 70px
          height 31px
          line-height 31px
          overflow hidden
          vertical-align top
          text-align center
          padding 0 5px 0 0
          border 1px solid #c3c3c3
        .u-btn1
          color #fff
          background-color #0c73c2
        .u-btn2
          color #000
          background-color #ffffff
    .search-music
      margin 30px 39px 0
      width 400px
      height 222px
      border: 1px solid #d9d9d9;
      border-radius: 2px; 
      .search
        height 39px
        width 400px
        border-bottom 1px solid #d9d9d9;
        a
          display block
          float left
          padding: 11px 10px;
          width: 17px;
          height: 16px;
          background url('/staticimg/icon2.png')
          background-position: -140px -340px;
        input
          display inline-block
          float right
          height 39px
          width 360px
          outline none
          border: none 
      .content
        height 180px
        width 400px
        .item
          width 100%
          height 40px
          i
            display inline-block
            float: left;
            margin 13px 10px
            width: 14px;
            height: 14px;
            background url('/staticimg/icon2.png') -80px -340px;
          .songname
            padding: 0 0 0 20px
            width 190px
            float left
            line-height: 40px
          .singer
            width 130px
            float left
            line-height 40px
      .btnwrap 
        float left
        margin-top 10px
        margin-left 147px
        .u-btn
          margin-right 10px
          border-radius 5px
          display inline-block
          width 70px
          height 31px
          line-height 31px
          overflow hidden
          vertical-align top
          text-align center
          padding 0 5px 0 0
          border 1px solid #c3c3c3
        .u-btn1
          color #fff
          background-color #0c73c2
            
</style>