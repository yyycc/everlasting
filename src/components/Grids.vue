<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <button @click="goBack">Let's go to the world</button>
    <div class="grid-title">
      <label>Search</label>
      <input type="text" v-model="filterKey">
      <img src="../../src/assets/logo.png">
      <span class="grid-title">{{ gridTitle }}</span>
    </div>
    <div class="table-wrapper">
      <table v-bind:id="tableId">
        <thead>
        <tr>
          <th v-for="(item,index) in columns" v-bind:name="item.value"
              v-on:click="orderList(item.field,index,!!item.template)"
              v-bind:class="{active: sortKey == item.field, pointer: !item.template}"
              v-bind:style="'width:'+ item.width +';text-align:'+item.columnAlign">{{ item.title }}
            <span :class="[{'arrow': !item.template},sortOrders[item.field]>0 ? 'asc' : 'dsc']"></span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="datas in filteredData">
          <td v-for="item in columns" :style="'text-align:'+item.textAlign">{{ datas[item.field] }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default ({
    name: 'Grids',
    props: {
      gridTitle: String,
      columns: Array,
      gridData: Array,
    },
    data() {
      return {
        tableId: "gridTest",
        filterKey: '',
        sortOrders: {},
        sortKey: '',
        data: [],
      }
    },
    methods: {
      templateRow: function (self) {
        var tr = document.getElementById(self.tableId).getElementsByTagName('tr');
        for (let i = 1; i < tr.length; i++) {
          for (let j = 0; j < self.columns.length; j++) {
            if ('template' in self.columns[j]) {
              tr[i].getElementsByTagName('td')[j].innerText = self.columns[j].template(this.gridData[i - 1], tr[i].getElementsByTagName('td')[j].innerText, i);
            }
          }
        }
      },
      goBack() {
        this.$router.push('/Home');
      },
      /*排序*/
      orderList(e, index, tem) {
        if (tem) return false;
        var self = this;
        this.sortKey = e;
        var order = this.sortOrders[e];
        this.sortOrders[e] = this.sortOrders[e] * -1;
        //数字类型按照数字大小排序
        if (this.columns[index]['type'] === 'number')
          this.gridData.sort((lat, pre) => {
            if (Number(pre[e]) > Number(lat[e]))
              return -order;
            return order;
          });
        else
          this.gridData.sort((lat, pre) => {
            if (pre[e] > lat[e])
              return -order;
            return order;
          });
      },
      /*排序*/
      sortBy(key,index,temp){
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      }
    },
    computed: {
      filteredData: function () {
        /*在此处进行排序和搜索*/
        let sortKey = this.sortKey;
        let filterKey = this.filterKey && this.filterKey.toLowerCase();
        var data = this.gridData;
        var order = this.sortOrders[sortKey] || 1;
        if (sortKey){
          data = data.slice().sort(function (a,b) {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          })
        }
        if (filterKey){
          /*filter 返回满足条件的元素  some 检查是否有满足条件的元素*/
          data = data.filter((row) => Object.keys(row).some((key) => String(row[key]).toLowerCase().indexOf(filterKey) > -1));
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
  .grid-title {
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
    margin: auto;
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
