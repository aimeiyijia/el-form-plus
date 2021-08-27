<template>
  <div id="app">
    <el-form-plus
      v-model="model"
      :config="config"
      :options="options"
    ></el-form-plus>
  </div>
</template>

<script>
import formData from '../mock/index'
export default {
  name: 'app',
  data() {
    return {
      model: null,
      // 表单整体配置
      config: {
        labelWidth: '60px',
      },

      // 表单项配置
      options: formData,
    }
  },
  created() {
    const timer = setTimeout(() => {
      this.model.updateByField('input', 1234567890)
      this.model.updateOptionByField('input')
      console.log(this.model)

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
