<template>
    <div class="HomeList">
        <div class="listTitle">
          <h3>
            <span class="lt-l">听歌排行</span>
          </h3>
          <span class="n-icopoint">
            <a href="javascript:;"></a>
            <div class="tip">
              <p>实际播放时间过短的歌曲将不纳入计算。</p>
              <i class="t"></i>
              <i class="b"></i>
            </div>
          </span>
        </div>
        <div class="listBody">
          <div>
            <ul>
              <li v-for="(item,index) of list" :key="item.mid" :style="{background: (index%2==0?'#fff':'#f7f7f7')}">
                <div class="hd">
                  <span class="ply" :class="pid==item.mid?'now-paly':''" @click="getsid(item)"></span>
                  <span class="num">{{index+1}}.</span>
                </div>
                <div class="song">
                  <div class="tt">
                    <div class="ttc">
                      <span class="txt">
                        <router-link :to="'/my_playlist/'+item.mid">
                          <b :title="item.mname">{{item.mname}}</b>
                        </router-link>
                        <span class="ar">
                          <em>-</em>
                          <span :title="item.msinger">
                            <a href="javascript:;">{{item.msinger}}</a>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="opt">
                  <a href="javascript:;" class="icn-add" title="添加到播放列表" @click="addplaylist(item)"></a>
                  <span class="icn-fav" title="收藏"></span>
                  <span class="icn-share" title="分享"></span>
                  <span class="icn-dl" title="下载"></span>
                </div>                
                <div class="tops">
                  <span class="bg" :style="{width: index=Math.floor(Math.random()*100+1)+'%'}"></span>
                  <span class="times">{{parseInt(index)}}次</span>
                </div>
              </li>
            </ul>
            <div class="more">
              <a href="javascript:;">查看更多></a>
            </div>
          </div>
        </div>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  props: ['info','pid'],
  data() {
    return {
      list:[],
      index: 0
    }
  },
  watch: {
    info () {
      this.userlike()
    }
  },
  computed: {
    ...mapState(['playlist','userList','userInfo','play'])
  },
  methods: {
    userlike(){
      var url=`/api/user/userlike?uid=${this.info.uid}`;
        this.axios.get(url).then( result => {
          this.list= result.data.data;
      });
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
    ...mapMutations(['getPlay','getPlayList','addPlayList','getCollectSong'])
  },
}
</script>

