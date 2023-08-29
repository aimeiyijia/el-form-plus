import { VNode, CreateElement } from 'vue'
import { Component, Prop, Model, Watch, Mixins } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { Col } from 'element-ui'
import MethodsMixins from './mixins/methods'
import './custom/fragment'
import { Fragment } from 'vue-frag'
import { cloneDeep, isFunction, isString, isArray } from 'lodash'
import objectPath from './utils/object-path'
// 样式
import './styles/index.scss'

// 取出vnode匹配表
import { Vnodes, DetailVnodes, SuperCustom } from './vnode'

interface IVnodes {
  [key: string]: any
  [index: number]: any
}
interface IModel {
  [key: string]: any
  [index: number]: any
}

@Component({
  name: 'ElFormPlus',
  components: { Fragment },
})
export default class ElFormPlus extends Mixins(MethodsMixins) {
  // 双向绑定的formData
  @Model('change', { type: Object }) readonly modelData!: any

  // 表单布局配置项 https://element.eleme.cn/#/zh-CN/component/layout#row-attributes
  @Prop({ type: Object, default: () => ({}) }) readonly layout?: any

  // 表单整体配置 https://element.eleme.cn/#/zh-CN/component/form#form-attributes
  @Prop({ type: Object, default: () => ({}) }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]
  // 各个表单项相同的配置项
  @Prop({ type: Object, default: () => ({}) }) readonly unifyOptions!: any

  private model: IModel = {}

  private data: any[] = []

  private listeners: any = null

  created() {
    // 绑定初值
    // Watch immediate为true时的执行时机会先于created
    // 利用这个就做到了modelData（晚渲染）比options（早渲染）优先级更高
    this.bindData(this.modelData)

    // 防止事件注入时再次触发render
    this.listeners = this.$listeners
  }

  // this.model.x = xx 这样的写法只会触发一次
  // this.model = { x: xx } 这样的写法只会触发两次 因为这个写法改变了model的原有引用值
  @Watch('modelData', { deep: true })
  modelDataChange() {
    this.bindData(this.modelData)
    this.$emit('change', this.model)
  }

