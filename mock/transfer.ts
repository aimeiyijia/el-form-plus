const generateData = () => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const transfer = {
  // 表单项渲染类型 必需
  type: 'Transfer',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'transfer',
  // 初始值
  value: [1],
  // 表单项的配置项
  attrs: {
    filterable: true,
    leftDefaultChecked: [2, 3],
    rightDefaultChecked: [1],
    titles: ['Source', 'Target'],
    buttonTexts: ['到左边', '到右边'],
    format: {
      noChecked: '${total}',
      hasChecked: '${checked}/${total}',
    },
    data: generateData(),
  },
  // 表单项事件
  on: {
    change: () => {
      console.log('失去焦点')
    },
    input: () => {
      console.log('input事件')
    },
    'left-check-change'(val: any) {
      console.log(val, '左侧树事件')
    },
  },
  // 插槽
  // scopedSlots: {
  //   default(option){
  //     console.log(option)
  //     return 123
  //   },
  //   'left-footer'() {
  //     return '左侧底部自定义'
  //   },
  // },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'transfer',
    label: 'transfer：',
    // labelWidth: '120px',
  },
}
export default transfer
