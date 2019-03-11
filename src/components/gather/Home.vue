<template>
  <div class="gather">
    <index-header></index-header>
    <gather-header> </gather-header>
    <msg-box ref="msgbox"></msg-box>
    <div class="body">
      <left-bar :gather="gather" :msg="popup" :user="userId" :pid="pid" :comments="comments" @changeComment="updateText"> </left-bar>
      <right-bar :gather="gather" @change="tabRoute"> </right-bar>
    </div>
    <gather-footer></gather-footer>
  </div>
</template>

<script>
import GatherHeader from '../Index/components/components/HeadNav'
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'
import GatherFooter from '../Index/components/Footer'
import IndexHeader from '../pub/Header'
import MsgBox from './components/Msgbox'
import { mapState } from 'vuex'
export default {
  props: ['gid'],
  name: 'Gather',
  data () {
    return {
      gather: '',
      popup: '',
      route: '',
      userId: '',
      pid: '',
      comments: []
    }
  },
  watch: {
    gid () {
      this.userId = this.gatherList[this.gid-1].uid
      this.gather = this.$store.state.gatherList[this.gid-1]
    },
    play () {
      this.pid = this.play.mid
    }
  },
  methods: {
    tabRoute (i) {
      this.route = i
    },
    updateText (user,text) {
      var url = `/api/comment/addcomment?upic=${user.upic}&uid=${user.uid}&uname=${user.uname}&ccontent=${text}`
      this.axios.get(url).then((res)=>{
        this.comments = res.data.data
      })
    }
  },
  computed: {
    ...mapState(['gatherList','play'])
  },
  components: {
    GatherHeader,
    LeftBar,
    RightBar,
    GatherFooter,
    IndexHeader,
    MsgBox
  },
  created () {
    var url = '/api/comment/count'
    this.axios.get(url).then((res)=>{
      this.comments = res.data.data
    })
  },
  mounted () {
    // 获取歌单id
    this.route = this.gid
    // 获取弹出框
    this.popup = this.$refs.msgbox.$refs.msgbox
    // 获取歌单的创建者id
    this.userId = this.gatherList[this.gid-1].uid
    // 获取vuex仓库中的歌单数据
    this.gather = this.$store.state.gatherList[this.gid-1]
    // 获取当前播放的歌曲id
    this.pid = this.play.mid
  }
}
</script>

<style lang="stylus" scoped>
  .gather
    height 100%
    .body
      width 982px
      margin: 0 auto
      border: 1px solid #d3d3d3;
      border-width: 0 1px;
      overflow hidden
      background-color #fff
</style>
