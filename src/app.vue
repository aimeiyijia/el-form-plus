<template>
  <div id="app">
    <el-form-plus :config="config" :options="options"></el-form-plus>
  </div>
</template>

<script>
import formData from '../mock/index'
export default {
  name: 'app',
  data() {
    return {
      // 表单整体配置
      config: {
        labelWidth: '60px',
      },

      // 表单项配置
      options: formData,
    }
  },
  created() {
    console.log(formData)
    // const timer = setTimeout(() => {
    //   // this.options[0].attrs.value = '值变化'
    //   // console.log('model: ', this.options)
    //   // clearTimeout(timer)
    // }, 3000)
  },
  methods: {},
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: calc(100% - 48px);
  padding: 24px;
}
</style>
