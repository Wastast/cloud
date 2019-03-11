<template>
    <div class="Tindex">
        <index-header></index-header>
        <head-nav> </head-nav>
        <index-head :imglist="img"></index-head>
        <index-section :list="list" :song="song"></index-section>
        <index-footer></index-footer>
    </div>
</template>
<script>
import IndexHead from './components/Head'
import IndexSection from './components/Section'
import HeadNav from './components/components/HeadNav'
import IndexFooter from './components/Footer'
import IndexHeader from '../pub/Header'
import {mapMutations,mapState} from 'vuex'
export default {
    name: "Index",
    data () {
       return{
           list:[],
           img: [],
           song: [],
       }
    },
    components: {
        IndexHead,
        IndexSection,
        IndexFooter,
        HeadNav,   
        IndexHeader 
    },
    watch: {
        gatherList () {
            this.list = this.gatherList
        },
        songList () {
            this.get()
        }
    },
    computed: {
        ...mapState(['gatherList','songList','userInfo'])
    },
    methods: {
        get () {
            if(this.songList.length>0) {
                var i = 0;
                var arr = [];
                for(var key of this.songList) {
                    if(i>14) {
                        this.song = arr
                        return
                    }
                    arr.push(key)
                    i++;
                }
            }
        }
    },
    mounted () {
        this.get()
        // console.log(this.userInfo)
    }
}
</script>
<style lang="stylus">

</style>