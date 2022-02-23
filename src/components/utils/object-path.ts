//  https://github.com/mariocasciaro/object-path  by @mariocasciaro
// 主要是为了方便维护 所以将源码直接拷贝过来，改了改，并且加了些其它的工具类
const toStr = Object.prototype.toString
function hasOwnProperty(obj: object, prop: string | number): boolean {
  if (obj == null) {
    return false
  }
  // to handle objects with null prototypes (too edge case?)
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function isEmpty(value: any): boolean {
  if (!value) {
    return true
  }
  if (isArray(value) && value.length === 0) {
    return true
  } else if (typeof value !== 'string') {
    for (const i in value) {
      if (hasOwnProperty(value, i)) {
        return false
      }
    }
    return true
  }
  return false
}

function toString(type: any): string {
  return toStr.call(type)
}

function isObject(obj: object) {
  return typeof obj === 'object' && toString(obj) === '[object Object]'
}

const isArray =
  Array.isArray ||
  function(obj) {
    return toStr.call(obj) === '[object Array]'
  }

function isBoolean(obj: boolean): boolean {
  return typeof obj === 'boolean' || toString(obj) === '[object Boolean]'
}

function getKey(key: string): number | string {
  const intKey = parseInt(key)
  if (intKey.toString() === key) {
    return intKey
  }
  return key
}

// var mod = factory()
// mod.create = factory
// mod.withInheritedProps = factory({ includeInheritedProps: true })
// export default mod

interface IOption {
  includeInheritedProps?: boolean
}

interface IObject {
  [key: string]: any
}

class ObjectPath {
  options: IOption = {}
  hasShallowProperty: Function = () => true
  constructor(options: IOption) {
    this.options = options
    this.hasShallowProperty = this.createShallowPropertyFunc()
  }

  createShallowPropertyFunc(): Function {
    if (this.options.includeInheritedProps) return () => true

    return (obj: object, prop: string) => {
      return (
        (typeof prop === 'number' && Array.isArray(obj)) ||
        hasOwnProperty(obj, prop)
      )
    }
  }

  getShallowProperty(obj: IObject, prop: string): any {
    if (this.hasShallowProperty(obj, prop)) {
      return obj[prop]
    }
  }

  set(obj: IObject, path: any, value: any, doNotReplace?: boolean): any {
    if (typeof path === 'number') {
      path = [path]
    }
    if (!path || path.length === 0) {
      return obj
    }
    if (typeof path === 'string') {
      return this.set(obj, path.split('.').map(getKey), value, doNotReplace)
    }
    let currentPath = path[0]
    if (typeof currentPath !== 'string' && typeof currentPath !== 'number') {
      currentPath = String(currentPath)
    }
    const currentValue = this.getShallowProperty(obj, currentPath)
    if (
      this.options.includeInheritedProps &&
      (currentPath === '__proto__' ||
        (currentPath === 'constructor' && typeof currentValue === 'function'))
    ) {
      throw new Error(
        "For security reasons, object's magic properties cannot be set"
      )
    }
    if (path.length === 1) {
      if (currentValue === void 0 || !doNotReplace) {
        obj[currentPath] = value
      }
      return currentValue
    }

    if (currentValue === void 0) {
      // check if we assume an array
      if (typeof path[1] === 'number') {
        obj[currentPath] = []
      } else {
        obj[currentPath] = {}
      }
    }

    return this.set(obj[currentPath], path.slice(1), value, doNotReplace)
  }

  has(obj: IObject, path: any): boolean {
    if (typeof path === 'number') {
      path = [path]
    } else if (typeof path === 'string') {
      path = path.split('.')
    }

    if (!path || path.length === 0) {
      return !!obj
    }

    for (let i = 0; i < path.length; i++) {
      const j = getKey(path[i])

      if (
        (typeof j === 'number' && isArray(obj) && j < obj.length) ||
        (this.options.includeInheritedProps
          ? j in Object(obj)
          : hasOwnProperty(obj, j))
      ) {
        obj = obj[j]
      } else {
        return false
      }
    }

    return true
  }

  ensureExistsn(obj: object, path: any, value: any) {
    return this.set(obj, path, value, true)
  }

  insert(obj: object, path: any, value: any, at: any) {
    let arr = this.get(obj, path)
    at = ~~at
    if (!isArray(arr)) {
      arr = []
      this.set(obj, path, arr)
    }
    arr.splice(at, 0, value)
  }

  empty(obj: object, path: any) {
    if (isEmpty(path)) {
      return void 0
    }
    if (obj == null) {
      return void 0
    }

    let value, i
    if (!(value = this.get(obj, path))) {
      return void 0
    }

    if (typeof value === 'string') {
      return this.set(obj, path, '')
    } else if (isBoolean(value)) {
      return this.set(obj, path, false)
    } else if (typeof value === 'number') {
      return this.set(obj, path, 0)
    } else if (isArray(value)) {
      value.length = 0
    } else if (isObject(value)) {
      for (i in value) {
        if (this.hasShallowProperty(value, i)) {
          delete value[i]
        }
      }
    } else {
      return this.set(obj, path, null)
    }
  }

  push(obj: object, path: any /*, values */) {
    let arr = this.get(obj, path)
    if (!isArray(arr)) {
      arr = []
      this.set(obj, path, arr)
    }

    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2))
  }

  coalesce(obj: object, paths: any, defaultValue: any) {
    let value

    for (let i = 0, len = paths.length; i < len; i++) {
      if ((value = this.get(obj, paths[i])) !== void 0) {
        return value
      }
    }

    return defaultValue
  }

  get(obj: IObject, path: any, defaultValue?: any): any {
    if (typeof path === 'number') {
      path = [path]
    }
    if (!path || path.length === 0) {
      return obj
    }
    if (obj == null) {
      return defaultValue
    }
    if (typeof path === 'string') {
      return this.get(obj, path.split('.'), defaultValue)
    }

    const currentPath: any = getKey(path[0])
    const nextObj = this.getShallowProperty(obj, currentPath)
    if (nextObj === void 0) {
      return defaultValue
    }

    if (path.length === 1) {
      return nextObj
    }

    return this.get(obj[currentPath], path.slice(1), defaultValue)
  }

  del(obj: IObject, path: any): any {
    if (typeof path === 'number') {
      path = [path]
    }

    if (obj == null) {
      return obj
    }

    if (isEmpty(path)) {
      return obj
    }
    if (typeof path === 'string') {
      return this.del(obj, path.split('.'))
    }

    const currentPath: any = getKey(path[0])
    if (!this.hasShallowProperty(obj, currentPath)) {
      return obj
    }

    if (path.length === 1) {
      if (isArray(obj)) {
        obj.splice(currentPath, 1)
      } else {
        delete obj[currentPath]
      }
    } else {
      return this.del(obj[currentPath], path.slice(1))
    }

    return obj
  }
}

const mod = new ObjectPath({ includeInheritedProps: true })
export default mod
