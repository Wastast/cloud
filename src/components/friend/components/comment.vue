<template>
<div class="doper">
  <div class="doper-main">
    <a href="javascript:;" class="like">
      <i class="icn like-icn"></i>
      <span class="">(10759)</span>
    </a>
    <span class="sep"></span>
    <a href="javascript:;" class="comment">
      评论
      <span>(447)</span>
    </a>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.doper
  margin 18px 0 -2px
  text-align right
  line-height normal
  .like 
    display inline-block
    .like-icn
      display block
      float left
      width 14px
      height 14px
      margin -1px 3px 0 0
      background url(/staticimg/frd_dyn_sprite.png) 0px -20px no-repeat
    .like-icn-2
      background-position  -20px -20px
  .like span,
  .comment
    color #0c73c2
</style>
