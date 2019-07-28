<template>
  <div>
    <input type="file" @change="importFile()" id="myFile" style="display: none;"
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
    <button class="button" @click="uploadFile()">excel导入</button>
  </div>
</template>
<script>
  var XLSX = require('xlsx');
  import {formatDate2} from './../common/date';

  export default ({
    name: "ExcelImport",
    props: {
      columns: Array,
    },
    data() {
      return {
        myFile: '',
        returnData: []
      }
    },
    methods: {
      // 文件流转BinaryString
      fixdata: function (data) {
        var o = '';
        var l = 0;
        var w = 10240;
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o
      },
      uploadFile: function () {
        this.myFile.click();
      },
      importFile() {
        var obj = this.myFile;
        if (!obj.files) return false; //TODO 弹出框提示
        /*导入一个excel*/
        var f = obj.files[0];
        var reader = new FileReader();
        var $t = this;
        reader.onload = function (e) {
          debugger
          let data = e.target.result;
          $t.wb = XLSX.read(btoa($t.fixdata(data)), {type: 'base64'})
          /*处理数据*/
          var columns = $t.columns;
          var sheet = $t.wb.Sheets[$t.wb.SheetNames[0]];
          for (let v in sheet) {
            if (v !== '!ref' && sheet[v].w !== undefined) {
              sheet[v].v = formatDate2(sheet[v].w);
            }
          }
          let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);//这就直接转换好啦，太扯了吧，哼。。。
          var returnData = [];
          json.map((v, i) => {
            var temp = {};
            columns.map((k, j) => {
              for (var m in v) {
                if (m === k.title) {
                  var obj = {};
                  obj[k.field] = v[m];
                  temp = Object.assign({}, temp, obj);
                }
              }
            });
            returnData.push(temp);
          });
          $t.$emit('return-data', returnData);
        };
        reader.readAsArrayBuffer(f);
      }
    },
    mounted() {
      this.myFile = document.getElementById("myFile");
    }
  })
</script>


<style scoped>

</style>
