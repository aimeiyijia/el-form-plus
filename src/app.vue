<template>
  <div id="app">
    <el-form-plus
      v-model="model"
      :config="config"
      :layout="layout"
      :options="options"
      @validate="validate"
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

      // layout布局配置项 同element-ui中Layout 中 Row Attributes
      // layout只要存在，不管是不是{}，都会去按照el-row el-col去布局
      layout: {},

      // el-form 表单整体配置（除model配置项，因为内部已拦截）
      config: {
        labelWidth: '60px',
        // rules: {
        //   input: [
        //     { required: true, message: '请输入活动名称12', trigger: 'blur' },
        //     {
        //       min: 3,
        //       max: 5,
        //       message: '长度在 3 到 5 个字符',
        //       trigger: 'blur',
        //     },
        //   ],
        // },
      },

      // 表单项生成配置
      options: formData,
      // 表单校验规则
    }
  },
  mounted() {
    console.log(this.model, '双向绑定值')
    // this.model.input = '123'
    // this.model.setByField('input', 'attrs.value', 1234567890)
    setInterval(() => {
      console.log(this.model, '双向绑定值')
      this.model.input = new Date().getSeconds()
      this.model.moreinput = new Date().getSeconds() + 100
    }, 10000)
  },
  methods: {
    validate() {
      console.log(1)
    },
  },
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
