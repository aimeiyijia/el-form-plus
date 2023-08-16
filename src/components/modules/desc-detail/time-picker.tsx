import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class TimePickerPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'time-picker 属性')
    const { value } = this.$attrs
    return <div class="el-form-item__content-detail">{value}</div>
  }
}
