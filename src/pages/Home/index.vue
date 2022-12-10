<template>
  <div class="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :floor="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from './ListContainer/index.vue'
import TodayRecommend from './TodayRecommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
export default {
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch('floorList')
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style>

</style>