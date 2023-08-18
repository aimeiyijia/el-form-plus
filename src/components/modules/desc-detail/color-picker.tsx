import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isDefined } from '../../utils/index'
@Component
export default class ColorPickerDetail extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'color-picker 属性')
    const { value, detail } = this.$attrs as any

    const { value: forceValue } = detail

    const content = isDefined(forceValue) ? forceValue : value
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        <span
          {...{ class: 'color-block', style: { backgroundColor: content } }}
        >
          {content}
        </span>
      </div>
    )
  }
}
