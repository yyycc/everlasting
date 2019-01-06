<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="shop" style="text-align: center">
    <h1>Let's go to the mall</h1>
    <button @click="goBack">Let's go back</button>
    <!--弹出框-->
    <v-dialog v-show="showDialog" :dialog-option="dialogOptions" ref="dialogs"></v-dialog>
    <!--弹出框-->
    <br>
    go shopping
    <button class="button" @click="downloadFile(excelData)">excel导出</button>
    <!--
            以下a标签不需要内容
        -->
    <a href="" download="这里是下载的文件名.xlsx" id="hf"></a>
    <table>
      <tr>
        <th>序号</th>
        <th>商品名称</th>
        <th>商品单价</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
      <tr v-for="iphone in IPhone_lists">
        <td>{{ iphone.id }}</td>
        <td>{{ iphone.name }}</td>
        <td>{{ iphone.price }}</td>
        <td>
          <button v-bind:disabled="iphone.count===0" @click="iphone.count-=1">-</button>
          {{ iphone.count }}
          <button @click="iphone.count+=1">+</button>
        </td>
        <td>
          <button @click="iphone.count=0">移除</button>
        </td>
      </tr>
    </table>
    total:$ {{ totalPrice() }}
  </div>
</template>

<script>
  var XLSX = require('xlsx');
  var IPhone_lists = [
    {id: 1, name: 'iphone8', price: 5499, count: 6},
    {id: 2, name: 'iphone8P', price: 6799, count: 6},
    {id: 3, name: 'iphoneX', price: 7899, count: 6}
  ];
  var array = [
    {id: 1, name: 'iphone8', price: 5499, count: 6},
    {id: 2, name: 'iphone8P', price: 6799, count: 6},
    {id: 3, name: 'iphoneX', price: 7899, count: 6}
  ];
  export default {
    name: 'Shop',
    data() {
      return {
        IPhone_lists,
        showDialog: false,
        dialogOptions: {
          title: '温馨提示',
          text: '是否确认跳转',
          cancelButtonText: '取消',
          submitButtonText: '确认',
          isSubmitShow: false,
          isCancelShow: false
        },
        excelData: [  // 测试数据
          {
            name: '红烧鱼', size: '大', taste: '微辣', price: '40', remain: '100'
          },
          {
            name: '麻辣小龙虾', size: '大', taste: '麻辣', price: '138', remain: '200'
          },
          {
            name: '清蒸小龙虾', size: '大', taste: '清淡', price: '138', remain: '200'
          },
          {
            name: '香辣小龙虾', size: '大', taste: '特辣', price: '138', remain: '200'
          },
          {
            name: '十三香小龙虾', size: '大', taste: '中辣', price: '138', remain: '108'
          },
          {
            name: '蒜蓉小龙虾', size: '大', taste: '中辣', price: '138', remain: '100'
          },
          {
            name: '凉拌牛肉', size: '中', taste: '中辣', price: '48', remain: '60'
          },
          {
            name: '虾仁寿司', size: '大', taste: '清淡', price: '29', remain: '无限'
          },
          {
            name: '海苔寿司', size: '大', taste: '微辣', price: '26', remain: '无限'
          },
          {
            name: '金针菇寿司', size: '大', taste: '清淡', price: '23', remain: '无限'
          },
          {
            name: '泡菜寿司', size: '大', taste: '微辣', price: '24', remain: '无限'
          },
          {
            name: '鳗鱼寿司', size: '大', taste: '清淡', price: '28', remain: '无限'
          },
          {
            name: '肉松寿司', size: '大', taste: '清淡', price: '22', remain: '无限'
          },
          {
            name: '三文鱼寿司', size: '大', taste: '清淡', price: '30', remain: '无限'
          },
          {
            name: '蛋黄寿司', size: '大', taste: '清淡', price: '20', remain: '无限'
          }
        ]
      }
    },
    methods: {
      getCharCode(n) {
        /*将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]*/
        let s = '', m = 0;
        while (n > 0) {
          m = n % 26 + 1;
          s = String.fromCharCode(m + 64) + s;
          n = (n - m) / 26;
        }
        return s;
      },
      s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i)
          view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      },
      downloadFile(json, type) {
        debugger
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
            })))
        // temp为每个数据对应excel的位置A0-..
        temp = temp.reduce((prev, next) => prev.concat(next));
        temp.forEach((v, i) => temData[v.position] = {
          v: v.v
        })
        var outputPos = Object.keys(temData);//获取所有有数据的区域
        var tmpWB = {
          SheetNames: ['sheetOne','sheetTwo'],//标题
          Sheets: {
            'sheetOne': Object.assign({},
              temData,//内容
              {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1]//设置填充区域
              }),
            'sheetTwo': Object.assign({},temData,
              {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 10]//设置填充区域
              })
          }
        }
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
      goBack() {
        // this.$router.push('/');
        this.showDialog = true;
        this.$refs.dialogs.confirm().then((data) => {
          this.showDialog = false;
          this.$router.push('/');
        }).catch((data) => {
          this.showDialog = false;
        })
      },
      totalPrice: function () {
        var total = 0;
        for (var i = 0; i < this.IPhone_lists.length; i++) {
          total = total + this.IPhone_lists[i].price * this.IPhone_lists[i].count;
        }
        return total;
      }
    }
  }
</script>

<style scoped>
  table {
    border: 1px solid black;
  }

  table {
    width: 50%;
    margin: auto;
  }

  th {
    height: 50%;
  }

  th, td {
    border-bottom: 1px solid #ddd;
  }

  .button {
    border-style: hidden;
    color: #9cedec;
  }
</style>

