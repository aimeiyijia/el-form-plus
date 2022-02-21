const timepicker = {
  // 表单项渲染类型 必需
  type: 'TimePicker',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'timePicker',
  // 初始值
  value: '',
  // 表单项的配置项
  attrs: {
    isRange: true,
    rangeSeparator: '至',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    placeholder: '选择时间范围',
  },
  // 表单项事件
  on: {
    blur: () => {
      console.log('失去焦点')
    },
    input: () => {
      console.log('input事件')
    },
  },
  // 插槽
  scopedSlots: {},
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'timePicker',
    label: 'timePicker：',
    labelWidth: '120px',
  },
  // todo 在一个el-form-item中渲染其它类型的表单
  more: [],
}
export default timepicker
