<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
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
        <th>操作</th>
      </tr>
      <tr v-for="file in fileInfo">
        <td>
          {{ file.fileName }}
        </td>
        <td>
          {{ file.fileSize }}
        </td>
        <td>
          {{ file.lastUpdateDate }}
        </td>
        <td>
          <!--<a style="display: none">{{ file.fileId }}</a>-->
          <pre><a v-bind:href="getUrl(file.fileId)">下载</a></pre>
        </td>
      </tr>
    </table>
    <!--<h1>why</h1>-->
  </div>
</template>
<script>
  var baseUrl = 'http://192.168.10.24:8888/';
  import {formatDate} from './../common/date';

  var fileInfo = [{fileName: 'ever', fileSize: 222, lastUpdateDate: formatDate(new Date(), 'yyyy-MM-dd'), fileId: 1}];
  // var fileInfo = [];
  export default ({
    name: 'File',
    data() {
      return {
        fileInfo,
        task: '',
        url: baseUrl + 'api/sys/file/download?fileId='
      }
    },
    methods: {
      getUrl: function (id) {
        return this.url + id;
      },
      queryFiles: function () {
        // return false;
        var source = {sourceType: 'ever'};
        var formData = new FormData();
        formData.append("sysAttachment", source);
        var url = baseUrl + 'api/sys/attachment/query';
        this.$http.get(url, {params: {sourceType: 'ever'}},
          {
            // emulateJson: true
          }).then(
          function (res) {
            var maps = res.body.maps;
            fileInfo = [];
            for (let i = 0; i < maps.length; i++) {
              fileInfo.push(maps[i]);
            }
          }, function (e) {
            alert('请求失败');
          })
      },
      goBack: function () {
        this.$router.push('/');
      },
      upload: function (event) {
        document.getElementById("files").click();
      },
      uploadFile: function (event) {
        var files = event.target.files;
        var fInfo = [];
        var formdata = new window.FormData();
        for (var i = 0; i < files.length; i++) {
          var info = {}
          info['fileName'] = files[i].name;
          info['fileSize'] = Number(files[i].size / 1024).toFixed(2) + 'KB';
          info['fileType'] = files[i].type;
          info['lastUpdateDate'] = formatDate(new Date(), 'yyyy-MM-dd');
          fInfo[i] = info;
          formdata.append("file", files[i]);
        }
        // formdata.append("files",files);
        var info = [
          {'name': 'sysAttachment', 'sysAttachment': {'sourceKey': 1, 'sourceType': 'ever'}}
        ];
        var source = {'sourceKey': '4', 'sourceType': 'ever'};
        // info['sourceKey'] = 1;
        // info['sourceType'] = 'cyy';
        // formdata.append('sysAttachment', new Blob([JSON.stringify(source)], {type: "application/json;charset=utf-8"}));
        // formdata.append('')
        debugger
        var url = baseUrl + 'api/sys/file/upload?sourceType=ever&sourceKey=1';
        // return false;
        this.$http.post(url, formdata, {
          headers:
            {'Content-Type': 'multipart/form-data'}
        }).then(function (res) {
          alert("successful～")
          this.queryFiles();
        }, function (e) {
          alert('请求失败');
        })
      }
    },
    created() {
      this.queryFiles();
      return false;
      this.$http.get('http://192.168.10.182/query/info', {params: {taskId: 1, time: '2018'}}, {emulateJson: true}).then(
        function (res) {
          this.task = res;
        }, function (e) {
          alert('请求失败');
        })
      return false;


    },
    mounted() {
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

  a {
    text-decoration: none;
    color: #9cedec;
  }
</style>
