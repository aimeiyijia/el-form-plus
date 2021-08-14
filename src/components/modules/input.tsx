import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class InputPlus extends Vue {

  mounted() {
    console.log(this, 'input实例')
    console.log(this.$attrs, 'attrs')
    console.log(this.$listeners, 'listeners')
  }

  render(h: CreateElement): VNode {
    return (
      <el-input
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
      />
    )
  }
}
