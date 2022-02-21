import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class DatePickerPlus extends Vue {
  render(h: CreateElement): VNode {
    return <el-date-picker {...{ props: this.$attrs, on: this.$listeners }} />
  }
}
