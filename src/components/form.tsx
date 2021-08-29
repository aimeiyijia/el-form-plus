import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Model, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { cloneDeep, isFunction } from 'lodash'
import objectPath from './utils/object-path'
// 样式
import './styles/index.scss'

// 取出vnode匹配表
import Vnodes from './vnode'

interface IVnodes {
  [key: string]: any;
  [index: number]: any;
}

@Component
export default class ElFormPlus extends Vue {

  @Model('change', { type: Object }) readonly formPlusInstance!: any
  // 表单整体配置
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]

  private model = new Map()

  private data: any[] = []

  // 这一步主要是为了方便内部操作options
  @Watch('options', { immediate: true, deep: true })
  private setData() {
    this.data = cloneDeep(this.options)
  }

  // 监听options 仅就表单项配置而言 options会是个一维数组
  // 先从option中取出所有的field字段 组成model
  @Watch('data', { immediate: true, deep: true })
  private dataChange() {
    const options = this.data
    for (let o of options) {
      const { attrs } = o
      const { field, value } = attrs
      this.model.set(field, value)
    }
    this.exportInstance()
  }

  // 根据attrs中的field字段匹配到目标配置项
  getTarget(fieldName: any) {
    return this.data.find(o => {
      return o.attrs.field === fieldName
    })
  }

  // 根据field字段值来查找其所在的配置项
  // 本质上还是变更option来达到更新目的

  // 通过表单域更新某配置项 如果不存在该path,那么将会添加进去
  private setByField(fieldName: string, path: string, value: any): void {
    try {
      const target = this.getTarget(fieldName)
      objectPath.set(target, path, value)
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
    } catch (error) {
      console.error(error, 'insertByField')
    }
  }

  // number -> 0, boolean -> no-change, array -> [], object -> {}, Function -> null
  private emptysByField(fieldName: string, path: string) {
    try {
      const target = this.getTarget(fieldName)
      objectPath.empty(target, path)
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
    } catch (error) {
      console.error(error, 'delByField')
    }
  }


  // 将操作实例的方法暴露出去
  private exportInstance() {
    this.$emit('change', {
      setByField: this.setByField,
      isHasByField: this.isHasByField,
      insertByField: this.insertByField,
      emptysByField: this.emptysByField,
      getByField: this.getByField,
      delByField: this.delByField,
    })
  }

  // 根据type 判断需要渲染的组件
  private renderComponent(type: any) {
    const vnodes: IVnodes = Vnodes
    return vnodes[type]
  }


  render(h: CreateElement): VNode {
    const model = this.model

    // 渲染表单项
    const renderSingleForm = (singleFormAttrs: any) => {

      let { type, attrs, on, scopedSlots } = singleFormAttrs
      const { field } = attrs

      // 剥离掉内置的配置项
      const otherAttrs = omit(attrs, ['field', 'value'])
      // 表单input event
      const onInput = (val: any) => {
        // 设置新值
        model.set(field, val)

        // 因为input事件被内部拦截了，所以在此再暴露出去
        const { input } = on
        // input(val);
        if (input && isFunction(input)) {
          input.call(null, val)
        } else {
          console.error(`field='${field}'中input必须是函数`)
        }

        // fix 无法监听Map的变更
        this.$forceUpdate()
      }

      // 取出表单初始值
      const value = model.get(field)

      // 取出
      const ons = omit(on, ['input'])
      // 需要渲染的组件 SuperComponent
      const SComponent: any = this.renderComponent(type)
      return (
        <SComponent
          value={value}
          on-input={onInput}
          {...{ scopedSlots }}
          {...{ attrs: otherAttrs }}
          {...{ on: ons }} />
      )
    }

    // 渲染 el-form-item
    const renderFormItem = () => {
      const options = this.data

      return options.filter(o => !o.hidden).map(o => {

        // 剥离掉el-form-item相关的配置
        const singleFormAttrs = omit(o, ['hidden', 'config'])
        const { config } = o
        const { ref } = config
        const itemProp = omit(config, ['ref'])

        return (
          <el-form-item {...{ props: itemProp }} ref={ref}>
            {renderSingleForm(singleFormAttrs)}
          </el-form-item>
        )
      })
    }

    // 渲染el-form
    return (
      <el-form ref="form"
        {...{
          props: {
            ...this.config,
            model: Object.fromEntries(this.model),
          }
        }}>
        {renderFormItem()}
      </el-form>
    )
  }
}
