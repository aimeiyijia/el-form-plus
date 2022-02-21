const timeselect = {
  // 表单项渲染类型 必需
  type: 'TimeSelect',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'timeSelect',
  // 初始值
  value: '',
  // 表单项的配置项
  attrs: {
    pickerOptions: {
      start: '08:30',
      step: '00:15',
      end: '18:30',
    },
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
    ref: 'timeSelect',
    label: 'timeSelect：',
    labelWidth: '120px',
  },
}
export default timeselect
