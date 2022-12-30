const selectTree = {
  // 表单项渲染类型 必需
  type: 'SelectTree',
  // 表单项绑定的值（字段名） 必需
  field: 'selectTree',
  value: '',
  // 表单项的配置项
  attrs: {
    data: [
      {
        label: '乌鲁木齐市',
        value: '2',
        children: [
          { label: '达坂城区', value: '7' },
          { label: '头屯河区', value: '8' },
          { label: '乌鲁木齐县', value: '9' },
        ],
      },
    ],
    filterable: true,
    multiple: true,
    'show-checkbox': true,
  },
  // 表单项事件
  on: {
    blur: () => {
      console.log('失去焦点')
    },
    input: (val: any) => {
      console.log('input事件', val)
    },
  },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'selectTree',
    label: 'selectTree: ',
    labelWidth: '120px',
  },
}
export default selectTree
