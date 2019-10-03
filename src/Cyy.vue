<template>
  <div id="cyy" style="display:block;margin-bottom: 80%">
    <!--<img src="./assets/head.png">-->
    <router-view/>
  </div>
</template>


<script>
  export default {
    name: 'Cyy'
  }
</script>

<style scoped>

  #cyy {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
