import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isBoolean, isFunction, isObject } from '../utils'
import '../directives/thousands'

// const elInputRef = this.$refs.elInputRef as Vue
//         const inputEl = elInputRef.$refs.input as HTMLInputElement
//         setTimeout(() => {
//           inputEl.setSelectionRange(1, 1)
//         }, 0)

@Component
export default class InputPlus extends Vue {
  customInput(val: any) {
    const { precision } = this.digitConfig
    const { input } = this.$listeners as any
    if (!input) return
    if (isFunction(input)) {
      const finalVal = val
      input.call(this, finalVal)
    }
  }

  get digitExit() {
    const { digit } = this.$attrs
    if (!digit) return false
    if (isBoolean(digit)) {
      return digit
    }
    if (isObject(digit)) {
      return true
    }
    return false
  }

  get digitConfig() {
    const { digit } = this.$attrs as any
    const defaultThousandConfig = {
      symbol: '',
      separator: ',',
    }
    const defaultDigitConfig = {
      precision: 2,
      integer: 14,
      thousand: defaultThousandConfig,
    }
    // digit: {}
    if (isObject(digit)) {
      const { thousand } = digit
      if (isBoolean(thousand) && thousand) {
        digit.thousand = {
          symbol: '',
          separator: ',',
        }
      }
      if (isObject(thousand)) {
        digit.thousand = Object.assign(defaultThousandConfig, digit.thousand)
      }
      return Object.assign(defaultDigitConfig, digit)
    }
    // digit: true
    if (isBoolean(digit) && digit) {
      return defaultDigitConfig
    }
    return defaultDigitConfig
  }

  get hasDirectives() {
    const { thousand } = this.digitConfig
    return this.digitExit && thousand
  }

  get directives() {
    const directives = this.hasDirectives
      ? [
          {
            name: 'thousands',
            value: this.digitConfig,
          },
        ]
      : []
    return directives
  }

  get listeners() {
    return this.digitExit
      ? {
          ...this.$listeners,
          input: this.customInput,
        }
      : this.$listeners
  }

  renderValue() {
    const { value } = this.$attrs

    // if (value && this.digitExit) {
    //   const { precision, integer } = this.digitConfig as any
    //   const showValue = this.assembleDecimalParts(value, {
    //     precision,
    //     integer,
    //   })
    //   return showValue
    // }
    return value
  }

  render(h: CreateElement): VNode {
    const showValue = this.renderValue()
    // 组装插槽及作用域插槽
    const scopedSlots: any = this.$scopedSlots
    const slots = []
    const customScopedSlots: any = {}
    for (const slot in scopedSlots) {
      // el-input内部使用了 v-if="$slots.[slotName]"来判断是否有插槽
      // 因此这一步是骗它有插槽，然后再用scopedSlots来实现自定义渲染函数渲染插槽内容
      slots.push({ name: slot, value: [h('template')] })
      // 插槽额外增加h函数，便于生成vnode
      customScopedSlots[slot] = () => {
        return scopedSlots[slot]({ h, value: this.$attrs.value })
      }
    }
    return (
      <el-input
        ref="elInputRef"
        {...{ directives: this.directives }}
        {...{
          attrs: { ...this.$attrs, value: showValue },
          props: { ...this.$attrs, value: showValue },
          on: this.listeners,
          scopedSlots: customScopedSlots,
        }}
      >
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </el-input>
    )
  }
}
