<template>
  <div id="app">
    <el-form-plus :config="config" :options="options"></el-form-plus>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      // 表单整体配置
      config: {},

      // 表单项配置
      options: [
        {
          // 类型 必需
          type: 'input',
          // 表单项绑定的值 必需
          field: 'name',
          // 初始值
          value: '值',
          // vue ref属性 必需且尽量唯一 利用此属性来查找某一组件
          ref: 'test',
          // 表单项是否隐藏 默认为false
          hidden: false,
          // Events
          on: {
            blur: () => {
              console.log('失去焦点')
            },
            input: () => {
              console.log('input事件')
            },
          },
          // el-form-item配置项 可选
          config: {
            label: '测试：',
          },
        },
      ],
    }
  },
  created() {
    const timer = setTimeout(() => {
      this.options[0].value = '值变化'
      console.log('model: ', this.options)
      clearTimeout(timer)
    }, 5000)
  },
  methods: {},
}
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
