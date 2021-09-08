import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Model, Watch } from 'vue-property-decorator'
import { Fragment } from 'vue-fragment'
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
interface IModel {
  [key: string]: any;
  [index: number]: any;
}

@Component({
  components: { Fragment },
})
export default class ElFormPlus extends Vue {

  // 因为内部的model数据全部从options中组装而来，所以初始化时modelData并没有实际作用
  // el-form-plus初始化完成之后则为组装后的model(同一引用)
  @Model('change', { type: Object }) readonly modelData!: any

  // 表单布局配置项 https://element.eleme.cn/#/zh-CN/component/layout#row-attributes
  @Prop({ type: Object, default: () => { } }) readonly layout?: any

  // 表单整体配置 https://element.eleme.cn/#/zh-CN/component/form#form-attributes
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]

  private model: IModel = {}

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
    this.buildModel(options)
    // 将组装好的model对外暴露出去
    this.$emit('change', this.model)
    // this.exportInstance()
  }

  private buildModel(data: any) {
    for (let o of data) {
      const result = this.verifyRequiredParams(o)
      if (!result) {
        continue
      }
      const { attrs, more } = o
      const { field, value } = attrs
      this.$set(this.model, field, value)
      if (more) {
        this.buildModel(more)
      }
      // this.buildModel(more)
    }
  }

  created() {
    // 检验双向绑定方法
    // setInterval(() =>{
    //   this.model['input'] = (new Date()).getMilliseconds()
    //   console.log(this.model, '更新')
    // }, 3000)
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
  verifyRequiredParams(attrs: any): boolean {
    const isExist = objectPath.has(attrs, 'attrs.field')
    if (!isExist) {
      console.error('field字段不能为空，请检查配置项')
      return false
    }
    return true
  }


  render(h: CreateElement): VNode {
    const model = this.model

    // 根据type 判断需要渲染的组件
    const renderWhatComponent = (type: any) => {
      const vnodes: IVnodes = Vnodes
      return vnodes[type]
    }

    // 渲染表单项
    const renderSingleForm = (singleFormAttrs: any) => {

      let { type = "", attrs = {}, on = {}, scopedSlots = {} } = singleFormAttrs
      const { field } = attrs

      // 剥离掉内置的配置项
      const otherAttrs = omit(attrs, ['field', 'value'])
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
      // 需要渲染的组件 SuperComponent
      const SComponent: any = renderWhatComponent(type)
      return (
        <SComponent
          value={value}
          on-input={onInput}
          {...{ scopedSlots }}
          {...{ attrs: otherAttrs }}
          {...{ on: ons }} />
      )
    }

    // todo 一个el-form-item内部可以渲染多个表单项，同时支持el-col布局
    // todo 对于el-form-item 支持el-col el-row自适应布局
    // 渲染 el-form-item
    const renderFormItem = () => {
      const options = this.data

      return options.filter(o => !o.hidden).map(o => {

        // 剥离掉表单项不需要的配置项
        const singleFormAttrs = omit(o, ['hidden', 'config', 'more', 'col'])

        const { config = {}, attrs = {}, more = [], col = { span: 24 } } = o
        const { field = '' } = attrs

        const result = this.verifyRequiredParams(singleFormAttrs)

        const renderRowEl = () => {
          if (this.layout) return 'el-col'
          return 'fragment'
        }

        const RowEl = renderRowEl()

        // 更多表单项
        const moreForm = () => {
          return more.map((o: object) => {
            return renderSingleForm(o)
          })
        }

        return (
          <RowEl  {...{ props: { ...col } }}>
            <el-form-item {...{ props: { prop: field, ...config } }}>
              {result && [renderSingleForm(singleFormAttrs)].concat(moreForm())}
            </el-form-item>
          </RowEl>
        )
      })
    }

    const renderLayoutEl = () => {
      if (this.layout) return 'el-row'
      return 'fragment'
    }

    const LayoutEl = renderLayoutEl()


    // 渲染el-form
    return (
      <el-form ref="form"
        {...{
          props: {
            ...this.config,
            model: model,
          },
          on: this.$listeners
        }}>
        <LayoutEl>
          {renderFormItem()}
        </LayoutEl>
      </el-form>
    )
  }
}
