import Vue, { VNode, CreateElement } from 'vue'
import { Component, Emit } from 'vue-property-decorator'

@Component
export default class AutocompletePlus extends Vue {
  render(h: CreateElement): VNode {
    const { value } = this.$attrs
    return <div class="el-form-item__content-detail">{value}</div>
  }
}
