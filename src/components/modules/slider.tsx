import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class SliderPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'SliderPlus attrs')
    console.log(this.$listeners, 'SliderPlus listeners')
    console.log(this.$scopedSlots, 'SliderPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    return (
      <el-slider
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
      ></el-slider>
    )
  }
}
