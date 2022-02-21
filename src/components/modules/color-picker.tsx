import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class ColorPickerPlus extends Vue {
  render(h: CreateElement): VNode {
    return <el-color-picker {...{ props: this.$attrs, on: this.$listeners }} />
  }
}
