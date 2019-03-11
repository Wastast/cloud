<template>
  <div class="fixed">
    <div class="msgbox"
    ref="msgbox"
    @mousedown="move"
    style="display:none;"
    >
      <div class="title">
        <h3>添加到歌单</h3>
        <i @click="none"></i>
      </div>
      <div class="box-body">
        <ul class="gather-list">
          <li class="item" v-for="item of iditem" :key="item.gid" @click="addsong(item)">
            <div class="img-box">
              <img :src="'/api'+item.gimgurl">
            </div>
            <div class="info">
              <h4>{{item.gname}}</h4>
              <p>{{item.mid.split(',').length}}首</p>
            </div>
          </li>
        </ul>
      </div> 
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import eventVue from '../../../assets/js/eventVue.js'
export default {
  name:'MsgBox',
  data(){
    return{
      uid:3,
      idlist:[],
      iditem:[],
      collcet:[],
      nowSong:[]
    }
  },
  computed: {
    ...mapState(['userList','userInfo','gatherList','collectsong'])
  },
  methods: {
    move (e) {
      if(e.target.className == 'title') {
        let op = this.$refs.msgbox
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
    addsong(data){
      var arr = data.mid.split(',')
      var mid = this.nowSong.mid
      var bool = false
      arr.forEach(element => {
        if(element == mid) {
          bool = true;
        }
      });
      if(bool) {
        alert('已收藏')
      }else{
        arr.push(mid)
        data.mid = arr.join(',')
        var url = `/api/music/tabGather?mid=${arr.join(',')}&gid=${data.gid}`
        this.axios.get(url).then((res) => {
          if(res.data.code ==1) {
          }
        }) 
      }
    },
    none () {
      this.$refs.msgbox.style.cssText = 'display:none;'
    },
    collc() {
      eventVue.$on("coll",(item)=>{
        this.nowSong = item
        if(this.userInfo.creategid) {
          var arr = this.userInfo.creategid.split(',')
          var list = []
          arr.forEach((e,index)=> {
            list.push(this.gatherList[e-1])
          })
          this.iditem = list
        }
      });
    },
    ...mapMutations(['getUserList','getUserInfo','getGatherList','getCollectSong',])
  },
  mounted (){
    this.collc()
  }
}
</script>

<style lang="stylus" scoped>
  .fixed
    .msgbox
      background-color red
      width 480px
      height 414px
      position absolute
      top: 147px;
      left: 676px;
      z-index 999
      border-radius: 4px;
      box-shadow: 0 5px 16px rgba(0,0,0,0.8);
      background: #fff;
    .title
      height 39px
      padding 0 45px 0 18px
      font-weight: bold;
      color: #fff;
      line-height 38px
      background: #2d2d2d;
      border-radius: 3px 3px 0 0;
      position relative
      cursor move
      h3
        font-size 14px
        float left
      i 
        position absolute
        top: 15px
        right: 17px
        cursor pointer
        float right
        display inline-block
        width 10px
        height 10px
        background url(/staticimg/layer.png) 0 -95px
    .box-body
      height 375px
      overflow-y: auto;
      overflow-x: hidden;
      .top1
        padding: 10px 0 10px 35px;
        background: #e6e6e6;
        cursor: pointer;
        i
          display inline-block
          width: 35px;
          height: 36px;
          background url(/staticimg/icon.png) 0 -495px
          vertical-align: middle;
          margin-right: 10px
      .gather-list
        .item
          padding: 7px 0 7px 35px;
          cursor: pointer;
          border-bottom: 1px solid #e0e0e0;
          overflow hidden
          &:hover
            background: #f2f2f2;
          .img-box
            float left
            width 40px
            height 40px
            img
              width 40px
              height 40px
          .info
            margin-left: 10px
            float left
            width 350px
            height 40px
            h4
              color: #000;
              font-weight normal
              margin-bottom 10px     
</style>