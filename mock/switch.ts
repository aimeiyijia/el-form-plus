const switchdata = {
  // 表单项渲染类型 必需
  type: 'Switch',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'switch',
  // 初始值
  value: false,
  // 表单项的配置项
  attrs: {
    activeColor: '#13ce66',
    inactiveColor: '#ff4949',
    activeText: '按月付费',
    inactiveText: '按年付费',
  },
  // 表单项事件
  on: {
    change: () => {
      console.log('change事件')
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
    ref: 'switch',
    label: 'switch：',
    // labelWidth: '120px',
  },
}
export default switchdata
