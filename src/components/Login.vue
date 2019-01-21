<template>
  <!--<div class="my-main">
    <div class="my-body">
      <div class="my-container">
        <div>
          <input type="text" id="userName" placeholder="用户名" style="background: #eae7e7 url(../assets/user.png) no-repeat">
        </div>
        <div>
          <input type="password" id="passWord" placeholder="密码" style="background: #eae7e7">
        </div>
        <div>
          <button v-on:click="login">登陆</button>
        </div>
      </div>
    </div>
  </div>-->

  <div class="container">
    <section id="content">
      <form action="">
        <h1>登录</h1>
        <div>
          <input type="text" placeholder="用户名" required="" id="username"/>
        </div>
        <div>
          <input type="password" placeholder="密码" required="" id="password"/>
        </div>
        <div>
          <input type="submit" value="登录" class="btn btn-primary" id="js-btn-login"/>
          <a href="#">忘记密码?</a>
        </div>
      </form>
      <div class="button">
        <a href="" @click="visit">游客模式</a>
      </div>

    </section>
  </div>

</template>

<script>
  export default ({
    name: 'login',
    methods: {
      login: function () {
        this.$router.push('/Shop');
      },
      visit: function () {
        this.$router.push('/Shop');
      }
    }
  })

</script>

<style>
  @import "../assets/css/login.css";
</style>
