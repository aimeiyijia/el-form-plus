import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class InputNumberDetail extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'input-number 属性')
    const { value, detail } = this.$attrs as any

    const { value: forceValue } = detail

    const content = isDefined(forceValue) ? forceValue : value
    return <div class="el-form-item__content-detail">{content}</div>
  }
}
