const tree = {
  // 表单项渲染类型 必需
  type: 'Tree',
  // 表单项绑定的值（字段名） 必需
  field: 'tree',
  // 初始值
  value: [1],
  // 表单项的配置项
  attrs: {
    data: [
      {
        label: '一级 1',
        children: [
          {
            label: '二级 1-1',
            children: [
              {
                label: '三级 1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 2',
        children: [
          {
            label: '二级 2-1',
            children: [
              {
                label: '三级 2-1-1',
              },
            ],
          },
          {
            label: '二级 2-2',
            children: [
              {
                label: '三级 2-2-1',
              },
            ],
          },
        ],
      },
      {
        label: '一级 3',
        children: [
          {
            label: '二级 3-1',
            children: [
              {
                label: '三级 3-1-1',
              },
            ],
          },
          {
            label: '二级 3-2',
            children: [
              {
                label: '三级 3-2-1',
              },
            ],
          },
        ],
      },
    ],
  },
  // 表单项事件
  on: {
    change: () => {
      console.log('失去焦点')
    },
  },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'tree',
    label: 'tree：',
    // labelWidth: '120px',
  },
}
export default tree
