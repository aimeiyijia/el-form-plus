import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
import isFunction from 'lodash/isFunction'
// 样式
import './styles/index.scss'

import Input from './modules/input'

@Component
export default class ElTableTs extends Vue {
  // 表单整体配置
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]

  private model1 = 123
  private model = new Map()

  // todo 先从option中取出所有的field字段 组成model

  created() {
    // console.log(this.config, '表单配置项')
    // console.log(this.options, '表单项配置项')
    this.optionsChange()
  }
  // 监听options 仅就表单项配置而言 options会是个一维数组
  @Watch('options', { immediate: true, deep: true })
  private optionsChange() {
    const options = this.options
    for (let o of options) {
      console.log(o, '配置项')
      this.model.set(o.field, o.value)
    }
  }

  // 根据type 判断需要渲染的组件
  private renderEl(type) { }

  render(h: CreateElement): VNode {
    const model = this.model
    // 渲染表单项
    const renderSingleForm = (singleFormOption: any) => {

      let { field, type, ref, on } = singleFormOption
      console.log(model, '值')
      // console.log(this.model[field], '值')

      // 表单input
      const onInput = (val: any) => {
        // 设置新值
       model.set(field, val)

        // 因为input事件被内部拦截了，所以在此再暴露出去
        const {input} = on
        // input(val);
        if(isFunction(input)){
          input.call(null, val)
        }else {
          console.error(`field='${field}'中input必须是函数`)
        }

        // fix 无法监听Map的变更
        this.$forceUpdate()
      }
      // 取出表单初始值
      const value = model.get(field)

      const ons = omit(on, ['input'])
      // 需要渲染的组件 SuperComponent
      const SComponent: any = Input
      return (
        <SComponent
          value={value}
          on-input={onInput}
          option={singleFormOption}
          {...{ on: ons }} />
      )
    }

    // 渲染 el-form-item
    const renderFormItem = () => {
      const options = this.options

      return options.map(o => {

        // 剥离出el-form-item相关的配置
        const singleFormOption = omit(o, ['config'])
        const { config: itemProp } = o
        // console.log(itemProp, '单项配置')

        return (
          <el-form-item {...{ props: itemProp }}>
            {renderSingleForm(singleFormOption)}
          </el-form-item>
        )
      })
    }

    return (
      <el-form ref="form" {...{
        // 为了解决 Invalid handler for event "input": got undefined’
        props: {
          model: Object.fromEntries(this.model),
        }
      }} label-width="80px">
        {renderFormItem()}
      </el-form>
    )
  }
}
