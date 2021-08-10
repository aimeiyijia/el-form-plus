<template>
  <div id="app">
    <el-form-plus
      :model="model"
      :rules="rules"
      :attrs="formAttrs"
      :form-items="formItems"
    ></el-form-plus>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      // 表单数据对象
      model: {},
      // 表单校验规则
      rules: {},
      // 表单配置
      formAttrs: {},
      // 表单项配置
      formItems: [
        {
          type: 'input',
          label: '测试',
          ref: 'test',
          filed: 'testValue',
        },
      ],
    }
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
