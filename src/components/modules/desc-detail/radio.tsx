import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { isDefined } from '../../utils/index'
import { Fragment } from 'vue-frag'

@Component({
  components: { Fragment },
})
export default class RadioDetail extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'radio 属性')
    const { value, detail } = this.$attrs as any

    const { value: forceValue } = detail

    const content = isDefined(forceValue) ? forceValue : value
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {content}
      </div>
    )
  }
}
