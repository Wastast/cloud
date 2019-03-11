import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    // 路由懒加载配置
    {path:'/',name:"Index",component:()=> import('../components/Index/Home.vue')},
    {path:'/gindex',name:"Gindex",component:()=> import('../components/Index/Ghome.vue')},
    {path:'/gather/:gid',props:true,name:'Gather',component:()=> import('../components/gather/Home')},
    {path:'/user_home/:uid',props:true,name:'MyHomepage',component:()=> import('../components/my-homepage/Home')},
    {path:'/user_music/:gid',props:true,name:'UserIndex',component:()=> import('../components/user_index/Home')},
    {path:'/user_setting/:uid',props:true,name:'UserSetting',component:()=> import('../components/user_setting/Home')},
    {path:'/friend',props:true,name:'Friend',component:()=> import('../components/friend/Friend.vue')},
    {path:'/my_playlist/:mid',props:true,name:'MyPlayList',component:()=> import('../components/my_playlist/PlayList')},
    {path:'/search/:keyword',props:true,component:()=> import('../components/search/components/search_bar.vue')},
    // {path:'/team',name:'Team',component:() => import('../components/Team/Home.vue')},
    // {path:'/music',name:'Music',component:()=> import('../components/Music/Home')}
  ],
})
