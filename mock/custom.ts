import Vue from 'vue'
const custom = {
  // 表单项渲染类型 必需
  type: 'Custom',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需（为了不破坏内部的更新逻辑）
  field: 'custom',
  // 初始值
  value: '123456',
  // 表单项的配置项
  attrs: {},

  scopedSlots: {
    // jsx或h
    // 这样就可以实现自定义组件的双向绑定
    custom: 'custom123'
  },

  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为[field] 利用此属性来查找某一组件
    ref: 'input',
    label: 'customInput：',
    // labelWidth: '120px',

    // el-form-item所占据的空间
    col: {
      span: 24,
    },

    // 外部的config中的rules会失效
    // 自定义组件校验目前仅支持change事件
    rules: [
      { required: true, message: '请输入自定义表单值', trigger: 'change' },
    ],
  },
}

export default custom
