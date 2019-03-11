<template>
  <div class="userhome">
    <div class="fixed">
      <index-header > </index-header>
      <div class="header">
      </div>
    </div>
    <msgbox ref="msgbox"></msgbox>
    <not-login v-if="!login"> </not-login>
    <div class="userbody" v-if="login">
      <umusic-sidebar @getGather="get" :user="user"> </umusic-sidebar>
      <umusic-desc :gather="gatherList" :user="userId" :list="list" :pid="pid" :comments="comments" @changeComment="updateText" :msg="popup" @delsong="delet"></umusic-desc>
      <umusic-create></umusic-create>
      <umusic-delete></umusic-delete>
    </div>
  </div>
</template>

<script>
import UmusicSidebar from './components/Sidebar'
import UmusicDesc from './components/desc'
import IndexHeader from '../pub/Header'
import NotLogin from './components/notLogin'
import UmusicCreate from './components/create'
import UmusicDelete from './components/delete'
import Msgbox from './components/Msgbox'
import {mapState} from 'vuex'
export default {
  props:['gid'],
  name:'UserIndex',
  data () {
    return {
      list:[],
      user: [],
      login: false,
      userId: '',
      pid: '',
      comments: [],
      popup: ''
    }
  },
  watch: {
    gid () {
      if (this.gid == "my") {
        var url=`/api/user/userlike?uid=${this.userInfo.uid}`;
          this.axios.get(url).then( result => {
            this.list= result.data.data;
        });
        return
      }
      this.list = this.gatherList[this.gid-1]
    },
    play () {
      this.pid = this.play.mid
    }
  },
  computed: {
    ...mapState(['userInfo','gatherList','play'])
  },
  components: {
    UmusicSidebar,
    UmusicDesc,
    IndexHeader,
    UmusicCreate,
    UmusicDelete,
    NotLogin,
    Msgbox
  },
  methods: {
    get (item) {
      this.userId = item.uid
      this.gatherList = item
    },
    updateText (user,text) {
      var url = `/api/comment/addcomment?upic=${user.upic}&uid=${user.uid}&uname=${user.uname}&ccontent=${text}`
      this.axios.get(url).then((res)=>{
        this.comments = res.data.data
      })
    },
    delet (mid) {
      if(this.list.mid) {
        var id = this.list.mid.split(',')
        var index = id.indexOf(mid+'')
        id.splice(index,1)
        var str = id.join(',')
        this.list.mid = str
        this.gatherList[this.gid-1].mid = str
        var url = `/api/music/tabGather?mid=${str}&gid=${this.gid}`
        this.axios.get(url).then((res)=>{
          console.log(res.data)
        })
      }
    }
  },
  created () {
    var url = '/api/comment/count'
    this.axios.get(url).then((res)=>{
      this.comments = res.data.data
    })
  },
  mounted () {
    this.popup = this.$refs.msgbox.$refs.msgbox
    this.pid = this.play.mid
    if (this.gid == "my") {
      var url=`/api/user/userlike?uid=${this.userInfo.uid}`;
        this.axios.get(url).then( result => {
          this.list= result.data.data;
      });
    }
    this.user = this.userInfo
    if(this.userInfo!=''){
      this.login = true
    }else{
      this.login = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .userhome
    width 100%
    height 100%
    overflow hidden
    .fixed
      position fixed
      top: 0
      left: 0
      right 0
    .header
      height 5px
      background-color #C20C0C
      overflow hidden
    .userbody
      background-color #fff
      width 982px
      margin 70px auto 0 
      overflow hidden
      min-height 100%
      padding-bottom 50px
      border-left: 1px solid #d3d3d3;
      border-right: 1px solid #d3d3d3;
</style>
