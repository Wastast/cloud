<template>
  <div class="my-homepage"> 
    <index-header> </index-header>
    <div class="main">
      <div class="header"></div>
      <div class="mainBody">
        <home-head :info="list"></home-head>
        <home-list :info="list" :pid="pid"></home-list>
        <home-create :info="list"></home-create>
        <home-collection :info="list"></home-collection>
      </div>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeHead from './components/userHead'
import HomeList from './components/list'
import HomeCreate from './components/create'
import HomeCollection from './components/collection'
import HomeFooter from './components/Footer'
import IndexHeader from '../pub/Header'
import {mapState} from 'vuex'

export default {
  name:'MyHomepage',
  props: ['uid'],
  data () {
    return {
      list: [],
      pid: ''
    }
  },
  watch: {
    uid () {
      this.list = this.userList[this.uid-1]
    },
    play () {
      this.pid = this.play.mid
    },
    userInfo () {
      this.list = this.userInfo
    }
  },
  components: {
      HomeHead,
      HomeList,
      HomeCreate,
      HomeCollection,
      HomeFooter,
      IndexHeader
  },
  computed: {
    ...mapState(['userInfo','gatherList','userList','play'])  //从vuex获取用户信息
  },
  mounted () {
    // 判断访问页面的是否是用户本人
    if(this.uid == this.userInfo.uid){
      this.list = this.userInfo
    }else{
      var url = `/api/user/userinfo?uid=${this.uid}`
      this.axios.get(url).then((res)=>{
        this.list = res.data.data[0]
      })
      this.pid = this.play.mid
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #f5f5f5
    .header
      height 5px
      background-color #C20C0C
    .mainBody
      width 900px
      height 100%
      min-height 980px
      background-color #fff
      border 1px solid #d3d3d3
      border-bottom none
      margin 0 auto
      padding 40px

</style>
