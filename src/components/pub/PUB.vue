<template>
  <div>
    <!-- href="http://127.0.0.1:5421/img/109951163278154172.jpg" download="filename" -->
    <!-- <a @click="ite">下载歌曲</a> -->
    <a href="/staticaudio/HITA - 眉间雪.mp3" download="">asdasd</a>
  </div> 
</template>

<script>
import Lyric from 'lyric-parser'
// import vuescroll from 'vuescroll'
export default {
  data () {
    return {
      lyc: []
    }
  },
  methods : {
    // ite () {
    //   console.log(111)
    //   let aTag = document.createElement('a')
    //   aTag.download = 'http://127.0.0.1:5421/img/109951163278154172.jpg'
    //   aTag.href = URL.createObjectURL(blob)
    //   aTag.click()
    //   URL.revokeObjectURL(aTag.href)
    // }
  },
  mounted () {
    // ite () {
      // var elemIF = document.createElement("iframe");
      // elemIF.src = "http://127.0.0.1:5421/img/109951163278154172.jpg"
      // elemIF.style.display = "none";
      // console.log(elemIF)
      // document.body.appendChild(elemIF);
      // window.open('http://127.0.0.1:5421/img/109951163278154172.jpg')
    // }
  }
}
</script>

<style>

</style>
