import { CreateElement } from 'vue'
const input = {
  // 表单项渲染类型 必需
  type: 'Input',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项的配置项
  attrs: {
    type: 'text',
    // 表单项绑定的值（字段名） 必需
    field: 'input',
    // 初始值
    value: 'input初始值',
  },
  // 表单项事件
  // on: {
  //   blur: () => {
  //     console.log('input', '失去焦点')
  //   },
  //   input: () => {
  //     console.log('input', 'input事件')
  //   },
  // },
  // 插槽
  // scopedSlots: {
  //   prefix: ({ h, value }: { h: CreateElement, value: any }) => {
  //     return h('div', '表单内头部内容')
  //   },
  //   suffix: () => {
  //     return '表单内尾部内容'
  //   },
  //   prepend: () => {
  //     return '表单前置插槽'
  //   },
  //   append: () => {
  //     return '表单后置插槽'
  //   },
  // },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为[field] 利用此属性来查找某一组件
    ref: 'input',
    label: 'input：',
    // labelWidth: '120px',

    // 外部的config中的rules会失效
    rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  },
}

export default input
