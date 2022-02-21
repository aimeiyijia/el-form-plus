const autocomplete = {
  // 表单项渲染类型 必需
  type: 'Autocomplete',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'autoComplete',
  // 初始值
  value: '2',
  // 表单项的配置项
  attrs: {
    fetchSuggestions: (queryString: string, callback: Function) => {
      callback([
        { value: '1', address: '1' },
        { value: '2', address: '2' },
        { value: '3', address: '3' },
      ])
    },
  },
  // 表单项事件
  on: {
    select: (val: any) => {
      console.log('选中值变化', val)
    },
    change: (val: any) => {
      console.log('Input 值改变并失去焦点', val)
    },
    input: (val: any) => {
      console.log('Input 值改变', val)
    },
  },
  // 插槽
  // scopedSlots: {
  //   // 默认插槽 包含 {item, value, h}
  //   default(scoped: any) {
  //     console.log(scoped, '123')
  //   },
  // },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'autoComplete',
    label: 'autoComplete：',
    labelWidth: '120px',
  },
}
export default autocomplete
