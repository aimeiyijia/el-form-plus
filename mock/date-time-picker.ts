const datetimepicker = {
  // 表单项渲染类型 必需
  type: 'DateTimePicker',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'dateTimePicker',
  // 初始值
  value: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
  // 表单项的配置项
  attrs: {
    type: 'datetimerange',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    // string[]
    defaultTime: ['12:00:00', '08:00:00'],
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
  scopedSlots: {
    // 插槽名目前不适用驼峰
    'range-separator'() {
      return '分割'
    },
  },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'dateTimePicker',
    label: 'dateTimePicker：',
    labelWidth: '120px',
  },
}
export default datetimepicker
