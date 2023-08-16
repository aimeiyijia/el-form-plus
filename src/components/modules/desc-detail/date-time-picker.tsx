import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class DateTimePickerPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'date-time-picker 属性')
    const { value } = this.$attrs
    return <div class="el-form-item__content-detail">{value}</div>
  }
}
