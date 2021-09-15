// 默认的提交 重置按钮
// 用内置的Custom类型生成
const buttons = {
  // 表单项渲染类型 必需
  type: 'Button',
  field: 'submit',
  value: '提交',
  attrs: {
    type: 'primary',
  },
  more: [
    {
      type: 'Button',
      field: 'reset',
      value: '重置',
    },
  ],
  config: {
    // el-form-item所占据的空间
    col: {
      span: 12,
    },
  },
}

export default buttons
