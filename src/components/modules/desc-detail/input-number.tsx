import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class InputNumberPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'input-number 属性')
    const { value } = this.$attrs
    return <div class="el-form-item__content-detail">{value}</div>
  }
}
