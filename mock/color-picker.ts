const colorpicker = {
  // 表单项渲染类型 必需
  type: 'ColorPicker',
  // 表单项绑定的值（字段名） 必需
  field: 'colorPicker',
  // 初始值
  value: '#409EFF',
  // 表单项的配置项
  attrs: {
    showAlpha: true,
    predefine: [
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
    ],
  },
  // 表单项事件
  on: {
    change: () => {
      console.log('change')
    },
    // 事件不支持驼峰
    'active-change': () => {
      console.log('activeChange')
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
    ref: 'colorPicker',
    label: 'colorPicker：',
    labelWidth: '120px',
  },
}
export default colorpicker
