import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class SwitchPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'switch 属性')
    const { value, activeText = '是', inactiveText = '否' } = this.$attrs
    let label = ''
    if (value) {
      label = activeText
    } else {
      label = inactiveText
    }
    return <div class="el-form-item__content-detail">{label}</div>
  }
}
