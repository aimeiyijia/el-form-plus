import Vue, { DirectiveOptions, VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import currency from 'currency.js'

type ThousandConfig = {
  symbol: string
  separator: ','
}
type Options = {
  precision: number
  integer: number
  thousand: ThousandConfig
}

function generateZero(length: number) {
  if (length <= 0) {
    return ''
  }

  return '0'.repeat(length)
}

function extractDecimalParts(str: string, options?: Options): any {
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
    const fractionPart = generateZero(precision)
    if (precision > 0) {
      hasPrecision = true
    }

    return {
      decimalPart,
      fractionPart,
      hasPrecision,
    }
  }
}

function assembleDecimalParts(val: number | string, options?: Options) {
  const str = val.toString() // 第一步：转成字符串
  // .replace(/[^\d^.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
  // .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
  // .replace(/^\./, '') // 第四步：如果输入的第一位为小数点，替换为空
  const parts = extractDecimalParts(str, options)
  console.log(parts, 'parts')
  const { decimalPart, fractionPart, hasPrecision } = parts
  if (hasPrecision) {
    return decimalPart + '.' + fractionPart
  }
  return decimalPart
}

function addCommas(number: any, options: Options) {
  const { symbol = '', separator = ',' } = options.thousand || {}
  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return symbol + parts.join('.')
}

function formatMoney(num: any, options: Options) {
  const decimalPartsValue = assembleDecimalParts(num, options)
  const thousands = addCommas(decimalPartsValue, options)
  return thousands
}

const directive: DirectiveOptions = {
  inserted: function(el: HTMLElement, binding: DirectiveBinding) {
    const { value: bindingValue } = binding
    const { precision } = bindingValue
    let inputEl = el as HTMLElement as HTMLInputElement
    // 获取input节点
    if (inputEl.tagName.toLocaleUpperCase() !== 'INPUT') {
      inputEl = inputEl.getElementsByTagName('input')[0]
    }

    // 聚焦时转化为数字格式（去除千分位）
    inputEl.onfocus = () => {
      inputEl.value = inputEl.value
        ? parseFloat(inputEl.value.replace(/,/g, '')).toFixed(precision)
        : inputEl.value
    }

    // 失去焦点时转化为千分位
    inputEl.onblur = () => {
      const onBlurValue = parseFloat(inputEl.value.replace(/,/g, ''))
      if (!isNaN(onBlurValue)) {
        inputEl.value = formatMoney(onBlurValue, bindingValue)
      }
    }
  },
}

Vue.directive('thousands', directive)
