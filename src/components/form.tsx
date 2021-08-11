import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
// 样式
import './styles/index.scss'

import Input from './modules/input'

@Component
export default class ElTableTs extends Vue {
  // 表单整体配置
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  // 单个表单配置项组成的表单项渲染规则
  @Prop({ type: Array, default: () => [] }) readonly options!: any[]

  private model = {
    name: 123
  }

  created() {
    // console.log(this.config, '表单配置项')
    // console.log(this.options, '表单项配置项')
  }

  render(h: CreateElement): VNode {
    let value = '1'
    // 渲染表单项
    const renderSingleForm = (singleFormOption: any) => {

      let { field } = singleFormOption
      console.log(field, '值')
      console.log(this.model[field], '值')
      return (
        <Input {...{ props: { config: singleFormOption, model: this.model } }}></Input>
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
          model: this.model,
        }
      }} label-width="80px">
        {renderFormItem()}
      </el-form>
    )
  }
}
