const inputnumber = {
  // 表单项渲染类型 必需
  type: 'InputNumber',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  label: '输入框：',
  // 表单项绑定的值（字段名） 必需
  field: 'inputNumber',
  // 初始值
  value: '',
  // 表单项的配置项
  attrs: {
    controlsPosition: 'right',
    max: 500,
  },
  // 表单项事件
  on: {
    blur: () => {
      console.log('input-number失去焦点')
    },
    change: () => {
      console.log('change-number事件')
    },
  },
  // 插槽
  scopedSlots: {},
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'inputNumber',
    labelWidth: '120px',
  },
}
export default inputnumber
