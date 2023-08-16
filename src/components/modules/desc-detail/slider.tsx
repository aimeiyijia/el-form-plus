import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class SliderPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'slider 属性')
    const { value } = this.$attrs
    const label = (value as unknown as string[]).join(' ~ ')
    return <div class="el-form-item__content-detail">{label}</div>
  }
}
