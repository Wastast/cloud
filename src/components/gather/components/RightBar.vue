<template>
  <div class="rightbar">
    <div class="like">
      <h3>喜欢这个歌单的人</h3>
      <ul class="user-list">
        <li v-for="item of user" :key="item.uid" class="item">
          <router-link  tag="img" :to="'/user_home/'+item.uid" :src="'/api'+item.upic" alt="/staticimg/default_avatar.jpg"> </router-link>
        </li>
      </ul>
      <h3>热门歌单</h3>
      <ul class="g-list">
        <li class="item" v-for="item of list" :key="item.gid">
          <router-link :to="'/gather/'+item.gid" class="img-box">
            <img :src="'/api'+item.gimgurl" alt="/staticimg/default_avatar.jpg">
          </router-link>
          <div class="g-info">
            <router-link :to="'/gather/'+item.gid">{{item.gname}}</router-link>
            <span>by</span>
            <router-link :to="'/user_home/'+item.uid" href="javascript:;" class="name" :title="item.uname">{{item.uname}}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  props: ['gather'],
  data () {
    return {
      gid: '',
      user: [],
      list: [
        {gid:2,gname: '你在抖音上一定听过他们唱',gimgurl:'img/109951163681870745.jpg',uname:'明眸深处一锚',uid:2},
        {gid:13,gname: '好想变成雪啊 这样就可以落在先生肩上了',gimgurl:'img/19054536509925566.jpg',uname:'Mr.kai',uid:1},
        {gid:26,gname: '热评华语 ｜ 从冷门到热评，热度见证良曲',gimgurl:'img/109951163864466149.jpg',uname:'夏天有芒果四季都有我',uid:7},
        {gid:21,gname: '精选经典好听古风歌曲合集',gimgurl:'img/1421668543304411.jpg',uname:'Floatinglife',uid:12},
      ]
    }
  },
  watch: {
    gather () {
      this.gid = this.gather.gid
      this.getuser()
    },
  },
  methods: {
    getuser () {
      var arr = []
      this.userList.forEach((e, index) => {
        if(e.enshgid!=null) {
          var a = e.enshgid.split(',')
          for(var key of a) {
            if(key == this.gid) {
              arr.push(e)
            }
          }
        }
      })
      this.user = arr
    }
  },
  computed: {
    ...mapState(['userList','gatherList'])
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/pub.styl'
  .rightbar
    float right
    width 270px
    overflow hidden
    box-sizing border-box
    padding: 20px 40px 40px 30px
    .like
      position relative
      h3
        height: 23px;
        margin-bottom: 20px;
        color: rgb(51, 51, 51);
        border-bottom: 1px solid rgb(204, 204, 204);
      .user-list
        margin: 0 0 25px -13px
        overflow hidden
        .item
          display: inline;
          padding: 0px 0px 13px 13px;
          float: left;
          width: 40px;
          height: 40px;
          img
            width: 40px;
            height: 40px;
            cursor pointer
      .g-list
        .item
          width 200px
          height 50px
          margin-bottom: 15px;
          position relative
        .img-box
          float left
          width 50px
          height 50px
          cursor pointer
          img 
            width 50px
            height 50px
        .g-info
          width 140px
          height 49px
          float right
          p
            color: rgb(0, 0, 0)
            font-size: 14px
            cursor: pointer
            ellipsis()
            line-height: 24px;
            margin-bottom: 3px
            &:hover
              text-decoration underline
          span
            margin-top: 5px
            color: rgb(153, 153, 153);
            line-height 24px
          .name
            position absolute
            bottom: 0  
            left: 80px 
            width 110px
            line-height 24px
            margin: 0
          a
            display inline-block
            width 140px
            color: rgb(102, 102, 102);
            margin: 0px 2px 7px 4px;
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            ellipsis()
            &:hover
              text-decoration underline

</style>

