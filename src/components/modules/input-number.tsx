import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'

@Component
export default class InputNumberPlus extends Vue {

  render(h: CreateElement): VNode {
    return (
      <el-input-number
        {...{
          props: this.$attrs,
          on: {
            ...this.$listeners,
            change: (currentValue: number, oldValue: number) => {
              this.$emit('input', currentValue)
              this.$emit('change', currentValue, oldValue)
            },
          },
        }}
      ></el-input-number>
    )
  }
}
