const select = {
  // 表单项渲染类型 必需
  type: 'Select',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'city',
  // 初始值
  value: 'Chengdu',
  // 表单项的配置项
  attrs: {
    clearable: true,

    groupOptions: [
      {
        // 分组名称
        label: '中国城市',
        options: [
          {
            // value做key
            value: 'Chengdu',
            label: '成都',
            slot: (o: any) => {
              const { attr } = o
              console.log()
              // return h(<span style="float: left">{attr.label}</span>)
              return 23
            },
          },
          {
            value: 'Shenzhen',
            label: '深圳',
            slot: () => {},
          },
          {
            value: 'Guangzhou',
            label: '广州',
            slot: () => {},
          },
          {
            value: 'Dalian',
            label: '大连',
            slot: () => {},
          },
        ],
      },
    ],
    // select options
    options: [
      {
        value: 'Chengdu1',
        label: '成都',
      },
      {
        value: 'Shenzhen1',
        label: '深圳',
      },
      {
        value: 'Guangzhou1',
        label: '广州',
      },
      {
        value: 'Dalian1',
        label: '大连',
      },
    ],
  },
  // 表单项事件
  on: {
    blur: () => {
      console.log('失去焦点')
    },
    input: () => {
      console.log('input事件')
    },
  },
  // 插槽
  // scopedSlots: {
  //   prefix: () => {
  //     return '表单内头部内容'
  //   },
  //   empty: () => {
  //     return '空'
  //   },
  // },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'select',
    label: 'select：',
    // labelWidth: '120px',
  },
}
export default select
