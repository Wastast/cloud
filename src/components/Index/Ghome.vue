<template>
  <div class="Gindex">
    <index-header> </index-header>
    <head-nav></head-nav>
    <g-section></g-section>
    <index-footer></index-footer>
  </div>
</template>
<script>
import HeadNav from './components/components/HeadNav'
import GSection from './components/Gsection'
import IndexFooter from './components/Footer'
import IndexHeader from '../pub/Header'
export default {
  name: "Gindex",
  data(){
    return{
    }
  },
  components: {
    HeadNav,
    IndexFooter,
    GSection,   
    IndexHeader
  },
}
</script>
<style lang="stylus">

</style>
