import Vue, { VNode, CreateElement } from 'vue'
import { Form } from 'element-ui'

interface IButtonsConfig {
  confirm?: boolean
  confirmText?: string
  reset?: boolean
  resetText?: string
  cancel?: boolean
  cancelText?: string
}

function findElFormComponent(instance: Vue): any {
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
    return parent
  }
  return false
}

// 是否渲染确认(提交)按钮
function isRenderConfirmButton(
  h: CreateElement,
  config: {
    confirm?: boolean
    confirmText?: string
  },
  instance: Form) {
  const { confirm = true, confirmText = '确认' } = config
  return confirm ?
    h('el-button',
      {
        props: {
          type: "primary"
        },
        on: {
          click: () => {
            const elForm = findElFormComponent(instance)
            if (elForm) {
              elForm.validate((valid: boolean) => {
                if (valid) {
                  elForm.$emit('submit', elForm.model)
                  return true
                } else {
                  elForm.$emit('error-submit')
                  return false;
                }
              });
            }
          }
        },
      },
      confirmText)
    : ''
}
// 是否渲染重置按钮
function isRenderResetButton(
  h: CreateElement,
  config: {
    reset?: boolean
    resetText?: string
  },
  instance: Form) {
  const { reset = true, resetText = '重置' } = config
  return reset ?
    h('el-button', {
      on: {
        click: () => {
          const elForm = findElFormComponent(instance)
          if (elForm) {
            elForm.resetFields()
          }
        }
      },
    }, resetText)
    : ''
}

function renderButtons(config: IButtonsConfig) {
  // 默认的提交 重置按钮
  // 用内置的Custom类型生成
  const buttons = {
    // 表单项渲染类型 必需
    type: 'Custom',
    field: 'ButtonCustom',
    scopedSlots: {
      // jsx或h
      // 这样就可以实现自定义组件的双向绑定
      custom: ({ instance }: { instance: Form }) => {
        console.log(instance)
        const h = instance.$createElement
        return h('Fragment', [
          isRenderConfirmButton(h, config, instance),
          isRenderResetButton(h, config, instance),
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