<style lang="stylus" scoped>
    @import '~styles/userhome.styl';
    .listTitle
        position relative
        z-index 2
        zoom 1
        height 33px
        border-bottom 2px solid #c20c0c
        font-size 12px
        color #333
        &:after
          clear()
        h3
          font-size 20px
          line-height 28px
          font-weight normal
          float left
          .lt-l
            color #666
        h4
          float left
          display inline
          margin 5px 0 0 10px
          line-height 26px
          font-weight 400
          color #666
        .n-icopoint
          position relative
          margin-left 10px
          left -1px
          top 8px
          line-height 18px
          z-index 2
          font-size 12px
          color #333
          &:hover .tip
            display block
          a
            width 18px
            height 18px
            background url(/staticimg/icon2.png-2caf940b50f43fd0e2e6a630f564f1d8.png) 0 -50px
            display inline-block
            overflow hidden
            vertical-align middle
            cursor pointer
          .tip
            position absolute
            left -33px
            top 30px
            display none
            width 295px
            font-size 12px
            line-height 20px
            padding 8px 19px 7px 19px
            z-index 2
            color #666
            background url(/staticimg/top_m.png-ce7db05cc2438735d39f29cfb742d85f.png) 0 0 repeat-y
            .t
              position absolute
              width 327px
              height 16px
              left 0
              top -16px
              background url(/staticimg/top_t.png-844881d957be0086b48ebdf50b0a3d9f.png) 0 0 repeat
            .b
              position absolute
              width 327px
              height 12px
              left 0
              bottom -12px
              background url(/staticimg/top_b.png-d960a2d1dc772b912782572b77c298fd.png) 0 0 repeat
        .lt-nav
          position absolute
          z-index 1
          right 0
          bottom 5px
          color #333
          &:after
            clear()
          span
            line-height 26px
            color #666
            cursor pointer
            float right
            margin-left 8px
          i
            width 1px
            height 12px
            margin-top 7px
            background #999
            float right
            margin-left 8px
          .z-sel
            color #333
            font-weight 700
    .listBody
        margin-bottom 36px
        font-size 12px
        color #333
        ul
          border 1px solid #e2e2e2
          border-top none
          li
            height 38px
            line-height 38px
            overflow hidden
            position relative
            &:hover
              background #eee
            &:hover .opt
              display block
            .hd
              float left
              width 72px
              height 38px
              overflow hidden
              .ply
                float right
                display inline
                margin-top 10px
                width 17px
                height 17px
                cursor pointer
                background url(/staticimg/table.png) 0 -103px
                &:hover
                  background url(/staticimg/table.png) 0 -128px
              .now-paly
                background-position: -20px -128px;
                &:hover
                  background-position: -20px -128px; 
              .num
                float left
                display inline
                padding 0 8px 0 5px
                width 37px
                text-align right
                overflow hidden
                font-size 16px
                color #666
            .song
              float left
              position relative
              z-index 1
              padding-left 10px
              width 480px
              height 38px
              overflow hidden
              .tt
                float left 
                width 100%
                .txt
                  position relative
                  display inline-block
                  max-width 99%
                  overflow hidden
                  a
                    cursor pointer
                    color #333
                    &:hover
                      text-decoration underline
                  .ar
                    color #aeaeae
                    em
                      margin 0 5px
                    span
                      a
                        color #aeaeae
                        &:hover
                          text-decoration underline
            .opt
              position absolute
              z-index 1
              right 340px
              top 11px
              display none 
              width 92px
              height 20px
              overflow hidden
              .icn-add
                float left
                margin-top 2px
                width 13px
                height 13px
                background url(/staticimg/icon.png) 0 -700px
                display inline-block
                overflow hidden
                vertical-align middle
                &:hover
                  background url(/staticimg/icon.png) -22px -700px 
              .icn-fav
                float left
                width 18px
                height 16px
                margin 2px 0 0 8px
                overflow hidden
                cursor pointer
                background url(/staticimg/table.png-3ef9aed624a9a606ffeab709ae65e0c0.png) 0 -174px
                &:hover
                  background url(/staticimg/table.png-3ef9aed624a9a606ffeab709ae65e0c0.png) -20px -174px
              .icn-share
                float left
                width 18px
                height 16px
                margin 2px 0 0 8px
                overflow hidden
                cursor pointer
                background url(/staticimg/table.png-3ef9aed624a9a606ffeab709ae65e0c0.png) 0 -195px
                &:hover
                  background url(/staticimg/table.png-3ef9aed624a9a606ffeab709ae65e0c0.png) -20px -195px
              .icn-dl
                float left
                width 18px
                height 16px
                margin 2px 0 0 8px
                overflow hidden
                cursor pointer
                background url(/staticimg/table.png-3ef9aed624a9a606ffeab709ae65e0c0.png) -80px -174px
                &:hover
                  background url(/staticimg/table.png-3ef9aed624a9a606ffeab709ae65e0c0.png) -103px -174px
            .tops
              float right
              position relative
              z-index 1
              zoom 1
              width 319px
              height 38px
              line-height 38px
              &:after
                clear()
              .bg
                position absolute
                z-index 1
                height 38px
                background #4eb4f5
                opacity 0.1
              .times
                position absolute
                left 10px
                z-index 1
                height 38px
                line-height 38px
                color #666
        .more
          height 32px
          line-height 32px
          text-align right
          a
            color #666
            &:hover
              text-decoration underline
</style>