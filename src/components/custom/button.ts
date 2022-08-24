import Vue, { VNode, CreateElement } from 'vue'
function findElFormComponent(instance: Vue): any {
  console.log(instance, '实例')
  const componentName = 'ElForm'
  let parent = instance.$parent || instance.$root;
  let name = (parent.$options as any).componentName;

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = (parent.$options as any).componentName;
    }
  }
  if (parent) {
    console.log(parent, '父组件')
    return parent
  }
  return false
}

// 默认的提交 重置按钮
// 用内置的Custom类型生成
const buttons = {
  // 表单项渲染类型 必需
  type: 'Button',
  field: 'submit',
  // 按钮的value就是它的提示
  value: '提交',
  attrs: {
    type: 'primary',
  },
  on: {
    click: ({ instance }: { instance: Vue }) => {
      const elForm = findElFormComponent(instance)
      if (elForm) {
        elForm.validate((valid: boolean) => {
          if (valid) {
            alert('submit!');
            return true
          } else {
            alert('error submit!!');
            return false;
          }
        });
      }

    }
  },
  more: [
    {
      type: 'Button',
      field: 'reset',
      value: '重置',
      on: {
        click: ({ instance }: { instance: Vue }) => {
          const elForm = findElFormComponent(instance)
          if(elForm){
            elForm.resetFields();
          }
        },
      },
    },
  ],
  // layout: {
  //   gutter: 20
  // },
  col: {span: 10},
  config: {
    // el-form-item所占据的空间
    col: {
      span: 12,
    },
  },
}

export default buttons
