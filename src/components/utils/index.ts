export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

/**
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
let isFunction = functionToCheck => {
  var getType = {}
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}

if (
  typeof /./ !== 'function' &&
  typeof Int8Array !== 'object' &&
  (Vue.prototype.$isServer || typeof document.childNodes !== 'function')
) {
  isFunction = function(obj) {
    return typeof obj === 'function' || false
  }
}

export { isFunction }

export const isUndefined = val => {
  return val === void 0
}

export const isDefined = val => {
  return val !== undefined && val !== null
}

export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export const capitalize = function(str) {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
