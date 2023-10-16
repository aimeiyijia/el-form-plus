import Vue, { DirectiveOptions, VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

const directive: DirectiveOptions = {
  inserted: function(el: HTMLElement, binding: DirectiveBinding) {
    console.log(binding, 'binding')
    const { value: bindingValue } = binding
    const { precision } = bindingValue
    let inputEl = el as HTMLElement as HTMLInputElement
    // 获取input节点
    if (inputEl.tagName.toLocaleUpperCase() !== 'INPUT') {
      inputEl = inputEl.getElementsByTagName('input')[0]
    }

    // 初始化时，格式化值为千分位
    const numberValue = parseFloat(inputEl.value.replace(/,/g, ''))
    if (!isNaN(numberValue)) {
      inputEl.value = numberValue.toLocaleString('zh', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
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
        inputEl.value = onBlurValue.toLocaleString('zh', {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        })
      }
    }
  },
}

Vue.directive('thousands', directive)
