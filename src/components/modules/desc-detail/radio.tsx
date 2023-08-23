import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { isDefined, deepQuery } from '../../utils/index'
import { Fragment } from 'vue-frag'

@Component({
  components: { Fragment },
})
export default class RadioDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value, options = [], detail } = this.$attrs as any

    const { value: forceValue } = detail
    const match: any = deepQuery(options, value)
    const label = match ? match.label : ''
    const content = isDefined(forceValue) ? forceValue : label
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {content}
      </div>
    )
  }
}
