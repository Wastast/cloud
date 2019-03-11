<template>
  <div class="index">
    <div class="index-lunbo">
      <div class="block">
        <ul>
          <li :class="'tran'+(c)" v-for="(item,c) in list" ref="lunbo" :key="item.id">
            <a href="javascript:;" >
              <img :src="list[c].img" @click="img(c)">
            </a>
          </li>
        </ul>
        <!-- <a href="javascript:;" class="left-button" @click="move(1)"></a>
        <a href="javascript:;" class="right-button" @click="move(-1)"></a> -->
        <div class="bottom-button">
          <a href="javascript:;" v-for="(item,w) in list" ref="button" :key=item.id @click="img(w)" ></a>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  props: ['imglist'],
  data () {
     return {
       list:[
        {id:1,img:"/staticimg/lvieoHeIo1Gz0MZ_bzqgg==_109951163889780726.jpg"},
        {id:2,img:"/staticimg/oUxwWIUJX7pSVwYqfZnPYA==_109951163888694185.jpg"},
        {id:3,img:"/staticimg/zNudfAtE75k4rYmGtdKjdA==_109951163889887287.jpg"},
        {id:4,img:"/staticimg/CXp6Jytc090VsTqIaNrzXQ==_109951163910749382.png"},
        {id:5,img:"/staticimg/109951163888743570.jpg"}
      ],
      index:5,
      s:0
    }
  },
  methods:{
    get () {
      this.$refs.button[2].className = 'btn'
    },
    move (i) {
      var c_l = null
      this.$refs.lunbo.forEach((item,index)=>{
        if(item.classList[0] == 'tran2') {
          index-=i;
          if(index>4){
            index=0
          }
          if(index<0){
            index=4
          }
          this.a(index)
        }
        c_l = parseInt(item.classList[0].slice(4))
        c_l += i
        if(c_l<0){
          c_l =4
        }
        if(c_l>4) {
          c_l = 0
        }
        item.className = 'tran'+c_l
      });
    },
    img (index) {
      this.a(index)
      if(index<2){
        this.b(index)
      }
      if(index>2){
        this.c(index)
      }
      if(index==2){
        this.d(index)
      }
      
    },
    b(s){
      if(s==0){
        s=2
      }
      for(var i=0;i<this.$refs.lunbo.length;i++){
          if((s+4)==6){
            if((s+i)==5){
            this.$refs.lunbo[i].className='tran'+(i+s-5)
            }else if((s+i)==6){
              this.$refs.lunbo[i].className='tran'+(i+s-5)
            }else{
              this.$refs.lunbo[i].className='tran'+(i+s)
            }
          
        }
         if((s+4)==5){
          if((s+i)==5){
            this.$refs.lunbo[i].className='tran'+(i+s-5)
          }
          else
          this.$refs.lunbo[i].className='tran'+(i+s)
        }
     }
    },
    c(s){
      s=2-s
      for(var i=0;i<this.$refs.lunbo.length;i++){
        if(s==-1){
          if((s+i)==-1){
            this.$refs.lunbo[i].className='tran'+(i+s+5)
          }else
        this.$refs.lunbo[i].className='tran'+(i+s)
        }
        if(s==-2){
          if((s+i)==-2){
              this.$refs.lunbo[i].className='tran'+(i+s+5)
          }else if((s+i)==-1){
          this.$refs.lunbo[i].className='tran'+(i+s+5)
        }else
        this.$refs.lunbo[i].className='tran'+(i+s)
        }
      }
    },
    d(s){
      for(var i=0;i<this.$refs.lunbo.length;i++){
        this.$refs.lunbo[i].className='tran'+i
      }
    },
    a (s) {
      for(var key of this.$refs.button) {
        key.className = ''
      }
      this.$refs.button[s].className = 'btn'
    }
  },
  mounted(){
    this.get()
  },
  components: {
      
  },
}
</script>

<style lang="stylus">
  .index  
    .index-lunbo
      position relative
      height 336px 
      overflow hidden
      background-color black
      .block
        position: absolute;
        width 980px;
        height: 336px;
        top: 0;
        left: 41%;
        margin-left: -198px;
        li 
          position absolute
          top 0
          left 0
          height 336px
          transition all 0.3s ease
        // .lunbo1 
        //   transform translate3d(-245px,0,0) scale(0.81)
        //   transform-origin: 0 50%
        //   opacity 0.4
        //   z-index 1
        //   &:nth-child(2)
        //     transform translate3d(-125px,0,0) scale(0.81)
        //     opacity 0.8
        //     z-index 2
        //   &:nth-child(3)
        //     transform translate3d(0,0,0) scale(1)
        //     opacity 1
        //     z-index 3
        //   &:nth-child(4)
        //     transform translate3d(325px,0,0) scale(0.81)
        //     opacity 0.8
        //     z-index 2
        //   &:nth-child(5)
        //     transform translate3d(425px,0,0) scale(0.81)
        //     opacity 0.4
        //     z-index 1
          // 3D转换
          .tran0
            transform translate3d(-325px,0,0) scale(0.81)
            transform-origin: 0 50%
            opacity 0.4
            z-index 1
          .tran1
            transform translate3d(-257px,0,0) scale(0.81)
            opacity 0.8
            z-index 2
          .tran2
            transform translate3d(0,0,0) scale(1)
            opacity 1
            z-index 3
          .tran3
            transform translate3d(257px,0,0) scale(0.81)
            opacity 0.8
            z-index 2
          .tran4
            transform translate3d(425px,0,0) scale(0.81)
            opacity 0.4
            z-index 1
          a 
            img
              width 760px
              height 100%
              display: inline-block;  
        .right-button
          background url(/staticimg/leftright.png) -6px -508px no-repeat
          display inline-block
          position absolute 
          left 87%
          top 40%
          width 37px
          height 63px
          z-index 111
          &:hover
            background url(/staticimg/leftright.png) -6px -578px no-repeat
        .left-button
          position absolute
          display block  
          left -13%
          top 40%
          width 37px
          height 63px
          background url(/staticimg/leftright.png) -6px -360px no-repeat    
          z-index 10   
          &:hover
            background url(/staticimg/leftright.png) -6px -430px no-repeat      
        .bottom-button
          position absolute
          top: 310px
          left: -130px
          width: 100%
          height: 20px
          text-align: center
          z-index 10
          .on 
            background-color #a40011
          .btn
            background-color: rgba(255,255,255,0.4)
          a   
            display inline-block
            width 25px
            height 3px
            background-color rgba(0,0,0,0.4)
            margin-right 10px
            &:hover
              background-color rgba(255,255,255,0.4)
</style>
