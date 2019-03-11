import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 用户登录盒子
    loginBox:'',
    // 全歌单列表数据
    gatherList: [],
    // 全部歌曲数据
    songList: [],
    audio: '',
    // 当前播放的歌曲
    play: '',
    playlist: [],
    // 用户信息
    userInfo: '',
    // 所用用户信息
    userList: '',
    //要收藏的歌曲
    collectsong:'',
    //我的音乐用户歌单
    usersonglist:[],
  },
  mutations: {
    // 清除播放列表数据
    clearList (state){
      state.playlist = []
    },
    // 当前用户退出后删除信息
    outLogin (state) {
      state.userInfo = ''
    },
    // 获取所有用户信息
    getUserList (state, data) {
      state.userList = data
    },
    // 登录盒子
    changeLogin (state, data) {
      state.loginBox = data
    },
    // 获取歌单列表
    getGatherList (state, data) {
      state.gatherList = data
    },
    // 获取歌曲列表
    getSongList (state, data) {
      state.songList = data
    },
    // 获取音频元素
    getAudio (state, data) {
      state.audio = data
    },
    // 获取当前播放歌曲
    getPlay (state, data) {
      state.play = data
    },
    // 获取播放列表
    getPlayList (state, data) {
      state.playlist = data
    },
    // 添加播放列表的歌曲
    addPlayList (state, data) {
      state.playlist.push(data)
    },
    // 删除播放列表数据
    deletePlayList (state, data) {
      var  i = 0;
      state.playlist.forEach((e,index) => {
        // 获取传入的mid值在当前播放列表的下标
        if(e.mid == data) {
          i = index
        }
      })
      // 删除当前下标的数据
      state.playlist.splice(i,1)
    },
    // 获取用户数据
    getUserInfo (state, data) {
      state.userInfo = data
    } ,
    // 获取用户要收藏的歌曲
    getCollectSong (state,data){
      state.collectsong = data
    },
    // 添加我的音乐播放列表的歌单
    getUserSongList (state,data){
      state.usersonglist = data
    },
    getUserOtherInfo (state, data) {
      state.userInfo = data
    },
    //修改用户信息后更新仓库信息
    changeUserInfo (state,data){
      state.userInfo.ugender = data.sex;
      state.userInfo.ubirthday = data.birthday;
      state.userInfo.uname = data.name;
      state.userInfo.udesc = data.udesc;
    }
  },
})