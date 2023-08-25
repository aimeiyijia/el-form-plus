import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import moment from 'dayjs'
import { isDefined, isArray } from '../../utils/index'
@Component
export default class TimeSelectDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value, detail } = this.$attrs as any

    const { value: forceValue, format = 'HH-mm-ss', separator = '~' } = detail
    function getContent() {
      if (isDefined(forceValue)) return forceValue
      if (isArray(value)) {
        const formatValue = []
        for (const v of value) {
          const formatV = format ? format(v) : v
          formatValue.push(formatV)
        }
        return formatValue.join(separator)
      }
      return format ? format(value) : value
    }
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {getContent()}
      </div>
    )
  }
}
