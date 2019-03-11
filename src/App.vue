<template>
  <div id="app">
    <!-- <keep-alive>  -->
      <router-view v-if="isRouterAlive"/>
    <!-- </keep-alive> -->
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexFooter from './components/pub/Footer'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive:true
    }
  },
  components: {
    IndexFooter,
  },
  methods: {
    getsong () {
      var url = '/api/music/allmusic';
      this.axios.get(url).then((res) => {
        this.getSongList(res.data.data)
      })
    },
    getuser () {
      var url=`/api/user/userinfo?uid=${localStorage.uid}`;
      this.axios.get(url).then( result => {
        this.getUserInfo(result.data.data[0]);
      });
    },
    getGather () {
        var url = '/api/music/gather'
        this.axios.get(url).then((res)=>{
          this.getGatherList(res.data.data)
        })
    },
    getUserlist () {
      var url = '/api/user/alluser'
      this.axios.get(url).then((res) => {
        this.getUserList(res.data.data)
      })
    },
    getuserOther () {
      var url=`/api/user/userinfo?uid=${sessionStorage.uid}`;
      this.axios.get(url).then( result => {
          if(result.data.code ==1){
            this.getUserOtherInfo(result.data.data[0]);
          }
      });
    },
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    ...mapMutations(['getSongList','getUserInfo','getGatherList','getUserList','getUserOtherInfo'])
  },
  created () {
    this.getsong()
    this.getGather()
    if(localStorage.uid) {
      this.getuser()
    }else{
      this.getuserOther()
    }
    this.getUserlist()
  }
}
</script>

<style>
body{
  margin:0;
  padding:0;
  font-size: 12px;
  color: #333;
  background-color: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
}
body,ul,li,a,h1,h2,h3,h4,h5,h6,p,input,
textarea,table,tr,td,th{
  margin:0;
  padding:0;
}
a {
  text-decoration: none
}
ul {
  list-style: none;
}
</style>
