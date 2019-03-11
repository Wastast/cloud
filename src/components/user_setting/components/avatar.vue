<template>
    <div class="userAvatar" v-show="show==true">
        <div class="settingTitle">
            <a href="javascript:;" class="s-fc7" @click="basic()">个人设置</a>
            <span class="s-fc4">></span>
            <span class="f-fw1">更换头像</span>
        </div>
        <div class="settingBody">
            <div class="hd">
                <a href="javascript:;" class="ztag">
                    <i>
                        上传头像
                    </i>
                    <input type="file" @change="getFile($event)">
                </a>
                <span class="tip">支持jpg、png、bmp格式的图片</span>
            </div>
            <div class="bd">
                <div class="left">
                    <div class="img-ztag1">
                        <img src="/staticimg/default_cover.png" class="dft-ztag1">
                    </div>
                </div>
                <div class="right">
                    <p class="right-ztag1">头像预览</p>
                    <div class="img-ztag2">
                        <img :src="this.img?'/api'+this.img:'/api'+this.info.upic" class="dft-ztag2">
                    </div>
                    <p class="right-ztag2">大尺寸头像（180x180像素）</p>
                    <div class="img-ztag3">
                        <img :src="this.img?'/api'+this.img:'/api'+this.info.upic" class="dft-ztag3">
                    </div>
                    <p class="right-ztag3">小尺寸头像（40x40像素）</p>
                </div>
            </div>
            <div class="ft">
                <a href="javascript:;" class="ft2" @click="changeimg">
                    <i>保 存</i>
                </a>
                <a href="javascript:;" class="ft2" @click="basic()">
                    <i>取 消</i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import eventVue from '../../../assets/js/eventVue.js'
import {mapState} from 'vuex'
export default {
    props: ['info','img','uid'],
    data(){
        return{
            show:false,
            hidden:false,
            list:[],
        }
    },
    computed: {
        ...mapState(['userInfo','userList'])
    },
    created:function(){
        this.bbtn();
    },
    methods:{
        bbtn(){
            eventVue.$on("myFun",(message)=>{
                this.show=message
            })
        },
        basic(){
            this.show=false;
            this.$emit('clear')
            eventVue.$emit("myBad",this.hidden)
        },
        getFile (e) {
            let file = event.target.files[0]
            this.$emit('avent',file)
        },
        changeimg () { 
            // 修改vuex里的数据
            this.userInfo.upic = this.img
            this.userList[this.uid-1].upic = this.img
            var url = `/api/user/avent?upic=${this.img}&uid=${this.info.uid}`
            this.axios.get(url).then( (res) => {
                if(res.data.code == 1) {
                    this.$router.push({path:`/user_home/${this.uid}`})
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/userSetting.styl';
    .settingTitle
        height 27px
        border-bottom 1px solid #cbcbcb
        font-weight bold
        font-family simsun
        font-size 14px
        color #333
        &:after
            clear()
        .s-fc7
            color #0c73c2
            cursor pointer
        .s-fc4
            margin 0 6px 0 8px
            color #999
    .settingBody
        font-size 12px
        color #333
        &:after
            clear()
        .hd
            padding 26px 0 30px 0
            position relative
            &:after
                clear()
            .ztag
                color #333
                background url(/staticimg/button2.png) right -100px
                padding 0 5px 0 0
                white-space nowrap
                display inline-block
                height 31px
                line-height 31px
                overflow hidden
                vertical-align top
                text-align center
                cursor pointer
                i
                    width 55px
                    color #333
                    background url(/staticimg/button2.png) 0 -59px
                    padding 0 15px 0 20px
                    pointer-events none
                    display inline-block
                    height 31px
                    line-height 31px
                    overflow hidden
                    vertical-align top
                    text-align center
                    cursor pointer
                    font-style normal 
                input 
                    z-index 999
                    width 95px
                    height 31px
                    display inline-block
                    position absolute
                    top: 24px  
                    left: 0
                    opacity 0
                    cursor pointer
                    outline none 
            .tip1
                display inline-block
                margin 7px 0 0 10px
                color #999
        .bd
            &:after
                clear()
            .left
                float left
                padding-right 40px
                border-right 1px solid #e2e2e2
                .img-ztag1
                    width 322px
                    height 322px
                    border 1px solid #d1d1d1
                    position relative
                    zoom 1
                    .dfz-ztag1
                        width auto
                        height auto
                        position absolute
                        border 0
            .right
                float left
                padding-left 40px
                .img-ztag2
                    width 180px
                    height 180px
                    overflow hidden
                    margin 20px 0 11px 0
                    border 1px solid #ccc
                    position relative
                    zoom 1
                    .dft-ztag2
                        width 100%
                        height 100%
                .right-ztag2
                    color #999
                .img-ztag3
                    width 40px
                    height 40px
                    overflow hidden
                    margin 20px 0 11px 0
                    border 1px solid #ccc
                    position relative
                    zoom 1
                    .dft-ztag3
                        width 100%
                        height 100%
                .right-ztag3
                    color #999
        .ft
            margin-top 40px
            &:after
                clear()
            .ft1
                margin-right 20px
                color #bebebe
                background url(/staticimg/button2.png) right -346px
                padding 0 5px 0 0
                white-space nowrap
                display inline-block
                height 31px
                line-height 31px
                overflow hidden
                vertical-align top
                text-align center
                cursor default
                i
                    width 40px
                    color #bebebe
                    background url(/staticimg/button2.png) 0 -305px
                    padding 0 15px 0 20px
                    pointer-events none
                    font-style normal
                    display inline-block
                    height 31px
                    line-height 31px
                    overflow hidden
                    vertical-align top
                    text-align center
                    font-size inherit
                    white-space nowrap
            .ft2
                margin-right 20px
                color #333
                background url(/staticimg/button2.png) right -100px
                padding 0 5px 0 0
                white-space nowrap
                display inline-block
                height 31px
                line-height  31px
                vertical-align top
                text-align center
                cursor pointer
                i
                    color #333
                    width 40px
                    background url(/staticimg/button2.png) 0 -59px
                    padding 0 15px 0 20px
                    pointer-events none
                    font-style normal
                    display inline-block
                    height 31px
                    line-height 31px
                    overflow hidden
                    vertical-align top
                    text-align center
                    font-size inherit
                    white-space nowrap
</style>