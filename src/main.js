// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
import './assets/font_1059568_6ei08zoptx/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
/* eslint-disable no-new */
// 跳转页面回到页面顶部
// 使用导航守卫进行每个页面跳转完成后回到浏览器顶点
router.afterEach((to,from) => {
  window.scrollTo(0,0);
})
// router.beforeEach((to,from,next) => {
//   // console.log(from)
//   next()
// })
//评论时间转换
Vue.filter("dataFilter",function(val){
  var nowTime = new Date();
  var Time = parseInt((nowTime-new Date(val))/1000);
  var str = '';
  if(Time<60) {
    var sec = parseInt(Time%60)
    str = `${sec<=0?1:sec}秒前回复`
  }else if (Time < 60*60) {
    var minte = parseInt(Time%(60*60)/60)
    str = `${minte}分钟前回复`
  }else if (Time < 60*60*24){
    var hours = parseInt(Time/(60*60))
    str = `${hours}小时前回复`
  }else{
    var day = parseInt(Time/(60*60*24))
    str = `${day}天前回复`
  }
  return str
  // //8.1创建日期对象
  // var date=new Date(val);
  // //8.2获取  月 日 时  分 
  // var m=date.getMonth()+1;
  // var d=date.getDate();
  // var h=date.getHours();
  // var mi=date.getMinutes();
  // //8.3返回字符串---形式的日期
  // m<10&&(m="0"+m);
  // d<10&&(d="0"+d);
  // return `${m}月${d}日 ${h}时:${mi}分`;
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },  
  template: '<App/>'
})
