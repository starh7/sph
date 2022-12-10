<template>
<div class="app">
  <Header></Header>
<router-view></router-view>
<Footer v-show="this.$route.meta.show"></Footer>
</div>
  
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components:{
    Header,
    Footer
  },
  mounted(){
    // 优化，在app.vue中只发一次请求
    this.$store.dispatch("catagoryList");
  }

}
</script>

<style>

</style>