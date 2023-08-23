import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class SwitchDetail extends Vue {
  render(h: CreateElement): VNode {
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
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {content}
      </div>
    )
  }
}
