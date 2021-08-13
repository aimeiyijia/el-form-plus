import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class ElTableTs extends Vue {

  // 表单整体配置
  // @Prop({ type: Object, default: () => { } }) readonly props!: any

  // @Prop({ type: Object, default: () => { } }) readonly model!: any

  // private test = ''

  mounted() {
    console.log(this, 'input实例')
    console.log(this.$attrs, 'attrs')
    console.log(this.$listeners, 'listeners')
  }

  render(h: CreateElement): VNode {
    return <el-input
      value={this.$attrs.value}
      on-input={(val: any) => { this.$emit('input', val) }}
      {...{ on: this.$listeners }}
    />
  }
}
