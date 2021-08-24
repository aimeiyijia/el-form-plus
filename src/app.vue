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
      formData: null,
      // 表单整体配置
      config: {
        labelWidth: '60px',
      },

      // 表单项配置
      options: formData,
    }
  },
  created() {
    console.log(this.options)
    this.options[0].attrs.value = 123456
    const timer = setTimeout(() => {
      // this.options[0].attrs.value = '更新'
      this.options.push({
        // 表单项渲染类型 必需
        type: 'Input',
        // 表单项的配置项
        attrs: {
          type: 'password',
          // 表单项绑定的值（字段名） 必需
          field: 'input1',
          // 初始值
          value: '',
        },
        // 表单项事件
        on: {
          blur: () => {
            console.log('input', '失去焦点')
          },
          input: () => {
            console.log('input', 'input事件')
          },
        },
        // el-form-item配置项 可选
        config: {
          // vue ref属性 默认为field 利用此属性来查找某一组件
          ref: 'input',
          label: 'input：',
          // labelWidth: '120px',
        },
      })
      clearTimeout(timer)
    }, 2000)
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
