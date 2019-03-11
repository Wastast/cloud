<template>
  <div class="g-section">
    <div class="g-wrap">
      <div class="card">
        <div class="card-head">
          <a href="javascript:;" class="tilte">全部</a>
          <a href="javascript:;" class="menu" @click="fen()">选择分类∨</a>
          <div class="more">
            <a href="javascript:;" class="more-a">热门</a>
            <a href="javascript:;" class="more-a">最新</a>
          </div>
        </div>
        <div class="gsection" v-show="gsection" >
          <div class="hd"></div>
          <div class="bd">
            <h3><a href="javascript:;" @click="gaList('全部')">全部风格</a></h3>
            <dl class="cb">
              <dd>
                <a href="javascript:;" class="tab-a" @click="gaList('古风')" >古风</a>
                <span class="tab-span">|</span>
                <a href="javascript:;" class="tab-a" @click="gaList('流行')">流行</a>
                <span class="tab-span">|</span>
                <a href="javascript:;" class="tab-a" @click="gaList('民谣')">民谣</a>
              </dd>
            </dl>
          </div>
        </div>
        <ul class="section">
          <li v-for="item of quanlist" :key="item.gid">
            <div class="section-cover">
              <img :src="'/api/'+item.gimgurl" alt="" class="cover-img">
              <router-link :to="'/gather/'+item.gid" href="javascript:;" class="cover-a"></router-link>
              <!-- <div class="cover-bottom">
                <a href="javascript:;" class="bottom-a"></a>
                <span class="bottom-span1"></span>
                <span class="bottom-span2">767</span>
              </div> -->
            </div>
            <p class="section-bottom">
              <router-link :to="'/gather/'+item.gid" href="javascript:;" class="bottom-title" :title="item.gname">{{item.gname}}</router-link>
            </p>
            <p class="dec">
              <span>by</span>
              <router-link :to="'/user_home/'+item.uid" :title="item.uname">{{item.uname}}</router-link>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  data(){
    return{
      gsection:false,
      quanlist: '',
    }
  },
  watch: {
    gatherList () {
      this.quanlist = this.gatherList
    }
  },
  computed: {
    ...mapState(['gatherList'])
  },
  methods:{
    fen () {
      if(this.gsection==false){
        this.gsection=true
      }else{
        this.gsection=false
      }
    },
    gaList (data) {
      this.quanlist = []
      this.fen()
      var i=0
      this.$store.state.gatherList.forEach(element => {
        if(data=='全部'){
          this.quanlist.push(element)
        }else if(data=='古风'){
          if(element.gclass == data){
            this.quanlist.push(element)
          }
        }else if(data=='民谣'){
          if(element.gclass == data){
            this.quanlist.push(element)
          }
        }else if(data=='流行'){
          if(element.gclass == data){
            this.quanlist.push(element)
          }
        }
      })
    },
  },
  mounted () {
    this.quanlist = this.gatherList
  }
}
</script>

<style lang="stylus">
  .g-section
    width 980px
    min-height 700px
    _height 700px
    margin 0 auto
    background-color #fff
    border 1px solid #d3d3d3
    border-width: 0 1px
    .g-wrap
      padding 40px
      .card
        width 900px
        background-color white
        &:after
          content ""
          display block
          clear both
        .card-head
          height 33px
          padding 0 10px 5px 34px
          border-bottom 2px solid #C10D0C
          .tilte 
            float left
            font-size 24px
            line-height 28px
            color #000
          .menu
            color: #0c73c2
            margin 2px 0px 0px 12px
            padding 7px 10px 7px 15px
            text-align center
            line-height: 28px
            border-radius 5px
            border 1px solid #c3c3c3
            background-color #f4f4f4
          .more
            float right
            margin-top 5px
            .more-a 
              float left
              color #333
              width 46px
              height 29px
              display block
              line-height 29px
              border 1px solid #ccc
              border-left none
              text-align center
              border-radius 0 4px 4px 0
              &:nth-child(1)
                background-color #c60c0c
                border-right none
                color #fff
                border-radius 4px 0 0 4px
        .gsection
          position absolute
          top 180px
          z-index 5
          width 300px
          .hd
            width 27px
            height 13px 
            background url(/staticimg/iconall.png) -46px 0px no-repeat
            position absolute
            left 122px
            z-index 6
          .bd
            margin-top 11px 
            background-color #fff
            box-shadow 0px 2px 10px 1px #707071
            h3 
              height 37px
              padding-left 26px
              border-bottom 1px solid #e6e6e6
              font-weight normal
              a 
                color #000
                padding 7px
                border-radius 5px
                border 1px solid #c3c3c3
                background-color #f4f4f4
                font-size 10px
                line-height 37px
            .cb 
              dd 
                padding-left 40px
                padding-bottom  5px
                a 
                  color #000
                  padding 15px
                  &:hover
                    color #c20c0c
        .section
          margin: 24px 0 0 -46px
          li 
            float left
            width 140px
            height 204px
            overflow hidden
            display inline-block 
            padding: 0 0 30px 48.5px
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
                  width 14px
                  height 11px
                  //background-position 0 -24px
                  margin 9px 5px 9px 10px
                  //background url() 25px 540px no-repeat
                .bottom-span2
                  float left
                  margin 7px 0 0 0
                  color #ccc        
            .section-bottom
              margin 8px 0 3px
              font-size 14px
              .bottom-title
                display inline-block
                max-width 100%
                color #000
                font-size 14px
                overflow hidden
                text-overflow ellipsis 
                white-space nowrap
                word-wrap nowrap
                &:hover
                  text-decoration: underline
            .dec
              span 
                color #999
              a 
                color #666
                &:hover
                  text-decoration: underline
              .u-icn
                display:inline-block
                width:11px
                height:13px
                vertical-align:middle
                background url(/staticimg/icon_v.png)
</style>
