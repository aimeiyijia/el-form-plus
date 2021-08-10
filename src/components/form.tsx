import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
// 样式
import './styles/index.scss'

@Component
export default class ElTableTs extends Vue {

  // form配置项相关
  @Prop({ type: Object, default: () => { } }) readonly model!: any
  // 表单校验规则
  @Prop({ type: Object, default: () => { } }) readonly rules!: any
  // form配置项相关
  @Prop({ type: Object, default: () => { } }) readonly attrs!: any

  // 数据相关
  @Prop({ type: Array, default: () => [] }) readonly formItems!: any[]

  created() {
    // console.log(this.model, '表单数据')
    // console.log(this.rules, '表单检验规则')
    // console.log(this.attrs, '表单配置项')
    // console.log(this.formItems, '表单项')
  }

  render(h: CreateElement): VNode {
    const model = this.model
    const formItems = this.formItems

    const renderFormItem = function () {

      return formItems.map(o => {

        const itemProp = omit(o, ['type', 'filed'])
        console.log(itemProp, '单项配置')
        console.log(o.filed, '单项')

        return (
          <el-form-item {...{ props: itemProp }}>
            <el-input
              value={model[o.filed]}
              on-input={(val: any) => model[o.filed] = val} />
          </el-form-item>)
      })
    }

    return (
      <el-form ref="form" model={this.model} label-width="80px">
        {renderFormItem()}
      </el-form>
    )
  }
}
