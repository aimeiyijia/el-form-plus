const checkbox = {
  // 表单项渲染类型 必需
  type: 'CheckBox',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'checkBox',

  // 只需要渲染一个checkbox时，设置label属性 value初始值为boolean类型
  // 注意 只要有options此配置项，那么就只能渲染checkbox组了
  label: '就一个',
  // 表单项的配置项
  attrs: {
    // value: true,
    // disabled: true,
    // 设置全局的checkbox类型，优先级低于options内部的type属性（el-checkbox-button）
    type: 'button',
    // 初始值
    value: [1],
    options: [
      {
        label: '1',
        value: 1,
        // 只要这个属性存在,该项就渲染为el-checkbox
        type: '',
      },
      {
        // 还是 el-checkbox-button
        label: '2',
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
