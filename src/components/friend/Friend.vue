<template>
  <div class="friend-container">
    <index-header> </index-header>
    <div class="header">
    </div>
    <not-login v-if="!login"></not-login>
    <div class="friend-main clearfix" v-if="login">
      <div class="friend-left">
        <div class="friend-head">
          <h3 class="title">动态</h3>
          <span class="updatings" title="发动态" @click="addtrends"></span>
          <msg-box ref="msbox"></msg-box>
        </div>
        <share-info :shareInfo="shareInfo" :info="info"></share-info>
      </div>
      <user-head :info="info"></user-head>
    </div>
    <pub-footer> </pub-footer>
  </div>
</template>
<script>
import userHead from "./components/userhead"
import shareInfo from "./components/shareInfo"
import msgBox from "./components/msgBox"
import notLogin from "./components/notLogin"
import IndexHeader from '../pub/Header'
import PubFooter from '../Index/components/Footer'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      shareInfo:"",
      login: '',
      info: ''
    }
  },
  components:{
    userHead,
    shareInfo,
    msgBox,
    notLogin,
    IndexHeader,
    PubFooter
  },
  computed: {
    ...mapState(['city','userInfo'])
  },
  methods: {
    addtrends () {
      this.$refs.msbox.$refs.j_popup.style.cssText = "display:block;"
    },
  },
  mounted () {
    if(this.userInfo!=''){
      this.login = true
      this.info = this.userInfo
      var url = `/api/comment/share?uid=${this.userInfo.uid}`
      this.axios.get(url).then((res)=>{
        this.shareInfo = res.data.data
      })
    }else{
      this.login = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  height 5px
  background-color #C20C0C
  overflow hidden
.clearfix:before,
.clearfix:after
  display table 
  content: ""
.clearfix:after  
  clear both
.friend-container
  background #f5f5f5
.friend-main
  width 980px
  min-height 700px
  margin 0 auto
  border 1px solid #d3d3d3
  border-width 0 1px
  background #fff
.friend-left
  width 680px
  min-height 700px
  padding 20px 30px
  float left
  box-sizing border-box
  border-right 1px solid #d3d3d3
.friend-head
  height 40px
  border-bottom 2px solid #C10D0C
.title
  float left
  font-size 24px
  line-height 28px
  color #000
  font-weight normal
.updatings
  display inline-block
  float right
  width 71px
  height 24px
  background url(/staticimg/frd_dyn_sprite.png) 0 -452px no-repeat
  cursor pointer
  margin 6px 0 0 10px
  overflow hidden
</style>