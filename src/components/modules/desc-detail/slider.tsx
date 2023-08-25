import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class SliderDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value, detail } = this.$attrs as any

    const { value: forceValue, separator = ' ~ ', format } = detail

    function getContent() {
      if (isDefined(forceValue)) return forceValue
      if (format) {
        return value.map((o: any) => format(o)).join(separator)
      }
      return value.join(separator)
    }
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {getContent()}
      </div>
    )
  }
}
