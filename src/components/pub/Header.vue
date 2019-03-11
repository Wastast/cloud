<template>
<div class="ye_head">
     <msg-box ref="msg"></msg-box>
     <div class="ye_board">
          <div class="logo">
               <router-link to="/"></router-link>
          </div>
          <!-- 路由 -->
          <ul class="nav-list">
               <router-link tag="li" to="/">
                    <a href="javascript:;">发现音乐</a>
               </router-link>

               <router-link tag="li" to="/user_music/my">
                    <a href="javascript:;">我的音乐</a>
               </router-link>

               <router-link tag="li" to="/friend">
                    <a href="javascript:;">朋友</a>
               </router-link >

               <!-- <router-link tag="li" to="/music">
                    <a href="javascript:;">团队介绍</a>
               </router-link> -->
          </ul>
          <div class="loginBox">
               <span class="login" @click="phoneLogin" v-show="!a">
                    登录<i class="el-icon-arrow-down el-icon--right"></i>
               </span>
               <div class="user-login" v-show="a">
                    <div class="user-img">
                         <img :src="this.userInfo.upic?'/api'+this.userInfo.upic:'/staticimg/default_avatar.jpg'">
                         <i class="el-icon-caret-bottom el-icon--right xiala-menu"></i>
                    </div>
                    <div class="user-menu">
                         <ul>
                              <li>
                                   <router-link :to="'/user_home/'+this.userInfo.uid" class="itm-1">
                                        <i class="icn icn-hm"></i>
                                        <em>我的主页</em>
                                   </router-link>
                              </li>
                              <!-- <li>
                                   <a href="javascript:;" class="itm-2">
                                        <i class="icn icn-msg"></i>
                                        <em>我的消息</em>
                                   </a>
                              </li> -->
                              <li>
                                   <router-link :to="'/user_setting/'+this.userInfo.uid" class="itm-3">
                                        <i class="icn icn-st"></i>
                                        <em>个人设置</em>
                                   </router-link>
                              </li>
                              <li>
                                   <a href="jacascript:;" class="itm-4" @click="outlogin">
                                        <i class="icn icn-ex"></i>
                                        <em>退出</em>
                                   </a>
                              </li>
                         </ul>
                         <i class="arr"></i>
                    </div>
               </div>
          </div>
          <div class="input-box">
               <i class="search"></i>
               <div class="input-text">
                    <input type="text" class="seek" @focus="show(1)" @blur="show(-1)" id="d1" ref="search" @keyup="search" v-model="keyword">
                    <label v-show="hid" @click="show(2)">音乐/视频</label>
               </div>
          </div>
     </div>
</div>
 
</template>
<script>
import MsgBox from './Msgbox'
import { mapMutations,mapState } from 'vuex'
export default {
     inject: ['reload'],
     name: 'Header',
     data () {
          return {
               activeIndex: '1',
               activeIndex2: '1',
               hid: true,
               laber: true,
               input: '',
               msgbox:'',
               list:'',
               keyword: ''
          };
     },
     computed: {
          a () {
               if(localStorage.uid!=null || sessionStorage.uid!=null)
               {
                    var bool = true
               }else{
                    var bool = false
               }
               return bool
          },
          ...mapState(['userInfo'])
     },
     components: {
          MsgBox
     },
     methods: {
          show (i)  {
               if(i==2){
                    this.hid = false;
                    this.input.focus();
                    return;
               }
               this.hid = i == 1? false:true;
          },
          search (e) {
               if(e.keyCode == 13) {
                    this.$router.push({
                         path: `/search/${this.keyword}`
                    })
               }
          },
          phoneLogin(){
               this.$store.state.loginBox.style.cssText = 'display:block;';
          },
          outlogin () {
               if(localStorage.uid){
                    localStorage.clear();
               }else{
                    sessionStorage.clear();
                    this.outLogin()
               }
               if(this.$route.name != 'Index'){
                    this.$router.push({path:'/'})
               }else{
                    this.reload()
               }       
          },
          ...mapMutations(['outLogin'])
     },
     mounted () {
          this.msgbox = this.$refs.msg.$refs.msgbox
          this.input = this.$refs.search;
     }
}
</script>

