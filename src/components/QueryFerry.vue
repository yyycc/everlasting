<template>
  <div>
    <v-dialog v-show="errorHint" :dialog-option="dialogOptionsErr" ref="dialogErr"></v-dialog>
    <v-dialog v-show="successHint" :dialog-option="dialogOptionsSuc" ref="dialogSuc"></v-dialog>
    <button @click="queryData">查询</button>

    <v-grid v-show="gridShow" :columns="columns" :grid-title="gridTitle" :grid-data="data"
            :page-help="pageHelp" :page="page" :page-size="pageSize" :per-pages="perPages" :total="total"
            v-on:change-page="fromGrids" :show-excel="showExcel" :excel-name="excelName" :excel-data="excelData"></v-grid>
  </div>
</template>
<script>
  var baseUrl = 'http://47.100.232.59';
  var homeUrl = 'http://192.168.10.24:8888';
  var gender = [{value: 'FEMALE',name: '女'},{value: 'MALE',name: '男'}];
  export default ({
    name: 'Ferry',
    data() {
      return {
        data: [],
        columns: [
          {field: 'order', title: '序号', width: '15%',
            template: function (rowData,data,rowIndex,$t) {
              return ($t.currentPage - 1) * $t.pageSize + rowIndex;
            }},
          {field: 'birthDate', title: '生日',type: 'date',
          template: function (rowData,data) {
            // return (new Date(data)).toLocaleDateString() + (new Date(data)).toLocaleTimeString();
            return (new Date(data)).toLocaleString();
          }},
          {field: 'code', title: '代码', width: '30%'},
          {field: 'name', title: '姓名', width: '15%', type: 'date'},
          {field: 'sex', title: '性别', width: '15%',
          template: function (rowData,data) {
            var sex = data;
            gender.forEach(v => {
              if (v.value === data) sex = v.name;
            });
            return sex;
          }}
        ],
        gridTitle: '标题你怎么就是不靠左呢',
        gridShow: false,
        pageHelp: true,
        page: 1,
        pageSize: 20,
        perPages:10,
        total: 100000, //TODO

        showExcel:true,
        excelName: 'excel导出.xlsx',
        excelData: [],

        errorHint: false,
        successHint: false,
        dialogOptionsSuc: {
          title: '温馨提示',
          text: '查询成功',
          submitButtonText: '确认',
          isSubmitShow: false,
          isCancelShow: true
        },
        dialogOptionsErr: {
          title: '温馨提示',
          text: '查询失败',
          submitButtonText: '确认',
          isSubmitShow: false,
          isCancelShow: true
        },
      }
    },
    methods: {
      queryData: function () {
        debugger
        let url = homeUrl + '/api/chinese/people/query';
        let param = {page: this.page, pageSize: this.pageSize};
        this.$http.get(url, {params: param}).then(
          res => {
            this.successHint = true;
            this.$refs.dialogSuc.confirm().then(
              data => {
                this.successHint = false;
                this.gridShow = true;
                this.data = res.body.maps;
                this.excelData = res.body.maps;
              }
            );
          },
          e => {
            this.errorHint = true;
            this.$refs.dialogErr.confirm().then(
              data => {
                this.errorHint = false;
              }
            );
          })
      },
      fromGrids: function (page) {
        let url = baseUrl + '/api/chinese/people/query';
        let param = {page: page, pageSize: this.pageSize};
        this.$http.get(url, {params: param}).then(
          res => this.data = res.body.maps,
          e => this.data = []
        )
      }
    },
    created() {

    }
  })
</script>
<style scoped>
  button {
    background: -webkit-linear-gradient(top, rgba(254, 231, 154, 1) 0%, rgba(254, 193, 81, 1) 100%);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    border-radius: 5px;
    border: 1px solid #CFD5D9;
    padding: 10px 25px;
    cursor: pointer;
  }
</style>
