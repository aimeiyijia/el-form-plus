const input = {
  // 表单项渲染类型 必需
  type: 'Input',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'input',
  // 初始值
  value: 'input初始值',
  // 表单项的配置项
  attrs: {
    type: 'text',
  },
  // 渲染更多的表单项
  // 配置项相同，因为是渲染在同一个el-form-item中所以无config配置，也不支持
  more: [
    {
      type: 'Input',
      // 表单是否隐藏 默认为false（控制的是el-form-item）
      hidden: false,
      // 表单项绑定的值（字段名） 必需
      field: 'moreinput',
      // 初始值
      value: 'moreinput初始值',
      // 表单项的配置项
      attrs: {},
      col: {
        span: 11,
      },
    },
  ],
  // 在有more配置项时的el-form-item的内部布局方式
  layout: {
    gutter: 20,
  },
  // 该表单项在el-form-item占据的空间
  col: {
    span: 11,
  },

  // 某表单项的包裹组件
  // container: a => {
  //   console.log(a, '123')
  //   return 'div'
  // },
  // 表单项事件
  // on: {
  //   blur: () => {
  //     console.log('input', '失去焦点')
  //   },
  //   input: () => {
  //     console.log('input', 'input事件')
  //   },
  // },
  // 插槽
  // scopedSlots: {
  //   prefix: ({ h, value }: { h: CreateElement, value: any }) => {
  //     return h('div', '表单内头部内容')
  //   },
  //   suffix: () => {
  //     return '表单内尾部内容'
  //   },
  //   prepend: () => {
  //     return '表单前置插槽'
  //   },
  //   append: () => {
  //     return '表单后置插槽'
  //   },
  // },

  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为[field] 利用此属性来查找某一组件
    ref: 'input',
    label: 'input：',
    // labelWidth: '120px',

    // el-form-item所占据的空间
    col: {
      span: 12,
    },

    // 包裹el-form-item的组件
    // 组件名/标签名
    // 请确保该组件存在可用插槽
    // string / Function
    container: (a: any) => {
      return 'div'
    },

    // 外部的config中的rules会失效
    rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  },
}

export default input
