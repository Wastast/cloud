<template>
  <div class="card-head">
      <a href="javascript:;" class="tilte">新碟上架</a>
      <span class="more">
          <a href="javascript:;" class="more-a">更多</a>
          <!-- <img src="" alt=""> -->
      </span>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  .card-head
    height 33px
    padding 0 10px 0 34px
    border-bottom 2px solid #C10D0C
    .tilte 
        float left
        font-size 20px
        line-height 28px
        color #000
    .tabs
        float left
        margin 7px 0 0 20px
        .tab-a
            color #666
        .tab-span
            color #ccc
            margin 0 10px
    .more
        float right
        margin-top 7px
        .more-a 
            color #666
</style>
