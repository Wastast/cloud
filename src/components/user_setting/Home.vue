<template>
    <div class="setting">
        <index-header> </index-header>
        <div class="main">
            <div class="header"></div>
            <div class="mainBody">
                <user-basic :info="this.userInfo"></user-basic>
                <user-avatar :info="this.userInfo" @avent="change" :img="img" :uid="uid" @clear="clearImg"></user-avatar>
            </div>
        </div>
    </div>
</template>

<script>
import UserBasic from './components/basic'
import UserAvatar from './components/avatar'
import IndexHeader from '../pub/Header'
import {mapState} from 'vuex'

export default {
    props:['uid'],
    name:'UserSetting',
    data(){
        return{
            img: ''
        }
    },
    components:{
        UserBasic,
        UserAvatar,
        IndexHeader
    },
    methods: {
        change (e) {
            // 用formData方式来传输文件
            let formData = new FormData();
            formData.append('file',e);
            let config = {
                // 设置头部信息允许数据传输
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
            this.axios.post('/api/user/image', formData, config).then((res)=>{
                this.img = res.data
            })
        },
        clearImg () {
            this.img = ''
        }
    },
    computed: {
        ...mapState(['userInfo'])    //从vuex获取用户信息
    },
}
</script>

<style lang="stylus" scoped>
    .main
        width 100%
        height 100%
        background-color #f5f5f5
    .header
        height 5px
        background-color #C20C0C
    .mainBody
        width 900px
        height 100%
        min-height 980px
        background-color #fff
        border 1px solid #d3d3d3
        margin 0 auto
        padding 40px
</style>