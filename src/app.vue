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
          // vue ref属性 必需且尽量唯一 利用此属性来查找某一组件
          ref: 'test',
          // 表单项是否隐藏 默认为false
          hidden: false,
          // el-form-item配置项 可选
          config: {
            label: '测试：',
          },
        },
      ],
    }
  },
  created() {
    // setTimeout(() => {
    //   console.log('model: ', this.model)
    // }, 5000)
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
