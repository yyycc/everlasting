<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="main">
    <button @click="goBack">Let's go to the world</button>
    <div class="grid-title">
      <label>Search</label>
      <input type="text" v-model="searchContent">
      <img src="../../src/assets/logo.png">
      <span class="grid-title">{{ gridTitle }}</span>
    </div>
    <div class="table-wrapper">
      <table v-bind:id="tableId">
        <thead>
        <tr>
          <th v-for="(item,index) in columns" v-bind:name="item.value"
              v-on:click="orderList(item.field,index)"
              v-bind:class="{active: sortKey == item.value}"
              v-bind:style="'width:'+ item.width +';text-align:'+item.columnAlign">{{ item.title }}
            <span :class="[{'arrow': !item.template},keyOrder>0 ? 'asc' : 'dsc']"></span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="datas in gridData">
          <td v-for="item in columns" :style="'text-align:'+item.textAlign" v-if="!datas[item.field]"></td>
          <td v-for="item in columns" v-if="datas[item.field]" :style="'text-align:'+item.textAlign">{{ datas[item.field] }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default ({
    name: 'Grids',
    data() {
      return {
        tableId: "gridTest",
        index1: 1,
        searchContent: '',
        keyOrder: 1,
        sortKey: '',
        gridTitle: 'TEST-GRID',
        // gridTitle: String,
        columns: [{
          field: 'index', title: '序号', width: '50px', template: function (rowData, rowIndex) {
            return rowIndex;
          }
        },
          {field: 'name', title: '姓名', width: '50px', columnAlign: 'center', textAlign: 'left'},
          {
            field: 'school', title: '学校', width: '50px', columnAlign: 'center', textAlign: 'left',
            template: function (rowData) {
              return rowData;
            }
          },
          {field: 'address', title: '地址', width: '50px', columnAlign: 'center', textAlign: 'left'},
          {field: 'age', title: '年龄', width: '50px', columnAlign: 'center', textAlign: 'left', type: 'number'},
          {
            field: 'sex', title: '性别', width: '50px', columnAlign: 'center', textAlign: 'left',
            template: function (rowData, rowIndex) {
              if (rowData == 'F' || rowData == '女')
                return '女';
              else if (rowData == 'M' || rowData == '男')
                return '男'
            }
          },
          {field: 'class', title: '班级', width: '50px', columnAlign: 'right', textAlign: 'right', type: 'number'},
          {field: 'grade', title: '年纪', width: '100px', columnAlign: 'left', textAlign: 'left', type: 'number'}],
        // columns: Array,
        // gridData: Array
        gridData: [{name: 'cyy', school: 'J大学', address: '江苏', age: '18', sex: 'F', class: '1', grade: 'one'},
          {name: 'ever', school: 'B大学', address: '浙江', age: '19', sex: 'M', class: '2', grade: 'two'},
          {name: 'sy', school: 'A大学', address: '上海', age: '5', sex: 'F', class: '3', grade: 'three'},
          {name: 'qw', school: 'A大学', address: '上海', age: '22', sex: 'F', class: '4', grade: 'four'},
          {name: 're', school: 'C大学', address: '云南', age: '18', sex: 'M', class: '5', grade: 'five'},
          {name: 'ro', school: 'A大学', address: '广州', age: '20', sex: 'F', class: '6', grade: 'six'},
          {name: 'rt', school: 'D大学', address: '山东', age: '18', sex: 'M', class: '7', grade: 'seven'},
          {name: 'vf', school: 'A大学', address: '湖南', age: '20', sex: 'F', class: '8', grade: 'eight'},
          {name: 'rth', school: 'F大学', address: '海南', age: '19', sex: 'M', class: '9', grade: 'nine'},
          {name: 'yhj', school: 'Z大学', address: '内蒙古', age: '20', sex: 'F', class: '10', grade: 'ten'}
        ],
        gridDataOrigin: [{name: 'cyy', school: 'J大学', address: '江苏', age: '18', sex: 'F', class: '1', grade: 'one'},
          {name: 'ever', school: 'B大学', address: '浙江', age: '19', sex: 'M', class: '2', grade: 'two'},
          {name: 'sy', school: 'A大学', address: '上海', age: '5', sex: 'F', class: '3', grade: 'three'},
          {name: 'qw', school: 'A大学', address: '上海', age: '22', sex: 'F', class: '4', grade: 'four'},
          {name: 're', school: 'C大学', address: '云南', age: '18', sex: 'M', class: '5', grade: 'five'},
          {name: 'ro', school: 'A大学', address: '广州', age: '20', sex: 'F', class: '6', grade: 'six'},
          {name: 'rt', school: 'D大学', address: '山东', age: '18', sex: 'M', class: '7', grade: 'seven'},
          {name: 'vf', school: 'A大学', address: '湖南', age: '20', sex: 'F', class: '8', grade: 'eight'},
          {name: 'rth', school: 'F大学', address: '海南', age: '19', sex: 'M', class: '9', grade: 'nine'},
          {name: 'yhj', school: 'Z大学', address: '内蒙古', age: '20', sex: 'F', class: '10', grade: 'ten'}
        ],
        data: [],
      }
    },
    methods: {
      templateRow: function (self) {
        var tr = document.getElementById(self.tableId).getElementsByTagName('tr');
        for (let i = 1; i < tr.length; i++) {
          for (let j = 0; j < self.columns.length; j++) {
            if ('template' in self.columns[j]) {
              tr[i].getElementsByTagName('td')[j].innerText = self.columns[j].template(tr[i].getElementsByTagName('td')[j].innerText, i);
            }
          }
        }
      },
      goBack() {
        this.$router.push('/');
      },
      indexTemplate() {
        return 666;
      },
      /*排序*/
      orderList(e, index) {
        debugger
        var self = this;
        this.sortKey = e;
        this.keyOrder = this.keyOrder * -1;
        //数字类型按照数字大小排序
        if (this.columns[index]['type'] === 'number')
          this.gridData.sort((lat, pre) => {
            if (Number(pre[e]) > Number(lat[e]))
              return -this.keyOrder;
            return this.keyOrder;
          });
        else
          this.gridData.sort((lat, pre) => {
            if (pre[e] > lat[e])
              return -this.keyOrder;
            return this.keyOrder;
          });
      },
    },
    watch: {
      /*查询*/
      searchContent: function () {
        var content = this.searchContent;
        var newData = [];
        var $t = this;
        if (content === '')
          this.gridData = this.gridDataOrigin;
        else {
          this.gridDataOrigin.map((v, i) => {
            for (let j = 0; j < $t.columns.length; j++) {
              if (v[$t.columns[j].field] && v[$t.columns[j].field].indexOf(content) >= 0) {
                newData.push(v);
                continue;
              }
            }
          });
          this.gridData = newData;
        }
      }
    },
    computed: {
      styleChange: function (item) {
        return 'width: 85px';
      }
    },
    mounted() {
      this.templateRow(this);
    },
    updated() {
      this.templateRow(this);
    }
  })
</script>
<style>
  .grid-title {
  }

  .table-wrapper {
    width: 90%;
    margin: auto;
    height: 300px;
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

  th {
    /*white-space: nowrap;*/
    cursor: pointer;
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
