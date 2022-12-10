<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leave" @mouseenter="toShow">
      <h2 class="all" >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(ca, index) in catagoryList"
              :key="ca.categoryId"
            >
              <h3
                @mouseenter="enter(index)"
                :class="{ current: currentIndex == index }"
              >
                <a
                  :data-categoryName="ca.categoryName"
                  :data-category1Id="ca.categoryId"
                  >{{ ca.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="cac in ca.categoryChild"
                  :key="cac.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="cac.categoryName"
                        :data-category2Id="cac.categoryId"
                        >{{ cac.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="cacc in cac.categoryChild"
                        :key="cacc.categoryId"
                      >
                        <a
                          :data-categoryName="cacc.categoryName"
                          :data-category3Id="cacc.categoryId"
                          >{{ cacc.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: false,
    };
  },
  mounted() {
    // this.$store.dispatch("catagoryList");
    if (this.$route.path == "/home") {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      catagoryList: (state) => state.home.catagoryList,
    }),
  },
  methods: {
    // enter(index){
    //     this.currentIndex = index
    // },
    // 三级联动节流
    enter: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leave() {
      this.currentIndex = -1;
      if (this.$route.path.split("/")[1] == "search") {
        this.show = false;
      }
    },
    goSearch(e) {
      let element = e.target;
      // console.log(element.dataset);
      // console.log(11);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // let location = {name:"search"}
      // let query = {categoryName:categoryname}
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        if(this.$route.params){
          location.params = this.$route.params
          location.query = query;
          this.$router.push(location);
        }
      }
      //  console.log(location);
      //  console.log(query);
    },
    toShow() {
      if (this.$route.path.split("/")[1] == "search") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .current {
            background-color: skyblue;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    .sort-enter{
        height: 0;
    }
    .sort-enter-active{
        transition: all 0.5s linear;
    }
    .sort-leave-to{
        height: 461px;
    }
  }
}
</style>