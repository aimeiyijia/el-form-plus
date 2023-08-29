import Vue from 'vue'
import { cloneDeep } from 'lodash'
export function isString(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Array]'
}

export function isMultiDimension(val: any): Boolean {
  return val.some((item: any) => item instanceof Array)
}

export function isBoolean(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

export function isHtmlElement(node: any): boolean {
  return node && node.nodeType === Node.ELEMENT_NODE
}

/**
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
let isFunction = (functionToCheck: any) => {
  const getType = {}
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

export const isUndefined = (val: any) => {
  return typeof val === 'undefined'
}

export const isDefined = (val: any) => {
  return val !== undefined && val !== null
}

export const isEmpty = function(val: any) {
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

export const kebabCase = function(str: string): string {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export const capitalize = function(str: string): string {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function deepQuery(
  tree: any,
  value: string,
  matchMark = 'value',
  children = 'children'
) {
  let isGet = false
  let target = null
  function deepSearch(tree: any, value: string) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i][children] && tree[i][children].length > 0) {
        deepSearch(tree[i][children], value)
      }
      if (value === tree[i][matchMark] || isGet) {
        isGet || (target = tree[i])
        isGet = true
        break
      }
    }
  }
  deepSearch(tree, value)
  return target
}

// JS对象深度合并
export function deepMerge(target: any = {}, source: any = {}) {
  target = cloneDeep(target)
  if (
    typeof target !== 'object' ||
    target === null ||
    typeof source !== 'object' ||
    source === null
  )
    return target
  const merged = Array.isArray(target)
    ? target.slice()
    : Object.assign({}, target)
  for (const prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop)) continue
    const sourceValue = source[prop]
    const targetValue = merged[prop]
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue)
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue)
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue)
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue)
    } else if (typeof sourceValue === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue)
    } else {
      merged[prop] = sourceValue
    }
  }
  return merged
}
