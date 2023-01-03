<template>
  <div class="container">
    <v-dialog v-show="showDialog" :dialog-option="dialogOptions" ref="dialogs"></v-dialog>
    <v-dialog v-show="showDialog2" :dialog-option="dialogOptions2" ref="dialogs2"></v-dialog>
    <section id="content">
      <form action="" @submit="login">
        <h1>登录</h1>
        <div>
          <input type="text" placeholder="用户名" v-model="username" required="" id="username"/>
        </div>
        <div>
          <input type="password" placeholder="密码" v-model="password" required="" id="password"/>
        </div>
        <div>
          <input type="submit" value="登录" class="btn btn-primary" id="js-btn-login"/>
          <a href="javascript:void(0)" @click="forget">忘记密码?</a>
        </div>
      </form>
      <div class="button">
        <a href="javascript:void(0)" @click="visit">游客模式</a>
      </div>

    </section>
  </div>

</template>

<script>
  var gcpUrl = 'http://104.198.87.241:8088/ever/';
  var url = 'http://47.100.232.59:6688/';
  export default ({
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        showDialog: false,
        showDialog2: false,
        dialogOptions: {
          title: '温馨提示',
          text: '我们不支持忘记密码的哦，亲～',
          submitButtonText: '确认',
          isSubmitShow: false,
          isCancelShow: true
        },
        dialogOptions2: {
          title: '温馨提示',
          text: '用户名或密码错误哦',
          submitButtonText: '确认',
          isSubmitShow: false,
          isCancelShow: true
        },
      }
    },
    methods: {
      login: function () {
        this.$http.post(url + 'api/login',{userCode: this.username, password: this.password}, {
          headers:
            {'Content-Type': 'application/json;charset=utf-8'}
        }).then(
          function (res) {
            this.task = res;
            /*this.$store.commit("set_token",res.body.token);
            if (this.$store.state.token) {
              this.$router.push('/HOME');
              console.log(store.state.token)
            } else {
              this.$router.replace('/login');
            }*/
            window.localStorage["token"] = res.body.token;
            if (localStorage.token) {
              this.$router.push('/HOME');
            }
          }, function (e) {
            alert('请求失败');
          });
        event.preventDefault(); //阻止自动跳转
      },
      visit: function () {
        this.$router.push('/Home');
        window.location.reload();
      },
      forget: function () {
        this.showDialog = true;
        this.$refs.dialogs.confirm().then(() =>
          this.showDialog = false)
      }
    }
  })

</script>

<style>
  @import "../assets/css/login.css";
</style>
<!--<style src="../assets/css/login.css"></style>-->