<style lang="stylus" scoped>	
     .ye_head
          background: #242424;
          height 70px
          .ye_board
               width 1100px
               margin 0 auto
               position relative
               .logo
                    float left
                    width 175px
                    height 70px
                    a    
                         display block
                         width 157px
                         height 100%     
                         height 40px
                         margin-top 13px
                         background url(/staticimg/topbar.png) 0 -15px repeat
               .nav-list
                    float left
                    margin 0
                    padding 0
                    font-size: 14px
                    .router-link-exact-active
                         background-color: #000;
                         color: #fff;
                    .active
                         background-color: #000;
                         color: #fff;
                    li
                         float left
                         color: #fff
                         padding 0 19px
                         height 70px
                         line-height 70px
                         color: #cccccc
                         cursor pointer
                         position relative
                         &:hover
                              background-color black
                              color #fff
                         a
                              display block
                              width 100%
                              height 100%
                              color: #eee
                              .router-link-exact-active
                                   background: #000;
               .loginBox
                    float right
                    width 80px
                    .login
                         display inline-block
                         margin-top 25px
                         float right
                         color #787878
                         font-size 14px
                         cursor pointer
                         transition 0.3s
                         &:hover
                              color #ccc
                    .user-login
                         float right
                         margin-top 18px
                         height 43px
                         &:hover .user-menu
                              display block
                         .user-img
                              img
                                   border-radius 50%
                                   width 30px
                                   height 30px
                              .xiala-menu
                                   display inline-block
                                   font-size 20px
                                   color #555
                                   vertical-align middle
                                   margin-top -25px
                         .user-menu
                              display none
                              z-index 10
                              position absolute
                              top 58px
                              right -24px
                              width 128px
                              background #2b2b2b
                              border 1px solid #202020
                              box-shadow 0 8px 24px 0 rgba(0,0,0,0.5)
                              border-radius 4px
                              font-size 12px
                              color #333
                              ul
                                   li
                                        float left
                                        width 100%
                                        &:hover
                                             background #353535
                                             color #fff
                                        a
                                             float left
                                             width 100%
                                             height 34px
                                             line-height 34px
                                             position relative
                                             overflow hidden
                                             padding-left 24px
                                             color #ccc
                                             .icn
                                                  margin 7px 10px 0 0
                                                  float left
                                                  width 18px
                                                  height 18px
                                                  background url(/staticimg/toplist.png)
                                             .icn-hm
                                                  background-position 0 -80px
                                             .icn-msg
                                                  background-position -20px -120px
                                             .icn-st
                                                  background-position 0 -140px
                                             .icn-ex
                                                  background-position 0 -200px
                                             em
                                                  float left
                                                  width 100px
                                                  font-style normal
                              .arr
                                   background url(/staticimg/toplist.png) -20px 0
                                   position absolute
                                   margin-left -8px
                                   top -8px
                                   left 50%
                                   width 14px
                                   height 8px
               .input-box
                    width 158px
                    height 32px
                    margin 19px 50px 0px 12px
                    float right
                    border-radius 32px
                    background-color #fff
                    position relative
                    .search
                         display block
                         float left
                         width 15px
                         height 15px
                         margin 9px 0 0 10px
                         background url(/staticimg/topbar.png) -10px -108px
                    .input-text
                         width 128px
                         height 16px
                         margin 8px 0 0 30px
                         position relative
                         .seek
                              outline none
                              border none
                              width 115px
                              float left
                              height 16px
                              z-index 50
                         label
                              font-size 10px
                              color: #9b9b9b
                              position absolute
                              top: 0
                              left: 0
                              cursor text
               .team
                    text-align center
                    width 90px
                    height 32px
                    margin 19px 10px 0px 12px
                    font-size 12px
                    line-height 33px
                    padding 0 12px
                    color #ccc
                    border-radius 20px
                    border 1px solid #4F4F4F
                    text-decoration none
                    float right
</style>
