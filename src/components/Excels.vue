<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <!--<button id="exportExcel" @click="downloadFile(excelData)">excel导出</button>-->
    <img src="./../assets/excel.png" v-on:click="downloadFile(excelData)">
    <a href="" v-bind:download="excelName" id="hf"></a>
  </div>
</template>

<script>
  var XLSX = require('xlsx');
  export default ({
    name: 'Excels',
    props: {
      excelData: Array,
      excelName: String
    },
    data() {
      return {
        outFile:''
      }
    },
    methods: {
      /*将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]*/
      getCharCode(n) {
        let s = '', m = 0;
        while (n > 0) {
          m = n % 26 + 1;
          s = String.fromCharCode(m + 64) + s;
          n = (n - m) / 26;
        }
        return s;
      },
      // 26进制转为自然数
      setCharCode(s) {

      },
      //字符串转字节流
      s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i)
          view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      },
      downloadFile(json, type) {
        json.unshift({});
        var keyMap = [];//获取keys
        for (var k in json[1]) {
          keyMap.push(k);
          json[0][k] = k;
        }
        var temData = [];//用来保存转换好的json
        var temp = [];
        temp = json.map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign({}, {
              v: v[k],
              position: (j > 25 ? this.getCharCode(j) : String.fromCharCode(65 + j)) + (i + 1)
            })));
        // temp为每个数据对应excel的位置A0-..
        json.splice(0,1);
        temp = temp.reduce((prev, next) => prev.concat(next));
        temp.forEach((v, i) => temData[v.position] = {
          v: v.v
        });
        var outputPos = Object.keys(temData);//获取所有有数据的区域
        var tmpWB = {
          SheetNames: ['sheetOne'],//标题
          Sheets: {
            'sheetOne': Object.assign({},
              temData,//内容
              {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1],//设置填充区域 例"A1:E6"
                '!cols': [{wch:14}]//设置行宽
              }),
            // 'sheetTwo': Object.assign({},temData,
            //   {
            //     '!ref': outputPos[0] + ':' + 'F16',//设置填充区域
            //     'F2': {f:'D2'}//设置数据
            //     // '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 5]//设置填充区域
            //   })
          }
        };
        //创建二进制对象，传入转换好的字节流
        let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
          bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'
        }))], {type: ''});
        var href = URL.createObjectURL(tmpDown); //创建对象超链接
        document.getElementById("hf").href = href; //绑定a标签
        document.getElementById("hf").click(); //模拟点击实现下载
        setTimeout(function () { //延时释放
          URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
      },
    }
  })

</script>

<style scoped>
  img {
    width: 30px;
    cursor: pointer;
  }
  .button {
    border-style: hidden;
    color: #9cedec;
  }
</style>
