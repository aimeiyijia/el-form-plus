import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined, isArray } from '../../utils/index'
@Component
export default class TimePickerPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'time-picker 属性')
    const { value, detail } = this.$attrs as any

    const { value: forceValue, separator = '~' } = detail
    function getContent() {
      if (isDefined(forceValue)) return forceValue
      if (isArray(value)) return value.join(separator)
      return value
    }
    return <div class="el-form-item__content-detail">{getContent()}</div>
  }
}
