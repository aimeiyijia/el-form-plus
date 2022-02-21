import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'

@Component
export default class InputNumberPlus extends Vue {
  mounted() {
    console.log(this, 'InputNumberPlus实例')
    console.log(this.$attrs, 'InputNumberPlus attrs')
    console.log(this.$listeners, 'InputNumberPlus listeners')
    console.log(this.$scopedSlots, 'InputNumberPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    return (
      <el-input-number
        {...{ props: this.$attrs, on: this.$listeners }}
      ></el-input-number>
    )
  }
}
