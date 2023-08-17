import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class SwitchPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'switch 属性')
    const {
      value,
      activeText = '是',
      inactiveText = '否',
      detail,
    } = this.$attrs as any
    const { value: forceValue } = detail
    const content = isDefined(forceValue)
      ? forceValue
      : value
        ? activeText
        : inactiveText
    return <div class="el-form-item__content-detail">{content}</div>
  }
}
