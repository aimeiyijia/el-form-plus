import Vue, { VNode, CreateElement } from 'vue'
import { Fragment } from 'vue-fragment'

interface IButtonsConfig {
  confirm: boolean
  confirmText: string
  reset: boolean
  resetText: string
  cancel: boolean
  cancelText: string
}

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

// 是否渲染确认(提交)按钮
function isRenderConfirmButton(
  h: CreateElement,
  config: {
    confirm: boolean
    confirmText: string
  }) {
  const { confirm = true, confirmText = '确认' } = config
  return confirm ? h('el-button', {}, confirmText) : ''
}
// 是否渲染重置按钮
function isRenderResetButton(
  h: CreateElement,
  config: {
    reset: boolean
    resetText: string
  }) {
  const { reset = true, resetText = '重置' } = config
  return reset ? h('el-button', {}, resetText) : ''
}
// 是否渲染取消按钮
function isRenderCancleButton(
  h: CreateElement,
  config: {
    cancel: boolean
    cancelText: string
  }) {
  const { cancel = true, cancelText = '取消' } = config
  return cancel ? h('el-button', {}, cancelText) : ''
}

function renderButtons(config: IButtonsConfig) {
  // 默认的提交 重置按钮
  // 用内置的Custom类型生成
  const buttons = {
    // 表单项渲染类型 必需
    type: 'Custom',
    field: new Date(),
    // on: {
    //   click: ({ instance }: { instance: Vue }) => {
    //     const elForm = findElFormComponent(instance)
    //     if (elForm) {
    //       elForm.validate((valid: boolean) => {
    //         if (valid) {
    //           alert('submit!');
    //           return true
    //         } else {
    //           alert('error submit!!');
    //           return false;
    //         }
    //       });
    //     }
    //   }
    // },
    // more: [
    //   {
    //     type: 'Button',
    //     field: 'reset',
    //     value: '重置',
    //     on: {
    //       click: ({ instance }: { instance: Vue }) => {
    //         const elForm = findElFormComponent(instance)
    //         if(elForm){
    //           elForm.resetFields();
    //         }
    //       },
    //     },
    //   },
    // ],
    scopedSlots: {
      // jsx或h
      // 这样就可以实现自定义组件的双向绑定
      custom: ({ instance }: { instance: Vue }) => {
        console.log(instance)
        const h = instance.$createElement
        return h('Fragment', [
          isRenderConfirmButton(h, config),
          isRenderResetButton(h, config),
          isRenderCancleButton(h, config)
        ])
      },
    },
    config: {
      // el-form-item所占据的空间
      col: {
        span: 24,
      },
    },
  }

  return buttons
}

export default renderButtons
