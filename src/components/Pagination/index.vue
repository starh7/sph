<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="pageStartEnd.start > 1"
      @click="$emit('getPage', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="pageStartEnd.start > 2">···</button>

    <button
      v-for="(item, index) in pageStartEnd.end"
      :key="index"
      v-show="index > pageStartEnd.start - 2"
      @click="$emit('getPage', item)"
      :class="{ active: pageNo == item }"
    >
      {{ item }}
    </button>

    <button v-if="pageStartEnd.end < totalPage - 1">···</button>
    <button
      v-if="pageStartEnd.end < totalPage"
      @click="$emit('getPage', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "total", "showPage", "pageSize"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    pageStartEnd() {
      let { pageNo, totalPage, showPage } = this;
      let start = 0;
      let end = 0;
      start = pageNo - parseInt(showPage / 2);
      end = pageNo + parseInt(showPage / 2);
      if (showPage > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        if (start < 1) {
          start = 1;
          end = parseInt(showPage);
        }
        if (end > totalPage - 1) {
          start = parseInt(this.totalPage - showPage + 1);
          end = parseInt(this.totalPage);
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>