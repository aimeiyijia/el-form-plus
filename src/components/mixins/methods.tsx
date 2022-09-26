import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Form } from 'element-ui'
import objectPath from '../utils/object-path'


@Component({
  name: 'MethodsMixins'
})
export default class MethodsMixins extends Vue {

  public cachedDataArr: any[] = []

  get elFormRef() {
    return this.$refs.ElForm as Form
  }

  created() {
    this.exportMethods()
  }

  // 根据attrs中的field字段匹配到目标配置项
  private getTarget(fieldName: string): any {
    return this.cachedDataArr.find((o: any) => o.field === fieldName)
  }

  // 根据field字段值来查找其所在的配置项
  // 本质上还是变更option来达到更新目的

  // 通过表单域更新某配置项 如果不存在该path,那么将会添加进去
  private setByField(fieldName: string, path: string, value: any): void {
    try {
      const target = this.getTarget(fieldName)
      objectPath.set(target, path, value)
      // 没太找到更合适的方式，可能这部分需要重写下
      this.$forceUpdate()
    } catch (error) {
      console.error(error, 'updateField')
    }
  }

  // 指定路径是否存在
  private isHasByField(fieldName: string, path: string): boolean {
    try {
      const target = this.getTarget(fieldName)
      return objectPath.has(target, path)
    } catch (error) {
      console.error(error, 'isHasByField')
      return false
    }
  }

  // insert 向指定路径中的数组插入值，该路径不存或没值就添加
  private insertByField(fieldName: string, path: string, value: any, positions: number): void {
    try {
      const target = this.getTarget(fieldName)
      objectPath.insert(target, path, value, positions);
      this.$forceUpdate()
    } catch (error) {
      console.error(error, 'insertByField')
    }
  }

  // number -> 0, boolean -> no-change, array -> [], object -> {}, Function -> null
  private emptysByField(fieldName: string, path: string) {
    try {
      const target = this.getTarget(fieldName)
      objectPath.empty(target, path)
      this.$forceUpdate()
    } catch (error) {
      console.error(error, 'emptysByField')
    }
  }

  // 获取指定路径上的值
  private getByField(fieldName: string, path: string, defaultValue: any): void {
    try {
      const target = this.getTarget(fieldName)
      objectPath.get(target, path, defaultValue)
    } catch (error) {
      console.error(error, 'getByField')
    }
  }

  // 删除指定路径
  private delByField(fieldName: string, path: string): void {
    try {
      const target = this.getTarget(fieldName)
      objectPath.del(target, path)
      this.$forceUpdate()
    } catch (error) {
      console.error(error, 'delByField')
    }
  }

  // 将操作实例的方法暴露出去
  private exportMethods() {
    this.$nextTick(function() {
      this.$emit('render-complete', {
        operaMethods: {
          setByField: this.setByField,
          isHasByField: this.isHasByField,
          insertByField: this.insertByField,
          emptysByField: this.emptysByField,
          getByField: this.getByField,
          delByField: this.delByField,
        },
        elForm: this.elFormRef
      })
    })
  }

}
