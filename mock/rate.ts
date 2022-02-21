const rate = {
  // 表单项渲染类型 必需
  type: 'Rate',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'rate',
  // 初始值
  value: null,
  // 表单项的配置项
  attrs: {
    // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
    iconClasses: [
      'el-icon-cloudy',
      'el-icon-partly-cloudy',
      'el-icon-cloudy-and-sunny',
    ],
    voidIconClass: 'el-icon-cloudy',
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
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
    ref: 'rate',
    label: 'rate：',
    // labelWidth: '120px',
  },
}
export default rate
