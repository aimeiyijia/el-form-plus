import Vue, { DirectiveOptions, VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import currency from 'currency.js'

type Options = {
  symbol: string
  separator: string
  precision: number
}
function formatVal(val: number, options: Options) {
  // {
  //   symbol: '%',
  //   separator: ',j',
  //   precision: 2,
  // }
  return currency(val, options).format()
}
const directive: DirectiveOptions = {
  inserted: function(el: HTMLElement, binding: DirectiveBinding) {
    const { value: bindingValue } = binding
    console.log(bindingValue, '指令值')
    const { precision, thousand } = bindingValue
    let inputEl = el as HTMLElement as HTMLInputElement
    // 获取input节点
    if (inputEl.tagName.toLocaleUpperCase() !== 'INPUT') {
      inputEl = inputEl.getElementsByTagName('input')[0]
    }

    // 初始化时，格式化值为千分位
    const numberValue = parseFloat(inputEl.value.replace(/,/g, ''))
    if (!isNaN(numberValue)) {
      inputEl.value = formatVal(numberValue, {
        ...thousand,
        precision,
      })
    }

    // 聚焦时转化为数字格式（去除千分位）
    inputEl.onfocus = () => {
      inputEl.value = parseFloat(inputEl.value.replace(/,/g, '')).toFixed(
        precision
      )
    }

    // 失去焦点时转化为千分位
    inputEl.onblur = () => {
      const onBlurValue = parseFloat(inputEl.value.replace(/,/g, ''))
      if (!isNaN(onBlurValue)) {
        inputEl.value = formatVal(onBlurValue, {
          ...thousand,
          precision,
        })
      }
    }
  },
}

Vue.directive('thousands', directive)
