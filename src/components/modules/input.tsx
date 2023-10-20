import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isBoolean, isFunction, isObject } from '../utils'
import '../directives/thousands'

function generateZero(length: number) {
  if (length <= 0) {
    return ''
  }

  return '0'.repeat(length)
}

type Options = {
  precision: number
  integer: number
}
type ExtractDecimalParts = {
  decimalPart: string
  fractionPart: string
  hasPrecision: boolean
}

@Component
export default class InputPlus extends Vue {
  extractDecimalParts(str: string, options?: Options): ExtractDecimalParts {
    const { integer = 14, precision = 2 } = options || {}
    const decimalIndex = str.indexOf('.')
    if (decimalIndex !== -1) {
      const decimalPart = str.substring(0, decimalIndex).slice(0, integer)
      const fractionPart = str.substring(
        decimalIndex + 1,
        decimalIndex + 1 + precision
      )
      return { decimalPart, fractionPart, hasPrecision: true }
    } else {
      let hasPrecision = false
      const decimalPart = str.slice(0, integer)
      let fractionPart = ''
      if (precision > 0) {
        hasPrecision = true
        fractionPart = generateZero(precision)
        const elInputRef = this.$refs.elInputRef as Vue
        const inputEl = elInputRef.$refs.input as HTMLInputElement
        setTimeout(() => {
          inputEl.setSelectionRange(1, 1)
        }, 0)
      }

      return {
        decimalPart,
        fractionPart,
        hasPrecision,
      }
    }
  }

  assembleDecimalParts(val: number | string, options?: Options) {
    const str = val
      .toString() // 第一步：转成字符串
      .replace(/[^\d^.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
      .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
      .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
    const parts = this.extractDecimalParts(str, options)
    const { decimalPart, fractionPart, hasPrecision } = parts
    if (hasPrecision) {
      return decimalPart + '.' + fractionPart
    }
    return decimalPart
  }

  customInput(val: any) {
    const { precision, integer } = this.digitConfig as any
    const { input } = this.$listeners as any
    if (!input) return
    if (isFunction(input)) {
      const finalVal = this.assembleDecimalParts(val, {
        precision,
        integer,
      })
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

    if (value && this.digitExit) {
      const { precision, integer } = this.digitConfig as any
      const showValue = this.assembleDecimalParts(value, {
        precision,
        integer,
      })
      return showValue
    }
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
