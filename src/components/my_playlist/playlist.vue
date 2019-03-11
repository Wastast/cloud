<template>
<div>
    <index-header></index-header>
    <head-nav> </head-nav>
    <div class="g-bd4">
        <div class="g-mn4">
            <div class="g-mn4c">
                <div class="g-wrap6">
                    <div class="m-lycifo">
                        <div class="f-cb">
                            <div class="cvrwrap ">
                                <div class="u-cover">
                                    <img :src="'/api'+a.mimgurl" alt="" class="j-img">
                                    <span class="msk"></span>
                                </div>
                            <!-- cd图 -->
                            </div>
                            <div class="cnt">
                                <div class="hd">
                                    <i class="lab"></i>
                                    <div class="tit">
                                        <em class="f-ff2" :title="a.mname">{{a.mname}}</em>
                                    </div>
                                </div>
                                <p class="des">歌手:
                                    <span :title="a.msinger">
                                    <a href="javascript:;" class="s-fc7">{{a.msinger}}</a>
                                    </span>
                                </p>
                                <p class="des">所属专辑：
                                    <a href="javascript:;" class="s-fc7" :title="a.mname">{{a.mname}}</a>
                                </p>
                                <div class="m-info">
                                    <div class="btns">
                                        <a href="javacript:;" class="u-btn-addplay">
                                            <i @click="cPlay(a)">
                                                <em class="ply"></em>
                                                <span>播放</span>
                                            </i>
                                            <a href="javacript:;" class="u-btn-add" @click="aPlay(a)"></a>
                                        </a>
                                    </div>
                                </div>
                                <!-- 按钮 -->
                                <div class="bd"  >
                                    <!-- <p>asdasdasd</p> -->
                                    <p v-for="(item, i) of list" :key="i">
                                        {{item}}
                                    </p>
                                    <div class="f-hide" v-show="isShow==true">
                                        <p v-for="(item, w) of listTwo" :key="w">
                                            {{item}}
                                        </p>
                                    </div>

                                    <div class="crl">
                                        <a href="javascript:;" class="s-fc7" @click="totalShow()">
                                        {{boxText}}
                                        </a>    
                                        <i class="u-icn"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lrc-user">
                            <p>
                                <a href="#" class="s-fc3" >报错</a>
                            </p>
                        </div>
                    </div>   
                    <div class="n-cmt">
                        <div class="u-title">
                            <h3>
                                <span class="f-ff2">评论</span>
                            </h3>
                            <span class="s-fc3">共{{comments.length}}条评论</span>
                        </div>
                        <div class="m-cmmt">
                            <div class="iptarea">
                                <div class="head">
                                    <img :src="uInfo.upic?'/api'+uInfo.upic:'/staticimg/default_avatar.jpg'" width="50px" height="50px">
                                </div>
                                <div class="j-flag">
                                    <div class="f-pr">
                                        <div class="u-txtwrap">
                                            <textarea cols="30" rows="10" class="u-txt" placeholder="评论" v-model="text"></textarea>
                                        </div>
                                        <div class="corr">
                                            <em class="arrline">◆</em>
                                            <span class="arrclr">◆</span>
                                        </div>
                                        <div class="gh">
                                            <!-- <i class="j-flag"></i>
                                            <i class="u-icn-41"></i> -->
                                            <a href="javascript:;" class="u-btn-1" @click="getText">评论</a>
                                            <span class="zs">140</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cmmts">
                                <h3 class="u-hd4">精彩评论</h3>
                                <div v-for="(item, i) of comments" :key="item.cid">
                                    <div class="itm" >
                                        <div class="head">
                                            <a href="#" class="fgq">
                                                <img :src="'/api'+item.upic" alt="">
                                            </a>
                                        </div>
                                        <div class="cntwrap">
                                            <div class="cnt">
                                                <a href="#" class="s-fc7">{{item.uname}}</a>
                                                {{item.ccontent}}
                                            </div>
                                            <div class="rp">
                                                <div class="time">
                                                    {{item.ctime|dataFilter}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="m-quk" :ref="i" style="display:none;">
                                            <div class="iner" >
                                                <div class="corr">
                                                    <em class="arrline">
                                                        ◆
                                                    </em>
                                                    <span class="arrclr">
                                                        ◆
                                                    </span>
                                                </div>
                                                <div class="f-cb f-pr">
                                                    <div class="u-txtwrap">
                                                        <textarea name="" id="" cols="30" rows="10" class="u-txt"></textarea>
                                                    </div>
                                                    <div class="btns-1">
                                                        <a href="javascript:;" class="u-btn-33">回复</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="g-sd4">
            <div class="g-wrap7">
                <adasd :gather="gather"></adasd>
            </div>
        </div>

    </div>
    <a href="#" class="m-back" title="回到顶部"></a>
    <div>
        <dadaa></dadaa>
    </div>
</div>
</template>
<script>
import adasd from './components/left'
import dadaa from './components/right' 
import IndexHeader from '../pub/Header'
import HeadNav from '../Index/components/components/HeadNav'
import { mapState,mapMutations } from 'vuex'

export default {
    data(){
        return{
            isShow:false,
            boxText: '展开',
            list:[],
            itShow:false,
            a:'',
            listTwo:[],
            gather: [],
            uInfo: [],
            comments: [],
            text: ''
        }   
    },
    computed: {
        ...mapState(['playlist','userList','userInfo','play','songList','gatherList'])
    },
    methods:{
        cPlay (item) {
            console.log(item)
            this.$store.state.audio.src = '/api'+item.mpath
            this.getPlay(item)
            this.$store.state.audio.play()
            var bool = false
            if(this.playlist){
                this.playlist.forEach((e) => {
                if(e.mid == item.mid) {
                    console.log(1)
                    bool = true
                    return
                }
                })
            }
            if(!bool){
                this.addPlayList(item)
            }
        },
        aPlay (item) {
            console.log(item)
            var bool = false
            if(this.playlist){ 
            this.playlist.forEach((e) => {
                if(e.mid == item.mid) {
                bool = true
                alert('已经存在该歌曲，无法添加')
                return
                }
            })
            }
            if(!bool){
                this.addPlayList(item)
            }
        },
        totalShow(){    
            if(this.isShow==false){      
                this.isShow=true
                this.boxText = '收起'    
            }else{   
                this.isShow=false
                this.boxText = '展开 '
            }
        },
        getText () {
            // 判断用户是否登录
            if(this.userInfo) {
                // 判断评论内容是否为空
                if(this.text!=''){
                    var user = this.userInfo
                    var url = `/api/comment/addcomment?upic=${user.upic}&uid=${user.uid}&uname=${user.uname}&ccontent=${this.text}`
                    this.axios.get(url).then((res)=>{
                        this.comments = res.data.data
                    })
                    this.text = ''
                    return
                }
                this.$alert('内容不能为空', {
                    confirmButtonText: '确定',
                });
                return
            }
            this.$alert('您还未登录，请登陆后操作', {
                confirmButtonText: '确定',
            });
        },
        replyshow(index){
            if(this.$refs[index][0].style.display=='none') {
                this.$refs[index][0].style.cssText = 'display:block';
            }else{
                this.$refs[index][0].style.cssText = 'display:none';
            }
        },
        geci (obj) {
            var arr = obj.mlyric.split(',')
            var i = 0;
            for(var key of arr) {
                i++;
                if(i<=13){
                    this.list.push(key)
                }else{
                    this.listTwo.push(key)
                }
            }
        },
        gatherlist (mid) {
            var arr = []
            var i = 0
            this.gatherList.forEach(e => {
                var a = e.mid.split(',')
                if(i > 2) {
                    this.gather = arr
                    return
                }
                for(var key of a) {
                    if(key == mid) {
                        arr.push(e)
                        i++
                        break;
                    }
                }
            })
        },
        ...mapMutations(['getPlay','getPlayList','addPlayList','getCollectSong'])
    },
    components:{
        adasd,
        dadaa,
        IndexHeader,
        HeadNav
    },
    created () {
        var url = '/api/comment/count'
        this.axios.get(url).then((res)=>{
            this.comments = res.data.data
        })
    },
    mounted () {
        this.uInfo = this.userInfo
        // 通过路由传参获取歌曲数据，且与vuex中的歌曲数据进行对应
        for(var key in this.songList) {
            if(this.songList[key].mid == this.$route.params.mid){
                this.a = this.songList[key]
                this.geci(this.songList[key])
                break;
            }
        }
        this.gatherlist(this.$route.params.mid)
    }
 }

</script>

<style lang="stylus" scoped>
    div
        display block
    template
        font-size 12px
        color #333
        font-family Arial Helvetica sans-serif
    em
        font-style normal
    .g-bd4
        background url(/staticimg/wrap4.png)
        width 980px
        min-height 100%
        margin 0 auto 
        border-right 1px solid #d3d3d3
        border-width 0 1px
        &:after
            clear both
            content ""
            display block
        .g-mn4
            float left
            width 100%
            margin-right -270px
            .g-mn4c
                margin-right 271px
                .g-wrap6
                    padding 47px 30px 40px 39px 
                    .m-lycifo
                        margin-top -10px
                        .f-cb
                            overflow hidden
                            .cvrwrap
                                float left
                                width 206px
                                margin-right -226px
                                position relative
                                zoom 1
                                &:after
                                    out()
                                .u-cover
                                    width 198px
                                    height 198px
                                    position relative
                                    display block
                                    float left
                                    .j-img
                                        width 130px
                                        height 130px
                                        margin 34px
                                        border 0
                                    .msk
                                        width 206px
                                        height 205px
                                        top -4px
                                        left -4px
                                        background url(/staticimg/coverall.png)
                                        background-position -140px -580px
                                        position absolute
                               
                            .cnt
                                float right
                                width 414px
                                .lab
                                    float left
                                    width 54px
                                    height 24px
                                    background url(/staticimg/icon.png) no-repeat 0 9999px
                                    background-position 0 -463px
                                .tit
                                    margin-left 64px
                                    position relative
                                    top -6px
                                    font-size 24px
                                    .f-ff2
                                        margin-left 7px
                                        vertical-align middle
                                        font-family  Arial Helvetica sans-serif
                                        font-style normal 
                                .des
                                    margin 10px 0
                                    color #999
                                    span
                                        color #333
                                        .s-fc7
                                            color #0c73c2
                                            &:hover
                                                text-decoration underline
                                .des
                                    margin 10px 0
                                    color #999
                                    .s-fc7
                                        color #0c73c2
                                        &:hover
                                            text-decoration underline
                                .m-info
                                    width 414px
                                    height 31px
                                    margin-bottom 25px
                                    .btns
                                        height: 31px;
                                        margin-bottom: 25px;
                                        width:473px;
                                        display:flex;
                                        justify-content:space-between;
                                        .u-btn-addplay
                                            display: inline-block;
                                            width: 107px;
                                            height: 31px;
                                            vertical-align: top;
                                            text-align: center;
                                            color: #fff;
                                
                                            padding: 0 5px 0 0;
                                            i   
                                                display: inline-block;
                                                height: 31px;
                                                width: 46px;
                                                padding: 0 7px 0 8px;
                                                color: #fff;
                                                text-align: center;
                                                background: url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -469px;
                                                .ply
                                                    display: inline-block;
                                                    width: 18px;
                                                    height: 20px;
                                                    float: left;
                                                    margin: 6px 2px 2px 0;
                                                    vertical-align: middle;
                                                    background: url(/staticimg/iconall.png-0a65b1494f7f0140992c57396b09dff1.png) 0 0;
                                                span
                                                    display: inline-block;
                                                    width: 26px;
                                                    height: 31px; 
                                                    line-height: 31px;
                                                    text-align: center;
                                                    float: right;
                                                    font-style: normal;
                                                    font-size:12px;  
                                            i:hover
                                                background:url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) 0 -551px;  
                            
                                            .u-btn-add
                                                margin-left: -5px;
                                                margin-bottom: 1px;
                                                background:url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) -40px -1587px;
                                            .u-btn-add:hover
                                                background:url(/staticimg/button2.png-5392965d14c229cb7ed0a5fcb00d095f.png) -80px -1587px;
                                        .u-btn-add,.u-btn-fav
                                            display: inline-block;
                                            width: 31px;
                                            height: 31px;
                                            margin-right: 6px;
                                            padding-right: 5px;
                                            background:#afa;
                                .bd
                                    // height auto
                                    height 327px
                                    width   100%
                                    line-height 23px
                                    // .f-hide
                                    //     display :none !important
                                    .crl
                                        margin-top 5px;
                                        width 210px
                                        height 23px
                                        
                                        .s-fc7
                                            color #0c73c2
                                            float left
                                            &:hover
                                                text-decoration underline
                                        .u-icn
                                            width 11px
                                            height 8px
                                            background url(/staticimg/icon.png) no-repeat -65px -520px
                                            display block
                                            float left
                                            margin 7px 0
                        .lrc-user
                            text-align right 
                            margin-top 48px
                            line-height 30px
                            .s-fc3
                                color #999
                                text-decoration underline
                    .n-cmt
                        margin-top 40px
                        .u-title
                            border-bottom 2px solid #c20c2c 
                            height 33px
                            h3
                                .f-ff2
                                    font-size 20px
                                    line-height 28px  
                                    font-family "Microsoft Yahei", Arial,   Helvetica, sans-serif
                                    font-weight 400 
                                    float left                      
                            .s-fc3
                                float left  
                                margin 9px 0 0 20px
                                color #666
                        .m-cmmt
                            margin-top 20px
                            .iptarea
                                margin-bottom 20px
                                .head
                                    float left
                                    width 50px
                                    height 50px
                                    margin-right -100px
                                .j-flag
                                    .f-pr  
                                        position relative
                                        zoom 1
                                        margin-left 62px
                                        .u-txtwrap
                                            padding-right 14px
                                            .u-txt
                                                display block
                                                height 50px
                                                width 100%
                                                margin-right -20px
                                                padding 5px 6px 6px
                                                outline none 
                                                border 1px solid #cdcdcd
                                                border-radius 2px
                                                overflow auto 
                                                resize none
                                    .corr
                                        position absolute 
                                        top 11px
                                        left -7px
                                        width 13px
                                        height 14px
                                        overflow hidden
                                        .arrline
                                            color #cdcdcd
                                            display block
                                            font-family 'SimSun'
                                            font-size 15px
                                            font-style normal 
                                            font-weight normal
                                            height 10px
                                            ling-height normal
                                        .arrclr
                                            margin -10px 0 0 1px
                                            color #fff
                                            display block
                                            font-family 'SimSun'
                                            font-size 15px
                                            font-style normal 
                                            font-weight normal
                                            height 10px
                                            ling-height normal
                                    .gh
                                        padding-top 10px
                                        clear both  
                                        position relative
                                        zomm 1 
                                        .j-flag
                                            float left
                                            margin 0 10px 0 0
                                            cursor pointer
                                            width 18px
                                            height 18px 
                                            background url(/staticimg/icon.png) no-repeat -40px -490px
                                        .u-icn-41
                                            float left
                                            margin 0 10px 0 0
                                            cursor pointer
                                            width 18px
                                            height 18px 
                                            background url(/staticimg/icon.png) no-repeat -60px -490px
                                        .u-btn-1
                                            float right
                                            width 46px
                                            height 25px
                                            color #fff
                                            text-align center
                                            line-height 25px
                                            display inline-block
                                            background url(/staticimg/button.png) no-repeat -84px -64px
                                        .zs
                                            color #999
                                            float right 
                                            margin-right 10px
                                            line-height 25px
                            .cmmts
                                margin-top 40px
                                .u-hd4
                                    position relative
                                    top 1px
                                    height 20px
                                    border-bottom 1px solid #cfcfcf
                                .itm
                                    padding 15px
                                    border-top 1px dotted #ccc
                                    overflow hidden
                                    .head
                                        float left
                                        width 50px
                                        height 50px
                                        margin-right -100px
                                        img
                                            width 50px
                                            height 50px
                                        .fgq
                                            img
                                                vertical-align middle
                                                float left
                                                width 50px
                                                height 50px
                                                margin-right -100px
                                    .cntwrap
                                        margin-left 60px
                                        .cnt
                                            .s-fc7
                                                margin-right 5px
                                                color #0c73c2   
                                        .rp
                                            margin-top 15px
                                            text-align right
                                            .time
                                                float left
                                                margin 0 !important
                                                color #999
                                            .zaad
                                                text-decoration none 
                                                color #333
                                                float right 
                                                .zan
                                                    margin-right 5px
                                                    vertical-align -2px
                                                    
                                                    width 15px
                                                    height 14px
                                                    background url(/staticimg/icon2.png) no-repeat -150px 0
                                                    display block
                                                    float left
                                                    overflow hidden
                                            .sep
                                                text-align right
                                                margin 0 8px
                                                color #ccc
                                                float right
                                            .s-fc3
                                                float right
                                                color #666
                                                margin-top -1px
                                .m-quk
                                    margin-bottom 15px
                                    margin-left 60px
                                    border 1px solid #d9d9d9
                                    border-radius 2px
                                    position relative
                                    zoom 1
                                    margin-top 15px
                                    height 80px;
                                    .iner
                                        
                                        padding 15px
                                        background #f8f8f8
                                        border 1px solid #fcfcfc
                                        border-radius 2px
                                        .corr
                                            position absolute
                                            right 5px
                                            
                                            top -8px
                                            width 35px
                                            height 14px
                                            overflow hidden
                                            .arrline
                                                color #ccc
                                                display block
                                                font-family "SimSun"
                                                font-size 15px 
                                                font-style normal
                                                font-weight normal
                                                height 10px
                                                line-height normal
                                            .arrclr
                                                display block
                                                font-family "SimSun"
                                                font-size 15px 
                                                font-style normal
                                                font-weight normal
                                                height 10px
                                                line-height normal
                                                margin -9px 0 0
                                                text-align left
                                                color #fff
                                        .f-pr
                                            position relative
                                            zomm 1
                                            .u-txtwrap
                                                padding-right 14px
                                                .u-txt
                                                    height 20px
                                                    width 100%
                                                    display block
                                                    margin-right -20px
                                                    resize none
                                                    font-size 12px
                                            .btns-1
                                                clear both
                                                padding-top 10px
                                                position relative
                                                zoom 1
                                                .u-btn-33
                                                    float right
                                                    width 46px
                                                    height 25px
                                                    background url(/staticimg/button.png) no-repeat -84px -64px
                                                    color #fff
                                                    text-align center
                                                    line-height 25px
                                                    display inline block
                                                

        .g-sd4
            position relative
            float right
            width 270px
            zoom 1
    .m-back     
      background url(/staticimg/sprite.png)no-repeat -265px -47px 
      display block
      position fixed
      text-indent -9999px
      left 50%
      margin-left 500px
      bottom 160px
      width 49px
      height 44px

                                  

</style>
