import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class ColorPickerPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'color-picker 属性')
    const { value } = this.$attrs
    return (
      <div class="el-form-item__content-detail">
        <span
          {...{ class: 'color-block', style: { backgroundColor: value } }}
        ></span>
      </div>
    )
  }
}
