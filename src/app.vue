<template>
  <div id="app">
    <el-form-plus
      v-model="model"
      :config="config"
      :unify-options="unifyOptions"
      :options="options"
      :layout="layout"
      @render-complete="renderComplete"
      @validate="validate"
    >
      <template #custom123>
        <div>我是一个分割线</div>
      </template>
    </el-form-plus>
  </div>
</template>

<script>
import _ from 'lodash'
import formData from '../mock/index'
// 全局性的setByField 只能更新options中已有的属性，render-complete无此限制
import { setByField } from './components/install'
export default {
  name: 'app',
  data() {
    return {
      // 除了在option配置项中的value字段中设置初始值，也可以直接传递model对象赋初值
      model: {},

      setByFieldInner: null,

      api: null,

      // layout布局配置项 同element-ui中Layout 中 Row Attributes
      // layout只要存在，不管是不是{}，都会去按照el-row el-col去布局
      // 对el-form-item进行的布局
      layout: {
        col: {
          span: 24,
        },
      },

      // el-form 表单整体配置（除model配置项，因为内部已拦截）
      config: {
        labelWidth: '120px',
        // Since you're using inline Form, you need to explicitly assign a width to Slider
        // 当你使用内联from时，必须给el-slider一个固定的宽度，这是element-ui原生要求
        // inline: true,
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
        // container: 'draggable',
        // 表单控件是否充满表单域
        full: true,
        // 表单模式
        // 详情模式 form：表单模式 desc：描述性模式
        detailPattern: 'form',
      },

      // 表单项生成配置
      options: formData,

      // 各个表单项相同的配置项
      unifyOptions: {
        attrs: {},
        config: {
          // labelWidth: '240px',
        },
      },
      // 表单校验规则
    }
  },
  mounted() {
    // setByField(this.options, 'input', 'label', '变了')
    // setByField(this.options, 'inputNumber', 'value', '变了11')
    // console.log(setByField, '内置方法')
    console.log(this.options, '配置项')
    // setInterval(() => {
    //   console.log(this.model, '---')
    // }, 2000)
    // setByField(this.options, 'autoComplete', 'value', '1')
    // console.log(this.options, '配置项更新完毕')
    // console.log(this.model, '------双向绑定值------')
    // setInterval(() => {
    //   // 这样的写法将会触发两次表单更新 因为这个写法改变了model的原有引用值
    //   this.model = {
    //     inputNumber: new Date().getSeconds(),
    //     input: new Date().getSeconds(),
    //   }
    // }, 3000)
    // this.model.input = '123'
    // setInterval(() => {
    //   console.log(this.model, '双向绑定值')
    //   // 这样的写法只会触发一次表单更新
    //   this.model.input = new Date().getSeconds() + 100
    //   this.model.inputNumber = new Date().getSeconds()
    // }, 2000)
  },
  methods: {
    renderComplete(val) {
      console.log(val, 'api')
      const { setByField, insertByField } = val.operaMethods
      this.setByFieldInner = setByField
      // setInterval(() => {
      // setByField('input', 'value', new Date().getSeconds() + 100)
      //   setByField('city', 'attrs.options', [
      //     {
      //       value: 'Chengdu',
      //       label: '成都',
      //     },
      //     {
      //       value: 'Shenzhen1',
      //       label: '深圳',
      //     },
      //     {
      //       value: 'Guangzhou1',
      //       label: '广州',
      //     },
      //     {
      //       value: 'Dalian1',
      //       label: '大连',
      //     },
      //   ])
      // }, 2000)
    },
    validate() {
      // console.log('触发表单校验')
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
