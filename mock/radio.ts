const radio = {
  // 表单项渲染类型 必需
  type: 'Radio',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'radio',
  // 初始值
  value: 1,
  // 表单项的配置项
  attrs: {
    // 是否渲染成组
    isGroup: true,
    options: [
      {
        lable: 1,
        value: 1,
      },
      {
        lable: 2,
        value: 2,
      },
    ],
  },
  // 表单项事件
  on: {
    change: () => {
      console.log('singleChange')
    },
  },
  // 插槽
  scopedSlots: {},
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'radio',
    label: 'radio：',
    // labelWidth: '120px',
  },
}
export default radio
