import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class RatePlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'RatePlus attrs')
    console.log(this.$listeners, 'RatePlus listeners')
    console.log(this.$scopedSlots, 'RatePlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    return (
      <el-rate
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
      ></el-rate>
    )
  }
}
