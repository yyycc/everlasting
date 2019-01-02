<template>
  <div id="app" style="display:block;">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #test-2 {
    display: block;
  }
  .square{
    width: 100px;
    height: 100px;
  }
  .danger{
    background-color: red;
  }
  .save{
    background-color: green;
  }
</style>
