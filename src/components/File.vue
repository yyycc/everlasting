<template>
  <div>
    <button @click="goBack">Let's go to the world</button>
    <br>
    <br>
    <input type="file" id="files" name="files" multiple="multiple" style="display: none" @change="uploadFile($event)">
    <!--<input type="file" id="files" style="display: block" v-on:change="uploadFile($event)">-->
    <label>upload</label>
    <img src="./../assets/upload.png" v-on:click="upload($event)">
    <table>
      <tr>
        <th>文件名</th>
        <th>文件大小</th>
        <th>上传时间</th>
      </tr>
      <tr v-for="file in fileInfo">
        <td>
          {{ file.fileName }}
        </td>
        <td>
          {{ file.fileSize }}
        </td>
        <td>
          {{ file.uploadTime }}
        </td>
      </tr>
    </table>
    <!--<h1>why</h1>-->
  </div>
</template>
<script>
  import {formatDate} from './../common/date';
  var fileInfo = [];
  export default ({
    name: 'File',
    data() {
      return {fileInfo}
    },
    methods: {
      goBack: function () {
        this.$router.push('/HelloWorld');
      },
      upload: function (event) {
        document.getElementById("files").click();
      },
      uploadFile: function (event) {
        var files = event.target.files;
        var fInfo = [];
        for (var i = 0; i < files.length; i++) {
          var info = {}
          info['fileName'] = files[i].name;
          info['fileSize'] = Number(files[i].size / 1024).toFixed(2) + 'KB';
          info['fileType'] = files[i].type;
          info['uploadTime'] = formatDate(new Date(), 'yyyy-MM-dd');
          fInfo[i] = info;
          this.$http.post('/api/update', {taskId: 5,time: info.uploadTime, taskContent:'qqq', status: 'NEW'}).then(function () {
          }, function () {
            alert('请求失败');
          })
        }
        // this.$http.get('http://localhost/query/info').then(function (res) {
        //   this.$data.fileInfo = fInfo;
        //   var dataList = res;
        // }, function () {
        //   alert('请求失败');
        // })
      }
    }
  })
</script>

<style scoped>
  img {
    width: 30px;
    cursor: pointer;
  }

  table {
    border: 1px solid white;
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
