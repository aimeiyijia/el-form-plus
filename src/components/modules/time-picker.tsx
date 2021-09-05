import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class TimePickerPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'TimePickerPlus attrs')
    console.log(this.$listeners, 'TimePickerPluss listeners')
    console.log(this.$scopedSlots, 'TimePickerPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    return (
      <el-time-picker
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
      ></el-time-picker>
    )
  }
}
