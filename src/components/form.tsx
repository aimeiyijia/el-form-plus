import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
// 样式
import '../styles/index.scss'

@Component
export default class ElTableTs extends Vue {

  // form配置项相关
  @Prop({ type: Array, default: () => {} }) readonly model!: any
  // 表单校验规则
  @Prop({ type: Array, default: () => {} }) readonly rules!: any
  // form配置项相关
  @Prop({ type: Array, default: () => {} }) readonly attrs!: any

  // 数据相关
  @Prop({ type: Array, default: () => [] }) readonly formItems!: any[]

  created(){
    console.log(this.data, '表单数据')
  }

  render(h: CreateElement): VNode {
    const data = this.data

    const renderFormItem = function (){}

    return (
      <el-form ref="form" props={{ model: this.data }} label-width="80px"></el-form>
    )
  }
}
