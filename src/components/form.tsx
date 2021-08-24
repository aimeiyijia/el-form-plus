import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Model, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
import isFunction from 'lodash/isFunction'
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
  // 表单整体配置
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]

  private model = new Map()

  private data: any[] = []

  created() {
    // console.log(this.config, '表单配置项')
    // console.log(this.options, '表单项配置项')
    // this.optionsChange()
    console.log(this, 'form')
    const timer = setTimeout(() => {
      this.model.set('input', '更新内部')
      console.log(this.model, '12334')

      // fix 无法监听Map的变更
      this.$forceUpdate()
      clearTimeout(timer)
    }, 3000)
  }

  @Watch('options', { immediate: true, deep: true })
  private setData(){
    this.data = this.options
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
  }

  // insert 增  增加一个表单项
  // delete 删  删除一个表单项
  // update 改，更新表单值
  // get 查 查询到一个表单配置项，以便进行更改

  private get(){}


  // 根据type 判断需要渲染的组件
  private renderEl(type: any) {
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
      const SComponent: any = this.renderEl(type)
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
      const options = this.options

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
