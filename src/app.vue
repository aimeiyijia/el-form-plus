<template>
  <div id="app">
    <el-form-plus
      v-model="model"
      :config="config"
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

      // el-form 表单整体配置
      config: {
        labelWidth: '60px',
        // 整体form设置
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
    // setInterval(() => {
    //   console.log(this.model, '双向绑定值')
    //   this.model.input = new Date().getSeconds()
    // }, 2000)
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
