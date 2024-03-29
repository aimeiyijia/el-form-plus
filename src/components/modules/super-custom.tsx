import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Fragment } from 'vue-frag'

@Component({
  components: { Fragment },
})
export default class CustomPlus extends Vue {
  render(h: CreateElement): VNode {
    const { custom } = this.$scopedSlots
    const node = custom ? custom({ h, instance: this }) : ''

    return <div class="el-form-item_super-custom">{node}</div>
  }
}
