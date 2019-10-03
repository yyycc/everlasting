<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <v-excel v-show="showExcel" ref="excel" :excel-data="excelData" :excel-name="excelName"></v-excel>
    <div class="grid-title">
      <span class="grid-title-name">{{ gridTitle }}</span>
      <div class="grid-search">
        <label>Search</label>
        <input type="text" v-model="filterKey">
      </div>
    </div>
    <div class="table-wrapper">
      <table v-bind:id="tableId">
        <thead>
        <tr>
          <th v-for="(item,index) in columns" v-bind:name="item.value"
              v-on:click="sortBy(item.field,index,!!item.template)"
              v-bind:class="{active: sortKey == item.field, pointer: !item.template}"
              v-bind:style="'width:'+ item.width +';text-align:'+item.columnAlign">{{ item.title }}
            <span :class="[{'arrow': !item.template},sortOrders[item.field]>0 ? 'asc' : 'dsc']"></span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData">
          <td v-for="item in columns" :style="'text-align:'+item.textAlign">{{ entry[item.field] }}
            <a :class="{hide: item.field !== 'vFix'}" style="cursor: pointer;color: blue;font-size: 15px;"
               @click="jump(entry[item.id])">修改</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--分页-->
    <v-page v-show="pageHelp" :total="total" :page-index="page" :page-size="pageSize" :per-pages="perPages"
            v-on:current-page="fromPage"></v-page>
  </div>
</template>
<script>
  export default ({
    name: 'Grids',
    props: {
      gridTitle: String,
      columns: Array,
      gridData: Array,
      pageHelp: Boolean,
      page: Number,
      pageSize: Number,
      perPages: Number,
      total: Number,
      excelImport: {type: Boolean, default: false},
      showExcel: Boolean,
      excelName: String,
      excelData: Array
    },
    data() {
      return {
        tableId: "gridTest",
        filterKey: '',
        sortOrders: {},
        sortKey: '',
        data: [],
        orderCom: [1],
        currentPage: 1,
        path: ""
      }
    },
    watch: {},
    methods: {
      fromPage: function (page) {
        this.currentPage = page;
        this.$emit("change-page", page);
      },
      templateRow: function (self) {
        var tr = document.getElementById(self.tableId).getElementsByTagName('tr');
        for (let i = 1; i < tr.length; i++) {
          for (let j = 0; j < self.columns.length; j++) {
            if ('template' in self.columns[j]) {
              tr[i].getElementsByTagName('td')[j].innerHTML = self.columns[j].template(this.gridData[i - 1], tr[i].getElementsByTagName('td')[j].innerText, i, this);
            }
            if ('path' in self.columns[j]) {
              this.path = self.columns[j]['path'];
            }
          }
        }
      },
      goBack() {
        this.$router.push('/Home');
      },
      /*排序*/
      sortBy(key, index, temp) {
        if (temp) return false
        this.orderCom = [this.orderCom[0] + 1];
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },
      jump(url) {
        this.$router.push(this.path + url);
      }
    },
    computed: {
      filteredData: function () {
        debugger
        /*在此处进行排序和搜索*/
        /*sortOrders改变后不仅此方法which I don't know why 所以加了一个变量*/
        let fix = this.orderCom;
        let sortKey = this.sortKey;
        let filterKey = this.filterKey && this.filterKey.toLowerCase();
        let order = this.sortOrders[sortKey] || 1;
        let data = this.gridData;
        let columns = this.columns;
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey];
            b = b[sortKey];
            var temp = columns.filter((row) => Object.keys(row).some((key) => String(row[key]) === sortKey));
            if (temp.length > 0 && temp[0].type !== undefined && temp[0].type === 'number') {
              a = Number(a);
              b = Number(b);
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          })
        }
        if (filterKey) {
          /*filter 返回满足条件的元素  some 检查是否有满足条件的元素*/
          data = data.filter((row) => Object.keys(row).some((key) => String(row[key]).toLowerCase().indexOf(filterKey) > -1));
        }
        if (this.pageSize && this.excelImport) {
          let total = this.total;
          let page = this.page || 1;
          let pageSize = this.pageSize;
          if (this.currentPage !== 0)
            page = this.currentPage;

          let start = (page - 1) * pageSize;
          let end = page * pageSize;
          if (end > total) end = total;
          data = data.slice(start, end)
        }
        return data;
      }
    },
    created() {
      this.columns.forEach(v => {
        this.sortOrders[v['field']] = 1;
      });
    },
    mounted() {
      this.templateRow(this);
    },
    updated() {
      this.templateRow(this);
    }
  })
</script>
<style scoped>
  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .grid-title {
    width: 80%;
    margin: auto auto 10px auto;
    border-bottom: 2px solid #9cedec;
    text-align: left;
  }

  .grid-title-name {
    display: inline-block;
    font-weight: bold;
  }

  .grid-search {
    display: inline-block;
    float: right;
  }

  .table-wrapper {
    width: 80%;
    margin: auto;
    overflow: auto;
  }

  img {
    width: 20px;
    vertical-align: middle;
  }

  table {
    width: 100%;
    border: 1px solid #9cedec;
    table-layout: auto;
  }

  .pointer {
    cursor: pointer;
  }

  th {
    /*white-space: nowrap;*/
    border: 1px solid #ffffff;
    background-color: #9cedec;
    color: rgba(255, 255, 255, 0.66);
  }

  th.active {
    color: #ffffff;
  }

  td {
    background-color: #f9f9f9;
  }

  .arrow {
    vertical-align: middle;
    opacity: 0.66;
    display: inline-block;
  }

  th.active .arrow { /*active后要接空格，表示arrow在actice的子元素中，是后代选择器*/
    opacity: 1;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>
