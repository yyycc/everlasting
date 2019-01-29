<template>
  <div>
    <div @click="grids"><p>Grids</p></div>
    <div @click="file"><p>File</p></div>
    <div @click="shop"><p>Shop</p></div>
    <div @click="login"><p>Login</p></div>
    <div @click="helloWorld"><p>HelloWord</p></div>
    <div @click="excelShow"><p>excelShow</p></div>
  </div>
</template>

<script>
  export default ({
    name: 'home',
    data() {
      return{}
    },
    methods: {
      grids: function () {
        this.$router.push('/Grids');
      },
      file: function () {
        this.$router.push('/File');
      },
      shop: function () {
        this.$router.push('/Shop');
      },
      login: function () {
        this.$router.push('/');
      },
      helloWorld: function () {
        this.$router.push('/HelloWorld');
      },
      excelShow: function () {
        this.$router.push('/ExcelShow');
      },
    }
  })
</script>


<style scoped>
  p {
    font-size: 20px;
  }
</style>
