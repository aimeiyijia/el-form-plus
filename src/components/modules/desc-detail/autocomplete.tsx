import Vue, { VNode, CreateElement } from 'vue'
import { Component, Emit } from 'vue-property-decorator'
import { isDefined, isFunction } from '../../utils/index'

@Component
export default class AutocompleteDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value, detail } = this.$attrs as any
    const { value: forceValue, format } = detail
    function getContent() {
      if (isDefined(forceValue)) return forceValue
      if (format) {
        return format(value)
      }
      return value
    }
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {getContent()}
      </div>
    )
  }
}
