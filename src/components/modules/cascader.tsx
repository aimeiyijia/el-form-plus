import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class CascaderPlus extends Vue {
  render(h: CreateElement): VNode {
    return (
      <el-cascader
        {...{
          props: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
        }}
      />
    )
  }
}
