<template>
  <div class="foot">
    <div class="bfooter">
      <div class="copy">
        <p class="link">
          <a href="">关于网易</a>
          <span>|</span>
          <a href="">客户服务</a>
          <span>|</span>
          <a href="">服务条款</a>
          <span>|</span>
          <a href="">网站导航</a>
          <span>|</span>
          <a href="">意见反馈</a>
        <p class="fc">
          <span class="sep span">网易公司版权所有©1997-2019</span>
          <span class="span">杭州乐读科技有限公司运营：</span>
          <a href="">浙网文[2018]3506-263号</a>
        </p>
        <p class="fc">
          <span class="sep span">违法和不良信息举报电话：0571-89853516</span>
          <span class="span">举报邮箱：</span>
          <a href="">ncm5990@163.com</a>
        </p>
      </div>  
      <ul class="enter">
        <li class="unit">
          <a class="blogo num1" href="javascript:;"></a>
          <span class="tt">用户认证</span>
        </li>
        <li class="unit">
          <a class="blogo num2" href="javascript:;"></a>
          <span class="tt">独立音乐人</span>
        </li>
        <li class="unit">
          <a class="blogo num3" href="javascript:;"></a>
          <span class="tt">赞赏</span>
        </li>
        <li class="unit">
          <a class="blogo num4" href="javascript:;"></a>
          <span class="tt">视频奖励</span>
         
        </li>
      </ul>     
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  }
}
</script>
<style lang="stylus">
  .foot
    position relative
    height 150px
    overflow hidden
    border-top 1px solid #d3d3d3
    background #f2f2f2 
    width  1903px
    .bfooter 
      width: 980px
      height:91px
      margin 0 auto
      display:flex
      justify-content:space-between
      .copy
        
        width 520px
        padding-top 15px
        line-height 24px
        .link
          margin 0 0 0 0
          a   
            color #999
          span 
            margin 0 8px 0 10px
            color #c2c2c2
        .fc
          margin 0 0 0 0
          .span
            color #666 
          .sep
            margin-right 14px
          a 
            color #666
      .enter
        width 330px
        height:70px
        margin-top 21px
        display:flex
        justify-content:space-between
        .unit
          
          margin-left 0px
          text-align center
          color #666
          width 60px
          height 70px
          .blogo
            display:inline-block
            width 50px
            height 45px
            margin 0 auto 
          .num1
            background url(/staticimg/foot_enter_new.png) no-repeat -63px -101px
            background-size 110px 450px
          .num2
            background:url(/staticimg/foot_enter_new.png) no-repeat 0 0
            background-size 110px 450px
          .num3
            background:url(/staticimg/foot_enter_new.png)  no-repeat -60px -50px 
            background-size 110px 450px
          .num4
            background:url(/staticimg/foot_enter_new.png) no-repeat 0 -101px
            background-size 110px 450px
          .tt
            display:inline-block
            width:52px
            height:14px
            margin:5px 5px 0
            font-size:12px
           
</style>
