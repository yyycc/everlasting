<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="shop" style="text-align: center">
    <h1>Let's go to the mall</h1>
    <button @click="goBack">Let's go back</button>
    <v-dialog v-show="showDialog" :dialog-option="dialogOptions" ref="dialogs"></v-dialog>
    <br>
    go shopping
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
  var IPhone_lists = [
    {id: 1, name: 'iphone8', price: 5499, count: 6},
    {id: 2, name: 'iphone8P', price: 6799, count: 6},
    {id: 3, name: 'iphoneX', price: 7899, count: 6}
  ]
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
        }
      }
    },
    methods: {
      goBack() {
        // this.$router.push('/');
        this.showDialog = true;
        this.$refs.dialogs.confirm().then((data) =>{
          this.showDialog = false;
          this.$router.push('/');
        }).catch((data)=>{
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
</style>
