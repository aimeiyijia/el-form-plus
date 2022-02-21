const slider = {
  // 表单项渲染类型 必需
  type: 'Slider',
  // 表单项绑定的值（字段名） 必需
  field: 'slider',
  // 初始值
  value: [4, 60],
  // 表单项的配置项
  attrs: {
    range: true,
    showStops: true,
    max: 100,
    marks: {
      0: '0°C',
      8: '8°C',
      37: '37°C',
      50: {
        style: {
          color: '#1989FA',
        },
        label: '20%',
      },
    },
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
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'slider',
    label: 'slider：',
    // labelWidth: '120px',
  },
}
export default slider
