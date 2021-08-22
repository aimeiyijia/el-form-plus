import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class ColorPickerPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'InputPlus attrs')
    console.log(this.$listeners, 'InputPlus listeners')
    console.log(this.$scopedSlots, 'InputPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    return (
      <el-color-picker
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
      ></el-color-picker>
    )
  }
}
