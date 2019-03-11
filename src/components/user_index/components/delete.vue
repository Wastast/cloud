<template>
<div class="deletebox" ref="deletebox" style="display:none;" @mousedown="move">
    <div class="title">
      <h3>提示</h3>
    </div>
    <div class="box-body">
      <div>
        <div class="log">
          <div class="log1">
            确定删除歌单？
          </div>
          <div class="log2">
            <a href="javascript:;" class="Btn newBtn" @click="del">
                <i>确&nbsp;&nbsp;定</i>
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
  inject:['reload'],
  props: ['gid'],
  data(){
    return{
      delGid: ''
    }
  },
  created(){
    this.bbtn();
  },
  computed: {
    ...mapState(['userInfo','userList'])
  },
  methods:{
    move (e) {
        if(e.target.className=='title') {
            // let op = e.target;    //获取目标元素
            let op = this.$refs.deletebox
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
      this.$refs.deletebox.style.cssText = 'display:none;'
    },
    del () {
      console.log(this.$route.params.gid)
      var arr = this.userInfo.enshgid.split(',')
      arr.forEach( (element,index) => {
        if(this.delGid == element) {
          arr.splice(index,1)
          return
        }
      });
      arr = arr.join(',')
      // 发送请求修改信息
      var url = `/api/user/updata?uid=${this.userInfo.uid}&enshgid=${arr}`
      this.axios.get(url).then((res) => {
        if(res.data.code > 0) {
          this.userInfo.enshgid = arr
          this.userList[this.userInfo.uid-1].enshgid = arr
          this.$refs.deletebox.style.cssText = 'display:none;'
          if(this.$route.params.gid == this.delGid) {
            this.$router.push({path:'/user_music/my'})
          }
          this.reload()
        }
      })
    },
    bbtn(){
      eventVue.$on("myBad",(message,i)=>{
        this.delGid = i
        if(this.$refs.deletebox) {
          this.$refs.deletebox.style.cssText = message
        }
      })
    },
    close () {
      this.$refs.deletebox.style.cssText = 'display:none;'
    }
  }
}
</script>

<style lang="stylus" scoped>
.deletebox
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
                color #333
                text-align center
                line-height 22px
                font-size 14px
                display block
            .log2
                margin-top 30px
                text-align center
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