  // 这一步主要是为了方便内部操作options
  // 深拷贝保存为内部状态
  @Watch('options', { immediate: true, deep: true })
  private setData() {
    const options = this.options
    this.data = cloneDeep(options)
    this.setCachedData()
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

  // 将数据扁平化并存储起来，便于后续的查询操作
  setCachedData() {
    // 扁平化为一维数组
    let oneDemArr: any = []
    this.data.forEach(o => {
      oneDemArr.push(o)
      if (o.more && isArray(o.more)) {
        oneDemArr = oneDemArr.concat(o.more)
      }
    })
    this.cachedDataArr = oneDemArr
  }

  // 深度绑定数据
  private bindData(data: any) {
    for (const o in data) {
      if (Object.prototype.toString.call(data[o]) === '[object Object]') {
        this.bindData(data[o])
      }
      this.$set(this.model, o, data[o])
    }
  }

  // 构建model
  private buildModel(data: any) {
    for (const o of data) {
      const result = this.isFieldExist(o)
      if (!result) {
        continue
      }
      const { field, value, more } = o
      if (field) {
        this.$set(this.model, field, this.model[value] || value)
      }
      if (more && isArray(more)) {
        this.buildModel(more)
      }
    }
  }

  // 校验必须参数
  // 目前必须的参数为 attrs中的 field字段
  private isFieldExist(attrs: any): boolean {
    // 不需要field时不校验
    if (attrs.noField) return true
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

  private renderWhatDetailComponent(type: any) {
    const vnodes: IVnodes = DetailVnodes
    return vnodes[type]
  }

  // 判断需要渲染的containerEl
  private renderContainerEl(c: any) {
    if (c) {
      if (isFunction(c)) {
        // eslint-disable-next-line no-useless-call
        return c.call(null, this)
      }
      if (isString(c)) {
        return c
      }
    }
    return 'FFragment'
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(h: CreateElement): VNode {
    const model = this.model

    const {
      row: globalRowConfig = { gutter: 20 },
      col: globalColConfig = { span: 12 },
    } = this.layout || {}

    const {
      container: globalContainer,
      full = false,
      detailPattern = 'form',
    } = this.config
    // 渲染表单项
    const renderSingleForm = (singleFormAttrs: any) => {
      const { attrs: unifyAttrs = {} } = this.unifyOptions
      const { placeholder, disabled } = singleFormAttrs
      const {
        type = '',
        attrs = {},
        layout,
        col,
        field = '',
        detail = {},
        container,
        on = {},
        scopedSlots = {},
      } = singleFormAttrs

      // 将attrs中一些常用的配置提取出来，
      const shortcutAttrs = { placeholder, disabled }

      // 作用域插槽本身也是函数，在这里做一次转换
      const customScopedSlots: { [key: string]: any } = {}
      for (const key in scopedSlots) {
        if (isString(scopedSlots[key])) {
          customScopedSlots[key] = this.$scopedSlots[scopedSlots[key]]
        } else {
          customScopedSlots[key] = scopedSlots[key]
        }
      }

      // 拦截原生input事件，以便触发数据更新
      const customInputEvent = (val: any) => {
        if (field) this.$set(model, field, val)

        // 拦截之后再触发input事件
        const { input } = on
        if (!input) return
        if (isFunction(input)) {
          // eslint-disable-next-line no-useless-call
          input.call(null, val)
        } else {
          console.error(`field='${field}'中input必须是函数`)
        }
      }

      // 取出表单初始值
      const value = model[field]

      // 取出除input事件之外的事件
      const extraEvents = omit(on, ['input'])

      // 是否渲染el-col元素
      // 一个el-form-item内部某表单项占据的空间
      const ColEl: any = layout ? Col : 'FFragment'

      // 渲染container
      // 表单项的包裹元素，目前主要用于表单项的拖拽功能
      const ContainerEl = this.renderContainerEl(container)

      // 需要渲染的组件 SuperComponent
      const TrueComponent: any = this.renderWhatComponent(type)

      const DetailComponent: any = this.renderWhatDetailComponent(type)

      return (
        <ColEl {...{ props: { ...globalColConfig, ...col } }}>
          <ContainerEl>
            {detailPattern === 'desc' ? (
              <DetailComponent
                {...{
                  scopedSlots: customScopedSlots,
                  attrs: {
                    ...unifyAttrs,
                    ...shortcutAttrs,
                    ...attrs,
                    ...{ detail },
                  },
                  on: {
                    ...extraEvents,
                  },
                }}
                class={attrs.extraClass}
                value={value}
              ></DetailComponent>
            ) : (
              <TrueComponent
                {...{
                  scopedSlots: customScopedSlots,
                  attrs: { ...unifyAttrs, ...shortcutAttrs, ...attrs },
                  on: {
                    ...extraEvents,
                    input: customInputEvent,
                  },
                }}
                class={attrs.extraClass}
                value={value}
              />
            )}
          </ContainerEl>
        </ColEl>
      )
    }

    // 渲染 el-form-item
    const renderElFormItem = (o: any) => {
      const { config: unifyConfig = {} } = this.unifyOptions
      // 剥离掉表单项不需要的配置项
      const singleFormAttrs = omit(o, ['hidden', 'config', 'more'])

      const { label, field = '', config = {}, more = [], layout } = o
      const mergeConfig = { ...unifyConfig, ...config }

      const {
        col = globalColConfig,
        container,
        cancelrule = false,
      } = mergeConfig
      // 将config中一些常用的配置提取出来，
      const shortcutConfig = { label }

      const isHasField = this.isFieldExist(singleFormAttrs)

      // 一个el-form-item占据的空间
      const ColEl = this.layout ? 'el-col' : 'FFragment'

      // 一个el-form-item内部的布局
      const RowEl = layout ? 'el-row' : 'FFragment'

      // 渲染container
      const ContainerEl = this.renderContainerEl(container)

      // 更多表单项
      const moreForm = () => {
        return more.map((o: object) => {
          // 不接受layout配置，一定会被more同级的layout配置项覆盖
          const props: any = o || {}
          props.layout = layout
          return renderSingleForm(props)
        })
      }

      return (
        <ColEl {...{ props: { ...globalColConfig, ...col } }}>
          <ContainerEl>
            <el-form-item
              class={mergeConfig.class}
              {...{
                props: {
                  ...shortcutConfig,
                  ...mergeConfig,
                  prop: cancelrule ? '' : field,
                },
              }}
            >
              <RowEl {...{ props: { ...globalRowConfig, ...layout } }}>
                {isHasField &&
                  [renderSingleForm(singleFormAttrs)].concat(moreForm())}
              </RowEl>
            </el-form-item>
          </ContainerEl>
        </ColEl>
      )
    }

    const renderSuperCustom = (options: any) => {
      const { scopedSlots, col = { span: 24 } } = options
      const customScopedSlots = isString(scopedSlots)
        ? { custom: this.$scopedSlots[scopedSlots] }
        : { custom: scopedSlots }
      const ColEl = this.layout ? 'el-col' : 'FFragment'
      return (
        <ColEl {...{ props: { ...globalColConfig, ...col } }}>
          <SuperCustom
            {...{
              scopedSlots: customScopedSlots,
            }}
          ></SuperCustom>
        </ColEl>
      )
    }

    const renderItem = () => {
      const options = this.data

      // 分流，SuperCustom是独立，但还是在el-form里面
      // 与el-form-item(不启用布局)或el-row(启用布局)平级
      return options
        .filter((o: any) => !o.hidden)
        .map((o: any) => {
          if (o.type === 'SuperCustom') {
            return renderSuperCustom(o)
          }
          return renderElFormItem(o)
        })
    }

    // 是否渲染el-row元素
    const RowEl = this.layout ? 'el-row' : 'FFragment'
    // 其实 我也没想到有什么应用场景，我主要用来做可拖拽系统的
    const GlobalContainer = this.renderContainerEl(globalContainer)
    // 渲染el-form
    return (
      <el-form
        ref="ElForm"
        class={[
          full ? 'el-form_full' : '',
          detailPattern === 'desc' ? 'el-form_detail-mode' : '',
        ]}
        {...{
          props: {
            ...this.config,
            model: model,
          },
          on: this.listeners,
        }}
      >
        <RowEl {...{ props: { ...globalRowConfig } }}>
          <GlobalContainer>{renderItem()}</GlobalContainer>
        </RowEl>
      </el-form>
    )
  }
}
