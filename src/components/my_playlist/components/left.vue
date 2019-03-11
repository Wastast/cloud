<template>
  <div>
    <div class="rightbar">
      <div class="like">
        <h3>包含这首歌的歌单</h3>
        <ul class="user-list">
          <li class="item" v-for="item of gather" :key="item.gid">
            <router-link tag="img" :to="/gather/+item.gid" :src="'/api'+item.gimgurl" :title="item.gname" > </router-link>
            <p class="f-thide">
                <router-link :title="item.gname" :to="/gather/+item.gid" class="sname">{{item.gname}}</router-link>
            </p>
            <p class="by">
                <router-link :to="'/user_home/'+item.uid"  :title="item.uname" class="njj">by&emsp;{{item.uname}}</router-link>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['gather'],
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
          width: 200px;
          height: 50px;
          float left
          img
            width: 50px;
            height: 50px;
            float left
            margin 0 1px
            cursor pointer
          .f-thide
            width 140px
            overflow hidden 
            text-overflow ellipsis
            white-space nowrap
            word-wrap normal
            margin 2px 60px
            .sname
              color #333   
              font-size 14px
              &:hover
                color #000
                text-decoration underline
          .by 
            float left
            color #999 
            margin 2px 5px   
            .njj
              display inline-block
              color #666
              width 100px
              margin 7px 2px 0 4px 
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
              &:hover
                text-decoration underline
            .u-icn
                background url(/staticimg/icon.png) no-repeat -65px -840px
                width 12px
                height 21px
                display block
                float right
                          
                  
           
      .g-list
        margin-bottom 25px
        height 200px
        li
         margin-top 10px
         .txt
           float left       
           width 156px
           line-height 16px 
           
           a
             color #333
             &:hover
              text-decoration underline 
           .dx
            color #999
            float left 
        .opr
          float left
          position relative
          top -30px
          line-height 32px
          width 36px
          height 11px
          margin-top 15px
          .play
            background url("/staticimg/icon2.png") no-repeat 
            background-position -69px -455px
            float left
            width 10px
            height 11px
            opacity 0.9
            overflow hidden
          .add
            background url("/staticimg/icon2.png") no-repeat -87px -454px 
            margin-right 10px
            float right 
            width 10px
            height 11px
            opacity 0.9
      

</style> 

