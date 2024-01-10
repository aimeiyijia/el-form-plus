import objectPath from '../utils/object-path'

const targetErrorTips = (fieldName: string) => {
  console.error(`无法根据${fieldName}找到对应配置项`)
}

// 根据attrs中的field字段匹配到目标配置项
export function getTarget(options: [], fieldName: string): any {
  return options.find((o: any) => o.field === fieldName)
}

// 根据field字段值来查找其所在的配置项
// 本质上还是变更option来达到更新目的

// 通过表单域更新某配置项 如果不存在该path,那么将会添加进去
export function setByField(
  options: [],
  fieldName: string,
  path: string,
  value: any
): any {
  try {
    const target = getTarget(options, fieldName)
    if (target) {
      objectPath.set(target, path, value)
    } else {
      targetErrorTips(fieldName)
    }
    return options
  } catch (error) {
    console.error(error, 'updateField')
  }
}

// 指定路径是否存在
export function isHasByField(
  options: [],
  fieldName: string,
  path: string
): boolean {
  try {
    const target = getTarget(options, fieldName)
    if (target) {
      return objectPath.has(target, path)
    } else {
      targetErrorTips(fieldName)
      return false
    }
  } catch (error) {
    console.error(error, 'isHasByField')
    return false
  }
}

// insert 向指定路径中的数组插入值，该路径不存或没值就添加
export function insertByField(
  options: [],
  fieldName: string,
  path: string,
  value: any,
  positions: number
): any {
  try {
    const target = getTarget(options, fieldName)
    objectPath.insert(target, path, value, positions)
    return options
  } catch (error) {
    console.error(error, 'insertByField')
  }
}

// number -> 0, boolean -> no-change, array -> [], object -> {}, Function -> null
export function emptysByField(
  options: [],
  fieldName: string,
  path: string
): any {
  try {
    const target = getTarget(options, fieldName)
    objectPath.empty(target, path)
    return options
  } catch (error) {
    console.error(error, 'emptysByField')
  }
}

// 获取指定路径上的值
export function getByField(
  options: [],
  fieldName: string,
  path: string,
  defaultValue: any
): any {
  try {
    const target = getTarget(options, fieldName)
    return objectPath.get(target, path, defaultValue)
  } catch (error) {
    console.error(error, 'getByField')
  }
}

// 删除指定路径
export function delByField(options: [], fieldName: string, path: string): any {
  try {
    const target = getTarget(options, fieldName)
    objectPath.del(target, path)
    return options
  } catch (error) {
    console.error(error, 'delByField')
  }
}
