import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class SliderDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value, detail } = this.$attrs as any

    const { value: forceValue, separator = ' ~ ' } = detail

    const content = isDefined(forceValue) ? forceValue : value.join(separator)
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {content}
      </div>
    )
  }
}
