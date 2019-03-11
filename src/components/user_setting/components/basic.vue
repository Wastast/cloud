<template>
    <div class="userSetting" v-show="hidden==false">
        <div class="settingTitle">
            <h3>
                <span>个人设置</span>
            </h3>
        </div>
        <div class="settingBody">
            <div class="bodyForm">
                <div class="itm bodyForm1">
                    <label class="lab">昵称：</label>
                    <input type="text" class="u-txt" v-model="list.name" id="uname" maxlength="30">
                </div>
                <div class="itm bodyForm2">
                    <label class="lab">介绍：</label>
                    <div class="u-txtwrap">
                        <textarea class="txtwrap" v-model="list.udesc"></textarea>
                        <span class="zs-remain">300</span>
                    </div>
                </div>
                <div class="itm bodyForm3">
                    <label class="lab">性别：</label>
                    <el-radio-group v-model="list.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </div>
                <div class="itm bodyForm4">
                    <label class="lab">生日：</label>
                    <el-date-picker v-model="list.birthday" type="date" placeholder="选择日期"></el-date-picker>
                </div>
                <div class="itm bodyForm5">
                    <a class="btn" href="javascript:;" @click="onSubmit">
                        <i>保 存</i>
                    </a>
                    <a class="btn" href="javascript:;" @click="close">
                        <i>取 消</i>
                    </a>
                </div>
            </div>
            <div class="bodyAvatar">
                <img :src="'/api'+this.info.upic">
                <span class="btn-update"></span>
                <a href="javascript:;" class="upload" @click.prevent="updateImg()">更换头像</a>
            </div>
        </div>
    </div>
</template>

<script>
import eventVue from '../../../assets/js/eventVue.js'
import { mapMutations,mapState, mapGetters } from 'vuex'

export default {
    props: ['info'],
    data(){
        return{
            hidden:false,
            show:true,
            list:{
                name: '',
                udesc: '',
                sex: '',
                birthday: '',
            },
            previousB:'', 
        }
    },
    watch:{
        info: {    //监听方法，至少执行一次方法
            handler () {
                this.list.name = this.info.uname;
                this.list.udesc = this.info.udesc;
                if(this.info.ugender == 'm'){
                    this.list.sex = '男'
                }else{
                    this.list.sex = '女'
                };
                this.list.birthday = this.info.ubirthday;
            },
            immediate:true,
        }
    },

    computed: {
        ...mapState(['userInfo'])
    },
    created:function(){
        this.bbtn();
    }, 
    methods:{
        updateImg(){
            this.hidden=true;
            eventVue.$emit("myFun",this.show);
        },
        bbtn(){
            eventVue.$on("myBad",(message)=>{
                this.hidden=message
            })
        },
        onSubmit() {
            this.previousB = this.info.ubirthday;
            if(this.list.sex == '男'){
                this.list.sex = 'm'
            }else{
                this.list.sex = 'w'
            };
            if(this.list.birthday != this.previousB){
                this.list.birthday=this.list.birthday.toLocaleDateString();
            }
            this.changeUserInfo(this.list);
            var url=`/api/user/updata?uid=${this.info.uid}&uname=${this.list.name}&ugender=${this.list.sex}&udesc=${this.list.udesc}&ubirthday=${this.list.birthday}`;
            this.axios.get(url).then( result => {
                if(result.data.code == 1){
                    this.$router.push({path:`/user_home/${this.userInfo.uid}`})
                }
            })
        },
        close () { 
            this.$router.push({path:`/user_home/${this.userInfo.uid}`})
        },
        ...mapMutations(['changeUserInfo'])
    }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/userSetting.styl';
    .settingTitle
        height 40px
        &:after
            clear()
        h3
            float left
            font-size 24px
            font-weight normal
            color #333
    .settingBody
        margin-top 30px
        font-size 12px
        color #333
        &:after
            clear()
        .bodyForm
            float left
            width 340px
            margin-right 30px
            .itm
                position relative
                zoom 1
                min-height 32px
                margin-bottom 20px
                padding-left 38px
            .bodyForm1
                .lab
                    lab()
                .u-txt
                    width 292px
                    height 19px
                    margin 0
                    padding 5px 6px 6px
                    border 1px solid #cdcdcd
                    border-radius 2px
                    line-height 19px
            .bodyForm2
                &:after
                    clear()
                .lab
                    lab()
                .u-txtwrap
                    padding-right 14px
                    position relative
                    zoom 1
                    .txtwrap
                        height 122px
                        width 292px
                        margin-right -20px
                        padding 5px 6px 6px
                        border 1px solid #cdcdcd
                        border-radius 2px
                        line-height 19px
                        resize none
                    .zs-remain
                        position absolute
                        bottom 8px
                        right 10px
                        color #d0d0d0
            .bodyForm3
                line-height 32px
                &:after
                    clear()
                .lab
                    lab()
                .lab-check
                    .check
                        float left
                        margin 9px 20px 0 0
                        line-height 16px
            .bodyForm4
                z-index 11
                &:after
                    clear()
                .lab
                    lab()
            .bodyForm5
                margin-top 40px
                .btn
                    margin-right 20px
                    color #fff
                    background url(/staticimg/button2.png) right -428px
                    padding 0 5px 0 0
                    white-space nowrap
                    display inline-block
                    height 31px
                    overflow hidden
                    vertical-align top
                    text-align center
                    cursor pointer
                    i
                        width 40px
                        color #fff
                        background url(/staticimg/button2.png) 0 -387px
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
        .bodyAvatar
            float left
            width 140px
            height 140px
            position relative
            zoom 1
            &:after
                clear()
            img
                float left
                width 140px
                height 140px
            .btn-update
                background #8e8e8e
                opacity 0.8
                display block
                position absolute
                width 140px
                height 26px
                left 0
                bottom 0
            .upload
                color #fff
                text-align center
                line-height 26px
                display block
                position absolute
                width 140px
                height 26px
                left 0
                bottom 0
                cursor pointer
                &:hover
                    text-decoration underline
</style>