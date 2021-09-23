import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Model, Watch } from 'vue-property-decorator'
import { Fragment } from 'vue-fragment'
import omit from 'lodash/omit'
import { cloneDeep, isFunction, isString } from 'lodash'
import objectPath from './utils/object-path'
// 样式
import './styles/index.scss'

// 取出vnode匹配表
import Vnodes from './vnode'

import buttonData from './data/index'

interface IVnodes {
  [key: string]: any;
  [index: number]: any;
}
interface IModel {
  [key: string]: any;
  [index: number]: any;
}

// TODO 全局设置包裹组件
// TODO 布局配置优化
// TODO
@Component({
  name: 'ElFormPlus',
  components: { Fragment },
})
export default class ElFormPlus extends Vue {

  // 双向绑定的formData
  @Model('change', { type: Object }) readonly modelData!: any

  // 表单布局配置项 https://element.eleme.cn/#/zh-CN/component/layout#row-attributes
  @Prop({ type: Object, default: () => { } }) readonly layout?: any

  // 表单整体配置 https://element.eleme.cn/#/zh-CN/component/form#form-attributes
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]

  private model: IModel = {}

  private data: any[] = []

  created() {
    // 绑定初值
    // Watch immediate为true时的执行时机会先于created
    // 利用这个就做到了modelData（晚渲染）比options（早渲染）优先级更高
    this.bindData(this.modelData)
  }

  // 这一步主要是为了方便内部操作options
  // 深拷贝保存为内部状态
  @Watch('options', { immediate: true, deep: true })
  private setData() {
    const options = this.options.concat(buttonData)
    this.data = cloneDeep(options)
  }

  // 监听options
  // 先从option中取出所有的field字段 组成model
  @Watch('data', { immediate: true, deep: true })
  private dataChange() {
    const options = this.data
    this.buildModel(options)
    // 将组装好的model对外暴露出去
    this.$emit('change', this.model)
    // this.exportInstance()
  }

  // 深度绑定数据
  private bindData(data: any) {
    for (let o in data) {
      if (Object.prototype.toString.call(data[o]) === '[object Object]') {
        this.bindData(data[o])
      }
      this.$set(this.model, o, data[o])
    }
  }

  // 构建model
  private buildModel(data: any) {
    for (let o of data) {
      const result = this.isFieldExist(o)
      if (!result) {
        continue
      }
      const { field, value, more } = o
      if (field) {
        this.$set(this.model, field, value)
      }
      if (more && Array.isArray(more)) {
        this.buildModel(more)
      }
    }
  }

  // 根据attrs中的field字段匹配到目标配置项
  private getTarget(fieldName: any) {
    return this.data.find(o => {
      return o.field === fieldName
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
  private exportMethods() {
    this.$emit('change', {
      setByField: this.setByField,
      isHasByField: this.isHasByField,
      insertByField: this.insertByField,
      emptysByField: this.emptysByField,
      getByField: this.getByField,
      delByField: this.delByField,
    })
  }

  // 校验必须参数
  // 目前必须的参数为 attrs中的 field字段
  private isFieldExist(attrs: any): boolean {
    const isExist = objectPath.has(attrs, 'field')
    if (!isExist) {
      console.error('field字段不能为空，请检查配置项')
      return false
    }
    return true
  }

  // 根据type 判断需要渲染的组件
  private renderWhatComponent(type: any) {
    const vnodes: IVnodes = Vnodes
    return vnodes[type]
  }

  // 判断需要渲染的containerEl
  private renderContainerEl(c: string) {
    if (c) {
      if (isFunction(c)) {
        return c.call(null, this)
      }
      if (isString(c)) {
        return c
      }
    }
    return 'fragment'
  }

  render(h: CreateElement): VNode {
    const model = this.model

    // 渲染表单项
    const renderSingleForm = (singleFormAttrs: any) => {

      let { type = "", layout, col = { span: 12 }, field = "", customNode, attrs = {}, container, on = {}, scopedSlots = {} } = singleFormAttrs

      // 表单input event
      const onInput = (val: any) => {

        // 设置新值
        this.$set(model, field, val)

        // 因为input事件被内部拦截了，所以在此再暴露出去
        // 所有的组件应自行实现input方法以达到统一目的（也可以不实现）
        // input基本对应表单的input事件，但也可能是change事件，以实际开发为准
        const { input } = on
        if (!input) return
        if (isFunction(input)) {
          input.call(null, val)
        } else {
          console.error(`field='${field}'中input必须是函数`)
        }
      }

      // 取出表单初始值
      const value = model[field]

      // 取出
      const ons = omit(on, ['input'])

      // 是否渲染el-col元素
      // 一个el-form-item内部某表单项占据的空间
      const ColEl = layout ? 'el-col' : 'fragment'

      // 渲染container
      const ContainerEl = this.renderContainerEl(container)

      // 需要渲染的组件 SuperComponent
      const SComponent: any = this.renderWhatComponent(type)
      return (
        <ColEl  {...{ props: { ...col } }}>
          <ContainerEl>
            <SComponent
              value={value}
              on-input={onInput}
              {...{ scopedSlots }}
              {...{ attrs }}
              customNode={customNode}
              {...{ on: ons }} />
          </ContainerEl>
        </ColEl>

      )
    }

    // 渲染 el-form-item
    const renderFormItem = () => {
      const options = this.data

      return options.filter(o => !o.hidden).map(o => {

        // 剥离掉表单项不需要的配置项
        const singleFormAttrs = omit(o, ['hidden', 'config', 'more'])

        const { field = '', config = {}, more = [], layout, } = o
        const { col, container } = config

        const result = this.isFieldExist(singleFormAttrs)

        // 一个el-form-item占据的空间
        const ColEl = this.layout ? 'el-col' : 'fragment'

        // 一个el-form-item内部的布局
        const RowEl = layout ? 'el-row' : 'fragment'

        // 渲染container
        const ContainerEl = this.renderContainerEl(container)

        // 更多表单项
        const moreForm = () => {
          return more.map((o: object) => {
            // 不接受layout配置，一定会被more同级的layout配置项覆盖
            const props: any = o
            props.layout = layout
            return renderSingleForm(props)
          })
        }

        return (
          <ColEl  {...{ props: { ...col } }}>
            <ContainerEl>
              <el-form-item {...{ props: { prop: field, ...config } }}>
                <RowEl {...{ props: { ...layout } }}>
                  {result && [renderSingleForm(singleFormAttrs)].concat(moreForm())}
                </RowEl>
              </el-form-item>
            </ContainerEl>
          </ColEl>
        )
      })
    }

    // 是否渲染el-row元素
    const RowEl = this.layout ? 'el-row' : 'fragment'

    // 渲染el-form
    return (
      <el-form ref="ElForm"
        {...{
          props: {
            ...this.config,
            model: model,
          },
          on: this.$listeners
        }}>
        <RowEl {...{ props: { ...this.layout } }}>
          {renderFormItem()}
        </RowEl>
      </el-form>
    )
  }
}
