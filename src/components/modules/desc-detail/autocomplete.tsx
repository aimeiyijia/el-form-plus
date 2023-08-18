import Vue, { VNode, CreateElement } from 'vue'
import { Component, Emit } from 'vue-property-decorator'

@Component
export default class AutocompleteDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value } = this.$attrs
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {value}
      </div>
    )
  }
}
