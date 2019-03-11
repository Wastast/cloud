<template>
<div class="HomeHead">
    <div class="userHead">
        <div class="userImg">
        <img :src="info.upic?'/api'+info.upic:'/staticimg/default_avatar.jpg'">        
        <div class="updateImg" v-if="info.uid == this.userInfo.uid">
            <router-link :to="'/user_setting/'+info.uid">更换头像</router-link>
        </div>
        </div>
        <div class="userDetails">
        <div class="f1">
            <h2>
            <span class="userName">{{info.uname}}</span>
            <i class="userSex-man" v-show="info.ugender == 'm' "></i>
            <i class="userSex-woman" v-show="info.ugender == 'w' "></i>
            <div class="updateMessage" v-if="info.uid == this.userInfo.uid">
                <router-link :to="'/user_setting/'+info.uid">
                <i>编辑个人资料</i>
                </router-link>
            </div>
            </h2>
        </div>
        <ul class="f2">
            <li class="f2First">
            <a href="javascript:;">
                <div class="dynamic_count">0</div>
                <span>动态</span>
            </a>
            </li>
            <li>
            <a href="javascript:;">
                <div class="follow_count">0</div>
                <span>关注</span>
            </a>
            </li>
            <li>
            <a href="javascript:;">
                <div class="fans_count">0</div>
                <span>粉丝</span>
            </a>
            </li>
        </ul>
        <div class="f3">
            <span class="userArea">所在地区：浙江省 - 杭州市</span>
            <span class="userAge">年龄：<span>{{userYear}}</span></span>
        </div>
        </div>
    </div>
</div>    
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: ['info'],
    data() {
        return {
            sex: 'm',
            userYear: ''
        }
    },
    watch: {
        userInfo: {    //监听方法，至少执行一次方法
            handler() {
                this.userInf()
            },
            immediate:true,
        }
    },
    computed: {
        ...mapState(['userInfo'])    //从vuex获取用户信息
    },
    methods:{
        userInf(){
            if(this.userInfo != null){
                this.sex = this.userInfo.ugender;  //获取用户性别
                var year=this.userInfo.ubirthday;  //获取用户生日，判断用户所属年代
                if(year!=null){
                    year=year.slice(0,4);
                }
                year=parseInt(year);
                if(year >= 2005){
                    this.userYear='05后';
                }else if(year >= 2000){
                    this.userYear='00后';
                }else if(year >= 1995){
                    this.userYear='95后';
                }else{
                    this.userYear='90后';
                };
            }
        },
    }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/userhome.styl';
    .userHead
        width 900px
        height 188px
        margin-bottom 43px
        .userImg
            width 180px
            height 180px
            padding 3px
            border 1px solid #d3d3d3
            margin-right 40px
            float left
            position relative
            &:hover .updateImg
                opacity 0.8
            img 
                width 180px
            .updateImg
                width 180px
                height 26px
                background-color #8e8e8e
                opacity 0
                transition 0.2s
                position absolute
                bottom 3px
                a
                    display block
                    width 180px
                    height 26px
                    line-height 26px
                    text-align center
                    color #fff
                &:hover
                    text-decoration-line underline
        .userDetails
            width 670px
            height 127px
            float left
            .f1
                width 100%
                height 39px
                padding-bottom 12px
                margin-bottom 10px
                border-bottom 1px solid #d3d3d3
                .userName
                    float left
                    font-size 22px
                    font-weight normal 
                    line-height 30px
                    margin-top 3px
                .userLeves
                    display inline-block
                    float left
                    height 19px
                    margin-left 10px
                    margin-top 8px
                    padding-left 29px
                    background url(/staticimg/icon2.png-2caf940b50f43fd0e2e6a630f564f1d8.png) -135px -190px
                    color #e03a24
                    font-size 14px
                    font-style italic
                    line-height 21px
                    i 
                        display inline-block
                        float right
                        padding-left 9px
                        height 19px
                        background url(/staticimg/icon2.png-2caf940b50f43fd0e2e6a630f564f1d8.png) -191px -190px 
                .userSex-man
                    display inline-block
                    width 20px
                    height 20px
                    margin-top 9px
                    margin-left 8px
                    background url(/staticimg/icon.png) -41px -57px
                .userSex-woman
                    display inline-block
                    width 20px
                    height 20px
                    margin-top 9px
                    margin-left 8px
                    background url(/staticimg/icon.png) -41px -27px
                .updateMessage
                    float right
                    width 112px
                    height 31px
                    margin-top 4px
                    a
                        color #333
                        i 
                            color #333
                            font-size 14px
                            font-weight normal
                            font-style normal
            .f2
                width 100%
                height 41px
                margin-bottom 15px
                color #666
                li
                    float left
                    padding 0 40px 0 20px
                    border-left 1px solid #ddd
                    a
                        color #666
                        cursor pointer
                        position relative
                        div
                            margin-top -4px
                            font-size 24px
                        span
                            display block
                            text-indent 2px
                .f2First
                    padding-left 0
                    border-left 0
            .f3
                width 100%
                height 21px
                margin-bottom 5px
                color #666
                .userArea
                    line-height 21px
                .userAge
                    margin-left 25px
            .f4
                width 100%
                height 22px
                margin-bottom 5px
                color #666
                span 
                    line-height 22px
                    float left
                ul
                    float left
                    li
                        margin-left 8px
                        height 22px
                        float left
                        .weibo
                            display block
                            width 20px
                            height 20px
                            background url(/staticimg/logo.png-e44b0939b969358877f1a8dff9b692d1.png) 0px 0px
                        .douban
                            display block
                            width 20px
                            height 20px
                            background url(/staticimg/logo.png-e44b0939b969358877f1a8dff9b692d1.png) -48px -25px
</style>