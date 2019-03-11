<template>
<div class="createbox" ref="createbox" style="display:none;" @mousedown="move">
    <div class="title">
      <h3>新建歌单</h3>
    </div>
    <div class="box-body">
      <div>
        <div class="log">
          <div class="log1">
              歌单名：<input type="text" class="music" autocomplete="off" v-model="gatherName">
          </div>
          <div class="log2">
            可通过“收藏”将音乐添加到新歌单中
          </div>
          <div class="log3">
            <a href="javascript:;" class="Btn newBtn" @click="create">
                <i>新&nbsp;&nbsp;建</i>
            </a>
            <a href="javascript:;" class="Btn cancelBtn" @click="close">
                <i>取&nbsp;&nbsp;消</i>
            </a>
          </div>
        </div>
      </div>
    </div> 
    <span class="close" title="关闭窗口" @click="none"></span>
</div>
</template>

<script>
import eventVue from '../../../assets/js/eventVue.js'
import {mapState} from 'vuex';
export default {
  data(){
    return{
      gatherName:''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created(){
    this.bbtn();
  },
  methods:{
    move (e) {
      if(e.target.className=='title') {
        // let op = e.target;    //获取目标元素
        let op = this.$refs.createbox
        //算出鼠标相对元素的位置
        let disX = e.clientX - op.offsetLeft;
        let disY = e.clientY - op.offsetTop;
        document.onmousemove = (e)=>{    //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;  
          let top = e.clientY - disY;
          //绑定元素位置到positionX和positionY上面
          this.positionX = top;
          this.positionY = left;
          //移动当前元素
          op.style.left = left + 'px';
          op.style.top = top + 'px';
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    },
    none () {
      this.$refs.createbox.style.cssText = 'display:none;'
    },
    bbtn(){
      eventVue.$on("myFun",(message)=>{
          this.$refs.createbox.style.cssText = message
      })
    },
    close () {
      this.$refs.createbox.style.cssText = 'display:none;'
    },
    create () {
      console.log(this.gatherName)
      var url = `/api/music/createGather?gname=${this.gatherName}&gimgurl=img/2002210674180197.jpg&uid=${this.userInfo.uid}&uname=${this.userInfo.uname}`
      this.axios.get(url).then((res) => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.createbox
    width 480px
    position absolute
    top 147px
    left 676px
    z-index 9998
    border-radius 4px
    box-shadow 0 5px 16px rgba(0,0,0,0.8)
    background #fff
    .title
        height 38px
        padding 0 45px 0 18px
        font-weight bold
        color #fff
        line-height 38px
        background #2d2d2d
        border-bottom 1px solid #191919
        border-radius 4px 4px 0 0
        position relative
        z-index 10
        cursor move
        h3
            font-size 14px
            float left
    .box-body
        width 478px
        border 1px solid #878787
        border-width 0 1px 1px
        border-radius 0 0 4px 4px
        overflow-y auto
        overflow-x hidden
        .log
            padding 40px 0
            margin-left 30px
            text-align left
            font-size 12px
            color #333
            &:after
                clear both
                content ''
                display block
                height 0
                visibility hidden
            .log1
                .music
                    vertical-align middle
                    width 330px
                    height 19px
                    margin 0
                    padding 5px 6px 6px
                    border 1px solid #cdcdcd
                    border-radius 2px
                    line-height 19px
                    outline none
            .log2
                margin 28px 0 20px 48px
                color #999
                text-align left
            .log3
                margin-left 48px
                text-align left
                .Btn
                    color #fff
                    padding 0 5px 0 0
                    display inline-block
                    height 31px
                    line-height 31px
                    overflow hidden
                    vertical-align top
                    text-align center
                    cursor pointer
                    background url(/staticimg/button2.png)
                    i
                        width 40px
                        color #fff
                        padding 0 15px 0 20px
                        display inline-block
                        height 31px
                        line-height 31px
                        overflow hidden
                        vertical-align top
                        text-align center
                        cursor pointer
                        font-style normal
                        background url(/staticimg/button2.png)
                .newBtn
                    background-position right -428px
                    &:hover
                        background-position right -510px
                    &:hover i
                        background-position 0 -469px
                    i
                        background-position 0 -387px
                        color #fff
                .cancelBtn
                    margin-left 20px
                    background-position right -100px
                    &:hover
                        background-position right -182px
                    &:hover i
                        background-position 0 -141px
                    i
                        background-position 0 -59px
                        color #333
    .close
        position absolute
        z-index 20
        top 16px
        right 20px
        width 10px
        height 10px
        line-height 10px
        overflow hidden
        cursor pointer
        background url(/staticimg/layer.png)
        background-position 0 -95px
        color #fff
</style>