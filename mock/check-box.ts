const checkbox = {
  // 表单项渲染类型 必需
  type: 'CheckBox',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'checkBox',
  value: [1, 2],
  detail: {
    // separator: '-',
    // 这里的value会覆盖外面的value，不做任何处理会直接渲染出来
    // value: '456789',
  },
  // 表单项的配置项
  attrs: {
    // disabled: true,
    options: [
      {
        label: '值为1',
        value: 1,
        // 该项就渲染为el-checkbox-button
        // type: 'button',
      },
      {
        label: '值为2',
        value: 2,
      },
    ],
  },
  // 表单项事件
  on: {
    change: (val: any) => {
      console.log('groupChange', val)
    },
  },
  // 插槽
  scopedSlots: {},
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'checkBox',
    label: 'checkBox：',
    labelWidth: '120px',
  },
}
export default checkbox
