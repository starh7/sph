<template>
  <div class="spec-preview">
    <img :src="imgList.imgUrl" />
    <div class="event" @mousemove="move" ref="event"></div>
    <div class="big" >
      <img :src="imgList.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed:{
      imgList(){
        return this.skuImageList[this.currentIndex]||{}
      }
    },
    methods:{
      move(event){
        // console.log(this.$refs);
        let maskWidth = this.$refs.mask.offsetWidth
        let maskHeigh = this.$refs.mask.offsetHeight
        let eventWidth = this.$refs.event.offsetWidth
        let eventHeight = this.$refs.event.offsetWidth
        let left = event.offsetX - maskWidth/2
        let top = event.offsetY - maskHeigh/2
        // 限制出event界限
        if(left<=0){
          left = 0
        }
        if(left>=eventWidth/2){
          left = eventWidth/2
        }
        if(top<=0){
          top = 0
        }
        if(top>=eventHeight/2){
          top=eventHeight/2
        }
        this.$refs.mask.style.left = left+'px'
        this.$refs.mask.style.top = top+'px'
        this.$refs.big.style.left = -left*2+'px'
        this.$refs.big.style.top = -top*2+'px'

      },
    },
    mounted(){
      // 这里要用回调函数
      this.$bus.$on('changImg',(index)=>{
        this.currentIndex = index
        // console.log(this.currentIndex);
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>