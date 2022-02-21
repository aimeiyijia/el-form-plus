import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class TimePickerPlus extends Vue {
  render(h: CreateElement): VNode {
    return <el-time-picker {...{ props: this.$attrs, on: this.$listeners }} />
  }
}
