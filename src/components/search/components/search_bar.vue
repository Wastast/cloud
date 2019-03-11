<template>
    <div class="app-search">
        <index-header></index-header>
        <div class="m-subnav"></div>
        <div class="g-bd">
            <div class="g-wrap">
                <div class="pgsrch" keyDown="clickKey">
                    <input type="text" class="srch" v-model="text" ref="input">
                    <a class="btn" title="搜索" href="javascript:;" @click="handleShow"></a>
                    <div class="j-flag" v-if="searchShow==true">
                        <div class="m-schlist">
                            <p class="note">
                                <a class="xtag" href="javascript:;">搜"{{spanText}}"相关歌曲</a>
                            </p>
                            <div class="rap">
                                <div class="item">
                                    <h3 class="hd">
                                        <i class="icn"></i>
                                        <em class="f-f1">歌曲</em>
                                    </h3>
                                    <ul class="f-cb">
                                        <li v-for="item of list" :key="item.mid">
                                            <a class="xtag" href="javascripg:;">{{item.mname}}---{{item.msinger}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-search">
                    <div class="snote">
                        搜索
                        <span id="text">"{{spanText}}"</span>
                        找到
                        <em>{{list.length}}</em>
                        首歌曲
                    </div>
                    <div class="u-container">
                        <table class="table-rank">
                            <thead>
                                <tr>
                                    <th class="w1"></th>
                                    <th>
                                        <div class="wp">标题</div>
                                    </th>
                                    <th class="w2">
                                        <div>时长</div>
                                    </th>
                                    <th class="w3">
                                        <div>歌手</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody ref="tbody">
                                <tr class="even" v-for="(item,i) of list" :key="item.mid">
                                    <td>
                                        <div class="hd">
                                            <span class="num">{{i+1}}</span>
                                            <div class="rk">
                                                <span class="u-icn"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="rank">
                                        <div class="f-cb">
                                            <a href="javascript:;">
                                                <img class="rpic" :src="'/api'+item.mimgurl">
                                            </a>
                                            <span class="ply" @click="getsid(item)">&nbsp;</span>
                                            <span class="txt">
                                                <a href="javascript:;">
                                                    <b :title="item.mname">{{item.mname}}</b>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                    <td class="s-fc3" >
                                        <span class="u-dur">{{item.mtime}}</span>
                                        <div class="show">
                                            <a href="javascript:;" title="添加到播放列表" class="icn-add"></a>
                                            <a href="javascript:;" title="收藏" class="icn-fav"></a>
                                            <a href="javascript:;" title="分享" class="icn-share"></a>
                                            <a href="javascript:;" title="下载" class="icn-dl"></a>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="javascripg:;" :title="item.msinger">{{item.msinger}}</a>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="tableShow==true">
                                <tr>
                                    <td>很抱歉，查找不到相关歌曲</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <a title="回到顶部" class="m-back" v-if="hidefocus==true" href="#">Top</a>
        <div class="g-ft">
            <div class="m-ft">
                <div class="copy">
                    <p class="link">
                        <a href="javascripg:;" target="_blank" class="item s-fc4">关于网易</a>
                        <span class="line">|</span>
                        <a href="javascripg:;" target="_blank" class="item s-fc4">客户服务</a>
                        <span class="line">|</span>
                        <a href="javascripg:;" target="_blank" class="item s-fc4">服务条款</a>
                        <span class="line">|</span>
                        <a href="javascripg:;" target="_blank" class="item s-fc4">网站导航</a>
                        <span class="line">|</span>
                        <a href="javascripg:;" target="_blank" class="item s-fc4">意见反馈</a>
                        
                    </p>
                    <p class="right">
                        <span class="sep span">网易公司版权所有©1997-2019</span>
                        <span class="span">杭州乐读科技有限公司运营：</span>
                        <a href="javascript:;" target="_blank" class="alink s-fc3">浙网文[2018]3506-263号</a>
                    </p>
                    <p class="contact">
                        <span class="sep span">违法和不良信息举报电话：0571-89853516</span>
                        <span class="span">举报邮箱：</span>
                        <a class="alink" href="javascript:;">ncm5990@163.com</a>
                    </p>
                </div>
                <ul class="enter">
                    <li class="unit">
                        <a class="logo num1" href="javacript:;"></a>
                        <span>用户认证</span>
                    </li>
                    <li class="unit">
                        <a class="logo num2" href="javacript:;"></a>
                        <span>独立音乐人</span>
                    </li>
                    <li class="unit">
                        <a class="logo num3" href="javacript:;"></a>
                        <span>赞赏</span>
                    </li>
                    <li class="unit">
                        <a class="logo num4" href="javacript:;"></a>
                        <span>视频奖励</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import IndexHeader from '../../pub/Header'
import {mapState,mapMutations} from 'vuex';
export default {
    props: ['keyword'],
    data(){
        return {
            //top的初始值
            hidefocus: false,
            //下拉搜索框的初始值
            searchShow: false,
            //输入框的初始值
            // keyword
            text: "",
            spanText:"",
            list: [],
            //tfoot的初始值
            tableShow: false
        } 
    },
    computed: {
        ...mapState(['play','playlist'])
    },
    //监听输入框的值的变化
    watch: {
        text () {
            this.handleShow()
        }
    },
    components: {
        IndexHeader
    },
    methods: {
        // 歌曲播放事件
        getsid (item) {
            this.$store.state.audio.src = '/api'+item.mpath
            this.getPlay(item)
            this.$store.state.audio.play()
            var bool = false
            this.playlist.forEach((e) => {
                if(e.mid == item.mid) {
                bool = true
                return
                }
            })
            if(!bool){
                this.addPlayList(item)
            }
        },
        //滚轮事件
        handleScroll(){
            var scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //console.log(scrollTop);
            //如果滚轮到浏览器界面的距离大于100
            if(scrollTop > 100){
                //就让top框显示
                this.hidefocus=true;
            }else{
                this.hidefocus=false;
            }
        },
        
        mouted(){
            //监听滚轮到浏览器界面的距离
            window.addEventListener("scroll",this.handleScroll);
        },
        //下拉搜索框显示隐藏
        handleShow(){
            //如果输入内容不为空
            if(this.text!==""){
                //让下拉搜索框显示
                this.searchShow = true;
                this.tableShow = false;
                //只匹配搜索框输入的汉字
                var value = this.text
                if(value != null){
                    var val="";
                    for(var i=0;i<value.length;i++){
                        //把遍历结果组成新的字符串
                        val+=value[i];                        
                    }
                    this.spanText = val;
                    var url="api/music/allmusic";
                    this.axios.get(url).then(result=>{
                        result=result.data.data;
                        this.list = [];
                        for(var item of result){
                            var i=item.mname.indexOf(val);
                            if(i!=-1){
                                this.tableShow = false;
                                this.list.push(item);
                            }                           
                        }
                    });
                }else{
                    this.tableShow = true;
                    this.searchShow = false;
                    this.tableShow = true;
                }              
            }else if(this.text==""){
                this.spanText="";
                this.tableShow = false;
                this.searchShow = false;
                this.getList();
            }
            document.onclick = () => {
                this.searchShow = false
            }
        },
        getList(){
            var url = "api/music/allmusic";
            this.axios.get(url).then(result=>{
                this.list = result.data.data;
            });
        },
        clickKey(){
            if(event.keyCode ==13){
                this.handleShow();
            }
        },
        ...mapMutations(['getPlay','addPlayList'])
    },
    created(){
        this.mouted();
        this.getList();
        if(this.keyword!='all'){
            this.text = this.keyword
        }
    }
}
</script>
<style lang="stylus" scoped>
    .app-search
        background-color: #f5f5f5;
        min-height: 890px;
        .m-subnav
            height: 5px;
            z-index: 90;
            background-color: #c00014;
        .g-bd
            width: 980px;
            min-height: 700px;
            margin: 0 auto;
            background-color: #fff;
            border: 1px solid #d3d3d3;
            border-width: 0 1px;
            .g-wrap
                padding: 40px;
                .pgsrch
                    width: 420px;
                    height: 40px;
                    margin: 0 auto;
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    .srch
                        width: 368px;
                        height: 36px;
                        border: 1px solid #cecece;
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                        box-shadow: 0 1px 9px #ccc inset;
                        padding-left: 12px;
                        outline none
                    .btn
                        display: inline-block;
                        width: 53px;
                        height: 40px;
                        background: url(/staticimg/sprite.png) -370px 0;
                    .btn:hover
                        background: url(/staticimg/sprite.png) -429px 0; 
                    .j-flag
                        width: 418px;
                        position: absolute;
                        left: 0;
                        top: 43px;
                        z-index: 120;
                        box-sizing: border-box;
                        border: 1px solid #bebebe;
                        border-radius: 4px;
                        background: #fff;
                        box-shadow: 0 4px 7px #555;
                        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
                        .m-schlist
                            .note
                                height: 17px;
                                padding: 11px 10px;
                                border-bottom: 1px solid #e2e2e2;
                                color: #666;
                                margin: 0;
                                .xtag
                                    color: #666;
                            .rap
                                .item
                                    position: relative;
                                    .hd
                                        width: 52px;
                                        height: 25px;
                                        margin: 0;
                                        padding: 10px 0 0 10px;
                                        line-height: 17px;
                                        font-weight: normal;
                                        float: left;
                                        
                                        .icn
                                            display: inline-block;
                                            width: 14px;
                                            height: 15px;
                                            float: left;
                                            margin: 2px 4px 0 0;
                                            vertical-align: middle;
                                            background: url(/static/img/icon.png) -35px -300px;
                                        .f-f1
                                            font-style: normal;
                                            text-align: left;
                                            float: left;
                                    
                                    .f-cb
                                        margin-top: -1px;
                                        padding: 6px 0 5px;
                                        float: left;
                                        
                                        li
                                            height: 25px;
                                            border-left: 1px solid #e2e2e2;
                                            a
                                                color: #666;
                                                display: inline-block;
                                                margin-left: 10px;
                                .item:after
                                    display: block;
                                    content: "";
                                    clear: both;
                .m-search
                    width: 900px;
                    margin: 0 auto;
                    .snote
                        margin: 28px 0 17px;
                        color: #999;
                        font-size: 12px;
                        em
                            font-style: normal;
                    .u-container
                        .table-rank
                            width: 100%;
                            border: 1px solid #d9d9d9;
                            border-collapse: collapse;
                            border-spacing: 0;
                            position: relative;
                            th
                                height: 38px;
                                background-color: #f7f7f7;
                                vertical-align: top;
                                text-align: left;
                                font-weight: normal;
                                color: #666;
                            thead
                                display: table-header-group;
                                vertical-align: middle;
                                tr
                                    display: table-row;
                                    th
                                        padding:0;
                                        border: 1px solid #ccc
                                    th.w1
                                        width: 77px;
                                    th:nth-child(2)
                                        width:407px;
                                        div.wp
                                            width: 387px;
                                            height: 18px;
                                            line-height: 18px;
                                            padding: 8px 10px;
                                                
                                    .w2
                                        width: 91px;
                                        div
                                            width: 71px;
                                            height: 18px;
                                            line-height: 18px;
                                            padding: 8px 10px;
                                                        
                                    .w3
                                        width:14%;
                                        div
                                            width: 73px;
                                            height: 18px;
                                            line-height: 18px;
                                            padding: 8px 10px;
                            tbody
                                border: 0;
                                text-align: center;
                                tr.even
                                    width: 669px;
                                    height: 70px;
                                    td
                                        width:57px;
                                        height:58px;
                                        padding: 6px 10px;
                                        line-height: 18px;
                                        text-align: left;
                                        background-color: #f7f7f7;                                        
                                        .hd
                                            width: 57px;
                                            height: 18px;
                                        .num
                                            display: inline-block;
                                            width: 25px;
                                            height: 18px;
                                            margin-left: 0;
                                            float: left;
                                            text-align: center;
                                            color: #999;
                                        .rk
                                            float: right;
                                            width: 32px;
                                            text-align: center;
                                            .u-icn
                                                padding-left: 16px;
                                                line-height: 17px;
                                                font-size: 10px;
                                                background:url(/static/img/icon.png-new.png) no-repeat;
                                                background-position: 0px 0px;
                                                vertical-align: middle;
                                    td.rank
                                        padding-top: 10px;
                                        padding-bottom: 10px;
                                        .f-cb
                                            a
                                                .rpic
                                                    width: 50px;
                                                    height: 50px;
                                                    margin-right: 14px;
                                                    border: 0;
                                                    vertical-align: middle
                                            .ply
                                                margin-top: 17px;
                                                margin-right: 8px;
                                                display: inline-block;
                                                width: 20px;
                                                height: 17px;
                                                background:url(/static/img/iconall.png) 0 -88px;
                                            .ply:hover
                                                background:url(/static/img/iconall.png) 0 -113px;
                                                cursor: pointer;    
                                            .txt
                                                margin-top: 16px;
                                                margin-right: 20px;
                                                display: inline-block;
                                                height: 18px;
                                                a
                                                    b
                                                        color: #333;
                                    td.s-fc3
                                        position: relative;
                                        div.show
                                            position: absolute;
                                            top: 30px;
                                            left: 5px;
                                            display: none;
                                            background: #fff;
                                            a
                                                display: inline-block;
                                                width: 15px;
                                                height:16px;
                                            a.icn-add
                                                background: url(/static/img/icon.png) 0 -700px; 
                                            a.icn-add:hover
                                                background: url(/static/img/icon.png) -22px  -700px; 
                                            a.icn-fav
                                                background:url(/static/img/icon.png) -45px -87px;
                                            a.icn-fav:hover
                                                background:url(/static/img/icon.png) -45px -110px;
                                            a.icn-share
                                                background:url(/static/img/icon.png) -46px -137px;
                                            a.icn-share:hover
                                                background:url(/static/img/icon.png) -46px -160px;
                                            a.icn-dl
                                                background:url(/static/img/table.png) -83px -174px;
                                            a.icn-dl:hover
                                                background:url(/static/img/table.png) -106px -174px;
                                    td:last-child
                                        a
                                            color: #333
                                tr.even:nth-child(2n)
                                    td
                                        background: #fff;    
                                tr.even:hover
                                    td.s-fc3
                                        div.show
                                            display: block;
                            tfoot
                                position: absolute;
                                top: 40px;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: #fff;
                                tr
                                    td
                                        text-align: center;
                                        font-size: 20px;
                                        line-height: 100px;
    .m-back
        display: block;
        position: fixed;
        right: 160px;
        bottom: 160px;
        width: 49px;
        height: 44px;
        color: #333;
        border: 1px solid #d3d3d3;
        text-align: center;
        line-height: 54px;
        background: url(/static/img/icon3.png-top.png) no-repeat 50% 20%;
    .g-ft
        height: 148px;
        position: relative;
        border-top: 1px solid #d3d3d3;
        background: #f2f2f2;
        .m-ft
            width: 980px;
            height: 100%;
            margin: 0 auto;
            position: relative;
            .copy
                width: 520px;
                padding-top: 15px;
                line-height: 24px;
                position: absolute;
                top: 0px;
                left: 0px;
                .link
                    .s-fc4
                        color: #999;
                    .line
                        margin 0 8px 0 10px;
                        color: #c2c2c2;
                .right,.contact
                    .sep,.span,.s-fc3,.alink
                        color: #666;
            .enter
                width: 330px;
                margin-top: 21px;
                position: absolute;
                top: 0px;
                right: 0px;
                display: flex;
                justify-content: space-between;
                .unit
                    width: 60px;
                    height: 70px;
                    text-align: center;
                    color: #666;
                    .logo
                        bakcground-position: -63px -101px;
                        display:block;
                        margin-bottom: 5px;
                        width: 50px;
                        height: 45px;
                    .num1
                        background:url(/static/img/foot_enter_new.num1.png);
                    .num2
                        background:url(/static/img/foot_enter_new.num2.png);
                    .num3
                        background:url(/static/img/foot_enter_new.num3.png);
                    .num4
                        background:url(/static/img/foot_enter_new.num4.png);       
</style>