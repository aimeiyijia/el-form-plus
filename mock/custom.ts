import vue from 'vue'
const custom = {
  // 表单项渲染类型 必需
  type: 'Custom',
  // jsx或h
  // 这样就可以实现自定义组件的双向绑定
  customNode: ({ instance }) => {
    console.log(instance)
    return instance.$createElement(
      'span',
      {
        on: {
          click: () => {
            instance.$emit('input', '自定义组件值')
          },
        },
      },
      instance.$attrs.value
    )
  },
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'input',
  // 初始值
  value: '自定义表单',
  // 表单项的配置项
  attrs: {},

  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为[field] 利用此属性来查找某一组件
    ref: 'input',
    label: 'input：',
    // labelWidth: '120px',

    // el-form-item所占据的空间
    col: {
      span: 24,
    },

    // 外部的config中的rules会失效
    rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  },
}

export default custom
