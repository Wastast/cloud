<template>
  <div class="index">
    <div class="index-section">
      <div class="section-leftaside">
        <div class="wrap">
          <div class="card">
            <div class="card-head">
              <div class="cardicon"></div>
              <a href="javascript:;" class="tilte" @click="handelClassTab('推荐')">热门推荐</a>
              <div class="tabs">
                  <a href="javascript:;" class="tab-a" @click="handelClassTab('古风')">古风</a>
                  <span class="tab-span">|</span>
                  <a href="javascript:;" class="tab-a" @click="handelClassTab('流行')">流行</a>
                  <span class="tab-span">|</span>
                  <a href="javascript:;" class="tab-a" @click="handelClassTab('民谣')">民谣</a>
              </div>
              <span class="more">
                <router-link to="/gindex" class="more-a">更多</router-link>
                <!-- <img src="" alt=""> -->
              </span>
            </div>
            <ul class="section">
              <li v-for="item of gatherList" :key="item.gid">
                <div class="section-cover">
                  <img :src="item.gimgurl?'/api/'+item.gimgurl:'/staticimg/default_avatar.jpg'" class="cover-img">
                  <router-link :to="'/gather/'+item.gid" class="cover-a" :title="item.gdesc"></router-link>
                  <div class="cover-bottom">
                    <a href="javascript:;" class="bottom-a"></a>
                    <span class="bottom-span1"></span>
                    <span class="bottom-span2">767</span>
                  </div>
                </div>
                <p class="section-bottom">
                  <router-link :to="'/gather/'+item.gid" :title="item.gname">{{item.gname}}</router-link>
                </p>
              </li>
            </ul>
          </div>
          <div class="card">
              <div class="card-head">
                <div class="cardicon"></div>
                <a href="javascript:;" class="tilte">新歌上架</a>
                <span class="more">
                  <router-link to="/search/all" class="more-a">更多</router-link>
                </span>
              </div>
              <div class="disk">
                <a href="javascript:;" class="disk-leftbutton" @click="left(1)" ref="cdleftbutton">﹤</a>
                <div class="disk-section" >
                  <div class="roll" :style="{left: marginleft+'px'}">
                    <ul class="cd-list" v-for="(item,i) of lists" :key="i">
                      <li class="cd-item" v-for="items of item" :key="items.mid" >
                        <router-link tag="div" :to="'/my_playlist/'+items.mid" class="item-content">
                          <img :src="items.mimgurl?'/api'+items.mimgurl:'/staticimg/default_avatar.jpg'" >
                          <a href="javascript:;" class="content-thank"></a>
                          <a href="javascript:;" class="icon-play"></a>
                        </router-link>
                        <p><router-link :to="'/my_playlist/'+items.mid" class="songname">{{items.mname}}</router-link></p>
                        <p><router-link to="/">{{items.msinger}}</router-link></p>
                      </li>
                    </ul>
                  </div>
                </div>
                <a href="javascript:;" class="disk-rightbutton" @click="left(0)" ref="cdrightbutton">﹥</a>
              </div>
          </div>
          <div  class="card">
            <div class="card-head">
              <div class="cardicon"></div>
              <a href="javascript:;" class="tilte">榜单</a>
              <span class="more">
                <a href="javascript:;" class="more-a">更多</a>
              </span>
            </div>

            <div class="bilst">
              <dl class="blk">
                <dt class="top">
                  <div class="img">
                    <a href="javascript:;">
                      <img src="/staticimg/18696095720518497.png" alt="">
                    </a>
                  </div>
                  <div class="title">
                    <a href="javascript:;" title="云音乐古风榜">
                      云音乐古风榜
                    </a>
                  </div>
                </dt>
                  <ul>
                    <li v-for="(item,i) of gulist" :key="item.gid" >
                      <span>{{i+1}}</span>
                      <router-link :to="'/gather/'+item.gid" :title="item.gname">{{item.gname}}</router-link>
                    </li>
                  </ul>
                  <div class="more">
                    <a href="javascript:;" >查看全部</a>
                  </div>
              </dl>
              <dl class="blk">
                <dt class="top">
                  <div class="img">
                    <a href="javascript:;">
                      <img src="/staticimg/download.png" alt="">
                    </a>
                  </div>
                  <div class="title">
                    <a href="javascript:;" title="云音乐新歌">
                      云音乐新歌榜
                    </a>
                  </div>
                </dt>
                  <ul>
                    <li v-for="(item,i) of liulist" :key="item.id">
                      <span>{{i+1}}</span>
                      <router-link :to="'/gather/'+item.gid" :title="item.gname">{{item.gname}}</router-link>
                    </li>
                  </ul>
                  <div class="more">
                    <a href="javascript:;" >查看全部</a>
                  </div>
              </dl>
              <dl class="blk">
                <dt class="top">
                  <div class="img">
                    <a href="javascript:;">
                      <img src="/staticimg/18740076185638788.png" alt="">
                    </a>
                  </div>
                  <div class="title">
                    <a href="javascript:;" title="云音乐原创榜">
                      云音乐原创榜
                    </a>
                  </div>
                </dt>
                  <ul>
                    <li v-for="(item,i) of minlist" :key="item.id">
                      <span>{{i+1}}</span>
                      <router-link :to="'/gather/'+item.gid" :title="item.gname">{{item.gname}}</router-link>
                    </li>
                    
                  </ul>
                  <div class="more">
                    <a href="javascript:;" >查看全部</a>
                  </div>
              </dl>
            </div>
          </div>
        </div>
      </div> 
      <div class="section-rightside">
        <div class="singer">
          <h3>
              推荐歌单
              <a href="javascript:;" @click="rec">换一批</a>
          </h3>
          <ul class="enter">
              <li v-for="item of Recommend" :key="item.gid">
                <router-link :to="'/gather/'+item.gid" class="tdn" :title="item.gname">
                  <div class="head">
                    <img :src="'/api'+item.gimgurl" alt="">
                  </div>
                  <div class="ifo">
                    <h4>
                       <span>{{item.gname}}</span>
                    </h4>
                    <p>by&emsp;{{item.uname}}</p>
                  </div>
                </router-link>
              </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props:  ['list','song'],
  data(){
    return{
      gatherList: [],
      gulist: [],
      liulist: [],
      minlist: [],
      i:true,
      timer: '',
      marginleft: 0,
      lists: [],
      Recommend: []
    }
  },
  watch: {
    list () {
      this.handelClassTab('推荐')
      this.glist()
    },
    song: {
      handler () {
        var arr = []
        var i =0
        arr[i] = []
        this.song.forEach((e, index) => {
          if((index)%5 == 0 && index != 0){
            arr[++i]= []
          }
          arr[i].push(e)
        })
        this.lists = arr
      },
      immediate: true
    }
  },
  computed: {
  },
  methods: {
    rec () {
      var length = this.$store.state.gatherList.length
      var arr = []
      var noRepeat = []
      var i = 0;
      while (i<5) {
        var round = Math.floor(Math.random()*length)
        if(noRepeat.indexOf(round)==-1) {
          arr.push(this.$store.state.gatherList[round])
          i++
          noRepeat.push(round)
        }
      }
      this.Recommend = arr
    },
    login () {
      this.$store.state.loginBox.style.cssText = 'display: block;'
    },
    glist () {
      var i=0
      var k=0
      var j=0
      this.$store.state.gatherList.forEach(element=>{
        if(element.gclass == '古风'){
          i++
          if(i>8){
            return
          }
          this.gulist.push(element)
        } 
        if(element.gclass == '流行'){
          k++
          if(k>8){
            return
          }
          this.liulist.push(element)
        }
        if(element.gclass == '民谣'){
          j++
          if(j>8){
            return
          }
          this.minlist.push(element)
        }
      })
    },
    handelClassTab (tab) {
      this.gatherList = []
      if(tab == '推荐'){
        var  i = 0;
        this.$store.state.gatherList.forEach(element => {
          i++
          if(i>8){
            return
          }
          this.gatherList.push(element)
        });
      }else{
        var i = 0;
        this.$store.state.gatherList.forEach(element => {
          if(element.gclass == tab){
            i++
            if(i>8){
            return
          }
            this.gatherList.push(element)
          }
        });
      }
    },
    left(data){
      if(this.i) {
        var l = this.marginleft
        if(data == 0){  
          this.marginleft = l==-1290 ? -1290: l+=-645
        }else{
          this.marginleft = l==0 ? 0: l+=645
        }
        this.i = false
        clearTimeout(this.timer) 
        this.timer = setTimeout( () => {
          this.i = true
        },1000)
      }
    },
  },
  mounted () {
    this.rec()
    this.handelClassTab('推荐')
    this.glist()
  }
}
</script>
<style lang="stylus">
  .index
    .index-section
      width 982px
      height 1400px
      overflow hidden
      //background-color green 
      margin 0 auto
      .section-leftaside
        float left
        width 730px
        min-height 1400px
        border-left: 1px solid #ccc
        box-sizing: border-box
        background: #fff
        .wrap
          width 690px
          height 1400px
          margin 20px auto
          .card
            width 690px
            //height 523px
            background-color white
            &:after
              content ""
              display block
              clear both
            .card-head
              height 33px
              position relative
              padding 0 10px 0 34px
              border-bottom 2px solid #C10D0C
              .cardicon
                position absolute
                top 8px
                left 15px
                height 30px
                width 30px
                background url(/staticimg/index.png) -234px -164px
              .tilte 
                float left
                font-size 20px
                line-height 28px
                color #d11016
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
            .section
              margin 20px 0 0 -42px
              li 
                float left
                width 140px
                height 204px
                overflow hidden
                display inline-block 
                //border 1px solid #000
                padding 0 0 30px 42.5px
                .section-cover
                  width 140px
                  height 140px
                  position relative
                  //border 1px solid #000
                  .cover-img 
                    width 100%
                    height 100%
                  .cover-a 
                    position absolute
                    top 0px
                    left  0px   
                    width 100%
                    height 100%
                  .cover-bottom
                    position absolute
                    bottom 0
                    left 0
                    width 100%
                    height 27px
                    background-color rgba(0,0,0,0.4)
                    .bottom-span1
                      float left
                      width 15px
                      height 13px
                      margin 9px 5px 9px 10px
                      background url(/staticimg/icon.png) -26px -542px
                    .bottom-span2
                      float left
                      margin 7px 0 0 0
                      color #ccc
                    .bottom-a
                      float right 
                      width 18px
                      height 19px
                      margin 5px 
                      background url(/staticimg/table.png) 0 -103px         
                .section-bottom
                  margin 8px 0 3px
                  font-size 14px
                  a
                    color: #333
                    &:hover
                      text-decoration underline
                  .bottom-title
                    display inline-block
                    max-width 100%
                    color #000
                    font-size 14px
                    &:hover
                      color #f00
             .disk
                position relative
                height 186px
                margin 20px 0 37px
                border 1px solid #d3d3d3
                background #f5f5f5
                .disk-leftbutton
                  position: absolute;
                  top 71px
                  left -1px
                  width: 23px
                  height 30px
                  font-size:30px
                  text-align:center
                  line-height:30px
                  color:#666
                .disk-rightbutton
                  position absolute
                  top 71px
                  right 4px
                  width: 23px
                  height 30px
                  font-size:30px
                  line-height:30px
                  text-align:center
                  color:#666
                .disk-section
                  position relative
                  float left
                  width 645px
                  height 180px
                  margin-left 24px
                  overflow hidden
                  .roll
                    float left
                    width 1935px
                    height 180px  
                    position relative
                    transition: 1s
                    .cd-list
                      // position absolute
                      // top 0
                      float left
                      width 645px
                      margin 28px 0 0 0
                      transition:all 1s ease-out 0s
                      .cd-item 
                        float left
                        display inline
                        width 118px
                        height 150px
                        margin-left 11px
                        //background-color green
                        .item-content 
                          width 100px
                          height 100px
                          margin-bottom 7px
                          position relative
                          img 
                            width 100%
                            height 100%
                          .content-thank
                            position absolute
                            top 0
                            left 0
                            width 118px
                            height 100px
                            background url(/staticimg/coverall.png) 0px -570px no-repeat
                          .icon-play
                            left 72px
                            width 22px
                            height 22px
                            display none
                      p 
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        width 90%
                        line-height 18px
                        .songname
                          color: #000
                        a 
                          color #666
                          font-size: 12px
                          font-family: Arial
                          &:hover
                            text-decoration underline
            .bilst
              height 472px
              margin-top 20px
              padding-left 1px
              .blk 
                float left
                width 225px
                border 1px solid #ccc
                .top 
                  height 100px
                  padding 20px 0 0 19px
                  .img
                    float left
                    width 80px
                    height 80px
                    box-shadow 0px 2px 10px 1px #707071
                    a 
                      width 100%
                      height 100%
                      cursor pointer
                      &:hover
                        text-decoration underline
                      img     
                          width 100%
                          height 100%
                .title 
                  float left
                  width 116px
                  margin 6px 0 0 10px
                  a 
                    color #000
                    font-size: 14px
                  div 
                    a 
                      display block
                      float left
                      width 22px
                      height 22px
                      margin 10px 10px 0 10px
                      background url(/staticimg/table.png) 0 -103px
                      &:nth-child(2)
                        background url(/staticimg/icon.png) -45px -86px  
                ul 
                  line-height 32px 
                    
                  li  
                    height 32px
                    width 100%
                    //background-color #000
                    &:hover .btn
                      display block
                    &:nth-child(2n-1)
                      background-color #e8e8e8
                    &:nth-child(1) span
                        color red
                    &:nth-child(2) span
                        color red
                    &:nth-child(3) span
                        color red
                    span 
                      color #000
                      float left
                      position relative
                      width 35px
                      height 32px
                      text-align center
                    a 
                      float left
                      width 185px
                      height 32px
                      color #000
                      overflow hidden
                      text-overflow ellipsis
                      white-space nowrap
                      &:hover
                        text-decoration underline
                    .btn
                      display none 
                      a
                        float left
                        width 16px
                        height 16px
                        margin 7px 0px 5px 15px
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
                .more
                  clear both
                  height 32px
                  text-align right
                  line-height 32px
                  background-color #e8e8e8
                  a 
                    margin-right 32px
                    color #000
      .section-rightside
        position relative
        float right
        width 250px
        background-color #fff
        border 1px solid #ccc
        height 100%
        .login
          height 126px
          padding-top 0
          background-image:linear-gradient(90deg,#fafafa 30%,#e8e8e8 70%);
          p 
            width 205px
            margin 0 auto
            padding 16px 0
            line-height 22px
            color #666
          a 
            display block
            width 100px
            height 31px
            text-align center
            line-height 30px
            color #fff
            border-radius 20px
            margin 0 auto
            background #d11016
            &:hover
              background #dc1d25
      .singer
        margin-top 15px
        &:after
          content ""
          display block
          clear both
        h3 
          padding-left 20px
        span 
          float left
          font-size 12px
        a 
          float right
          margin-right: 17px
          color #999
          font-size 12px
          &:hover
            color: #666
      .enter 
        margin 6px 0 14px 20px
        li  
          margin-top 14px
          float left
          .tdn
            float left
            &:hover
              background #f4f4f4  
            .head
              float left
              width 62px
              height 62px
              img 
                width 100%
                height 100%
          .ifo 
            float left
            width 135px
            height 60px
            padding-left 14px
            // border 1px solid #e9e9e9
            border-left none
            h4 
              margin-top 8px
              width 100%
              span 
                color: #333
                width 100%
                white-space nowrap
                text-overflow ellipsis 
                overflow hidden
            p 
              width 100%
              margin-top 36px
              color #666
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              word-wrap normal
      div 
        .blank
          margin-top 12px
          margin-right 20px
          display block
          width 210px
          height 31px
          border 1px solid #c3c3c3
          background-color #f6f6f6
          color #000
          text-align center
          line-height 33px
          border-radius 4px
    .cj 
      margin-top 30px
      &:after
        content ""
        display block
        clear both
      h3 
        height 23px
        margin 0 20px
        border-bottom 1px solid #ccc
        color #333
        font-size 12px
      .plays 
        margin 20px 0 0 20px
        li 
          float left
          width 210px
          height 50px
          .cver 
            float left
            width 40px
            margin-right 10px
            img 
              width 100%
              height 100%
          .info
            float left
            width 160px
            line-height: 21px
            p 
              
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              word-wrap normal
              color #666
              a 
                color #000
                
              .u-icn
                display:inline-block
                width:11px
                height:13px
                vertical-align:middle
                background:url(/staticimg/icon_v.png)
</style>
