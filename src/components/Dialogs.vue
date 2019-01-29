<template>
  <div class="dialog">
    <div class="mask"></div>
    <div class="dialog-content">
      <h3 class="title">{{ modal.title }}</h3>
      <p class="text">{{ modal.text }}</p>
      <div class="btn-group">
        <div class="btn" @click="cancel" :class="{display: modal.isCancelShow}">{{ modal.cancelButtonText }}</div>
        <div class="btn" @click="submit" :class="{display: modal.isSubmitShow}">{{ modal.submitButtonText }}</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default ({
    name: 'dialogs',
    props: {
      dialogOption: Object
    },
    data() {
      return {
        resolve: '',
        reject: '',
        promise: '',
      }
    },
    computed: {
      modal: function () {
        let options = this.dialogOption;
        return {
          title: options.title || 'HINT',
          text: options.text,
          cancelButtonText: options.cancelButtonText ? options.cancelButtonText : '取消',
          submitButtonText: options.submitButtonText ? options.submitButtonText : '确认',
          isCancelShow: options.isCancelShow,
          isSubmitShow: options.isSubmitShow
        }
      }
    },
    methods: {
      submit() {
        this.resolve('Yyy');
      },
      cancel() {
        this.reject('Yyy');
      },
      confirm(message) {
        this.promise = new Promise((resolve, reject)=>{
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;
      }
    }
  })
</script>


<style scoped>
  .dialog {
    position: relative;
  }

  .dialog-content {
    position: fixed;
    width: 20%;
    top: 35%;
    left: 50%;
    min-height: 140px;
    z-index: 100;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    transform: translate(-50%, -50%);
    /*实现块元素百分比下居中*/

  }

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
  }

  .text {
    font-size: 14px;
    line-height: 40px;
    color: #555;
  }

  .btn-group {
    position: absolute;
    display: flex;
    bottom: 5px;
    right: 0;
  }

  .btn {
    font-size: 14px;
    padding: 10px 20px;
  }
  .btn:last-child {
    color: #9cedec;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, .4);
  }
  .display {
    display: none;
  }
</style>
