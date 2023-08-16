import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { Fragment } from 'vue-frag'

@Component({
  components: { Fragment },
})
export default class RadioPlus extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'radio 属性')
    const { value, options } = this.$attrs as any
    const match = options.find((o: any) => o.value === value)
    return <div class="el-form-item__content-detail">{match.label}</div>
  }
}
