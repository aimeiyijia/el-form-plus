import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class SliderPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'slider 属性')
    const { value, detail } = this.$attrs as any

    const { value: forceValue, separator = ' ~ ' } = detail

    const content = isDefined(forceValue) ? forceValue : value.join(separator)
    return <div class="el-form-item__content-detail">{content}</div>
  }
}
