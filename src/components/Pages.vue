<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="my-paging">
    <ul class="my-paging-ul">
      <!--<h3>page:{{ index }} ; pageSize:{{ pageSize }} ; total:{{ pages }}</h3>-->
      <li class="paging-total">共{{ total }}条</li>
      <li :class="['paging-item', 'paging-item-first', {'paging-item-disabled' : index === 1}]"
          @click="setPage(1)">first
      </li>

      <li :class="['paging-item', 'paging-item-prev', {'paging-item-disabled' : index === 1}]"
          @click="setPage(index-1)">prev
      </li>

      <li :class="['paging-item','paging-item-more']"
          v-if="showPrevMore" @click="prevMore">...
      </li>

      <li :class="['paging-item', {'paging-item-current' : index === pager}]"
          v-for="pager in pagers" @click="setPage(pager)">{{ pager }}
      </li>

      <li :class="['paging-item','paging-item-more']"
          v-if="showNextMore" @click="nextMore">...
      </li>

      <li :class="['paging-item',,'paging-item-next', {'paging-item-disabled' : index === pages}]"
          @click="setPage(index+1)">next
      </li>

      <li :class="['paging-item','paging-item-last', {'paging-item-disabled' : index === pages}]"
          @click="setPage(pages)">last
      </li>
      <span style="margin-left: 10px">
      前往
    <input id="inputPage" type="text" v-model="pageInput" v-on:keyup.enter="go"/>
      页
    </span>
    </ul>
  </div>
</template>
<script>
  export default ({
    name: 'Pages',
    props: {
      //可见页码数
      perPages: {
        type: Number,
        default: 5
      },
      //当前页码
      pageIndex: {
        type: Number,
        default: 1
      },
      //总记录数
      total: {
        type: Number,
        default: 202
      },
      //每页记录数
      pageSize: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        index: this.pageIndex,
        limit: this.pageSize,
        per: this.perPages,
        pageInput: '',
      }
    },
    methods: {
      ArrayInit: function (start, end) {
        let arr = [];
        for (let i = start; i < end; i++) {
          arr = arr.concat([i]);
        }
        return arr;
      },
      setPage: function (page) {
        if (page < 1 || page > this.pages)
          return false;
        this.index = page;
        this.$emit('current-page', page);
      },
      prevMore: function () {
        let indexNumber = Math.ceil(this.index / this.perPages) - 2;
        this.index = indexNumber * this.perPages + 1;
        this.$emit('current-page', this.index);

      },
      nextMore: function () {
        let indexNumber = Math.ceil(this.index / this.perPages);
        this.index = indexNumber * this.perPages + 1;
        this.$emit('current-page', this.index);
      },
      go: function () {
        let page = Number(this.pageInput);
        if (page < 1 || page > this.pages) {
          this.pageInput = this.pages;
          page = this.pages;
        }
        this.index = page;
        this.$emit('current-page', page);
      }
    },
    computed: {
      //总页数
      pages: function () {
        return Math.ceil(this.total / this.limit);
      },
      pagers: function () {
        let currenIndex = this.index;
        let indexNumber = Math.ceil(currenIndex / this.perPages) - 1;
        let start = indexNumber * this.perPages + 1;
        let end = start + this.perPages;
        if (end > this.pages + 1) end = this.pages + 1;
        return this.ArrayInit(start, end);
      },
      showPrevMore: function () {
        return this.index > this.perPages;
      },
      showNextMore: function () {
        return Math.ceil(this.index / this.perPages) * this.perPages < this.pages;
      }
    },
    created() {
    },
    mounted() {
    }
  })
</script>
<style scoped>
  .my-paging-ul {
    list-style: none;
    display: inline-block;
    user-select: none;
  }

  .paging-total {
    display: inline;
    font-size: 14px;
  }

  .paging-item {
    border: 1px solid #ccc;
    display: inline;
    font-size: 14px;
    background-color: #ffffff;
    cursor: pointer;
    padding: 6px 12px;
    margin-left: -2px;
    text-decoration: none;
  }

  .paging-item:hover {
    background-color: #f0f0f0;
    color: #0275d8;
  }

  .paging-item-disabled {
    cursor: not-allowed;
    opacity: 0.75;
    border-color: #d7dde4;
    background-color: #fff !important;
    color: #d7dde4 !important;
  }

  .paging-item-current {
    cursor: default;
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }

  .page-size {
    border: 1px solid #ccc;
    display: inline;
    font-size: 14px;
    background-color: #ffffff;
    cursor: pointer;
    color: #0275d8;
    padding: 6px 12px;
    margin-left: 12px;
  }

  input {
    border: 1px solid #ccc;
    display: inline;
    font-size: 14px;
    padding: 6px;
    width: 40px;
    border-radius: 3px;
  }

</style>
