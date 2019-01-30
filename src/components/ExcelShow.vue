<template>
  <div>
    <v-excelImport :columns="columns" v-on:return-data="fromExcel"></v-excelImport>
    <v-grid :columns="columns" :grid-title="gridTitle" :grid-data="data" :page-help="pageHelp" :page="page" :page-size="pageSize"></v-grid>
  </div>
</template>

<script>
  export default ({
    data() {
      return {
        data: [],
        columns: [
          {field: 'applyNumber', title: '资金申请编号', width: '100px'},
          {field: 'applyPerson', title: '申请人', width: '50px'},
          {field: 'dateFrom', title: '开始日', width: '50px', type: 'date'},
          {field: 'dateTo', title: '结束日', width: '50px', type: 'date'},
          {field: 'planCycle', title: '计划周期', width: '50px'},
          {field: 'projectNumber', title: '项目编号', width: '50px'},
          {field: 'projectName', title: '项目名称', width: '110px'},
          {field: 'businessType', title: '业务类型', width: '50px'},
          {field: 'projectAmount', title: '项目金额', width: '50px', type: 'number'},
          {field: 'company', title: '公司', width: '50px'},
          {field: 'planPayDate', title: '计划支付日期', width: '100px', type: 'date'},
          {field: 'applyAmount', title: '申请投放金额', width: '100px', type: 'number'},
          {field: 'actualAmount', title: '实际投放金额合计', width: '120px', type: 'number'},
          {field: 'description', title: '备注', width: '50px'}
        ],
        gridTitle: '投放计划',
        pageHelp: true,
        page: 1,
        pageSize: 5
      }
    },
    methods: {
      fromExcel: function (data) {
        this.data = data;
      }
    }
  })
</script>

<style>
  table {
    /*width: 160% !important;*/
  }
</style>
