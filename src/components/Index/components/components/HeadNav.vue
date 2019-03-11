<template>
<div class="index">
  <div class="index-nav">
    <div class="nav">
      <ul class="navList">
        <li><router-link to="/">推荐</router-link></li>
        <!-- <li><router-link to="/rank">排行榜</router-link></li> -->
        <li><router-link to="/gindex">歌单</router-link></li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'HeadNav',
  data(){
    return{
      routeName: ''
    }
  },
  methods:{
  },
  mounted () {
    this.routeName = this.$route.name
  }
}
</script>
<style lang="stylus">
.index
  .index-nav
    background-color #C20C0C
    height 34px
    border-bottom 1px solid #a40011
    .nav
      width 1100px
      height 34px
      margin 0 auto
      .navList
        float left
        padding-left 180px
        li 
          float left                       
          height 34px
          text-align center
          line-height 34px
          a 
            color #fff
            width 84px
            height 34px 
            padding 4px 13px
            margin 7px 15px 0
            &:hover
              background-color rgba(0,0,0,0.2)
              border-radius 20px
          // .pn 
          //   background-color rgba(0,0,0,0.2)
          //   border-radius 20px
          .router-link-exact-active
            background-color rgba(0,0,0,0.2)
            border-radius 20px
</style>
