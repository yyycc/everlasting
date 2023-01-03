<template>
  <div>
    <v-dialog v-show="errorHint" :dialog-option="dialogOptionsErr" ref="dialogErr"></v-dialog>
    <v-dialog v-show="successHint" :dialog-option="dialogOptionsSuc" ref="dialogSuc"></v-dialog>
    <!--<button style="margin-bottom: 50px;" @click="queryData">查询</button>-->

    <v-grid v-show="gridShow" :columns="columns" :grid-title="gridTitle" :grid-data="data"
            :page-help="pageHelp" :page="page" :page-size="pageSize" :per-pages="perPages" :total="total"
            v-on:change-page="fromGrids" :show-excel="showExcel" :excel-name="excelName"
            :excel-data="excelData"></v-grid>
  </div>
</template>
<script>
  var baseUrl = 'http://lovesy.org.cn:6688';
  var queryUrl = '/api/attachment/category/query';
  var detailUrl = '/10/02/DocDetails/';
  import Axios from 'axios';

  export default ({
    name: 'Doc',
    data() {
      return {
        data: [],
        gridShow: true,
        columns: [
          {field: 'categoryName', title: '类型名称', width: '30%'},
          {field: 'sourceType', title: '附件类型', width: '15%', type: 'date'},
          {field: 'enableFlag', title: '启用标志', width: '15%'},
          {field: 'uniqueFlag', title: '是否唯一', width: '15%'},
          {field: 'attachmentPath', title: '附件目录', width: '15%'},
          {field: 'vFix', title: '修改', width: '15%', id: "categoryId", path: detailUrl}
        ],
        gridTitle: '附件',

        pageHelp: false,
        page: 1,
        pageSize: 20,
        perPages: 10,
        total: 100000, //TODO

        showExcel: false,
        excelName: '',
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
      jump() {
        this.$router.push(url);
      },
      queryData: function () {
        let url = baseUrl + queryUrl;
        let param = {page: this.page, pageSize: this.pageSize};
        Axios.get(url, {params: param}).then(
          res => {
            this.successHint = true;
            this.$refs.dialogSuc.confirm().then(
              data => {
                this.successHint = false;
                this.gridShow = true;
                this.data = res.data.maps;
                this.excelData = res.data.maps;
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
      fromGrids(page) {
        let url = baseUrl + queryUrl;
        let param = {page: page, pageSize: this.pageSize};
        this.$http.get(url, {params: param}).then(
          res => this.data = res.body.maps,
          e => this.data = []
        )
      }
    },
    created() {

    },
    mounted() {
      let url = baseUrl + queryUrl;
      let param = {page: this.page, pageSize: this.pageSize};
      Axios.get(url, {params: param}).then(
        res => {
          if (res.data.maps) {
            this.data = res.data.maps;
            this.excelData = res.data.maps;
          }
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
    updated() {

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
