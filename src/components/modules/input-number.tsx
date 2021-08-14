import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class InputNumberPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'attrs')
    console.log(this.$listeners, 'listeners')
  }

  render(h: CreateElement): VNode {
    const renderOptions = () => {
      const { options } = this.$attrs
      console.log(options)
      return (options as any).map((o: any) => {
        const { label, value } = o
        return <el-option key={value} label={label} value={value}></el-option>
      })
    }
    return (
      <elSelect
        ref={this.$attrs.ref}
        type={this.$attrs.type}
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
      >
        {renderOptions()}
      </elSelect>
    )
  }
}
