import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import type { Option } from 'element-ui'
import omit from 'lodash/omit'
import { isDefined, deepQuery } from '../../utils/index'
import { Fragment } from 'vue-frag'

@Component({
  components: { Fragment },
})
export default class CheckBoxDetail extends Vue {
  render(h: CreateElement): VNode {
    const { value, options = [], detail } = this.$attrs as any

    const { value: forceValue, separator = '；' } = detail

    // 根据value数组去匹配原始数据 然后再组装label
    const matchArrs: string[] = []
    for (const v of value) {
      const match: any = deepQuery(options, v)
      matchArrs.push(match.label)
    }

    const content = isDefined(forceValue)
      ? forceValue
      : matchArrs.join(separator)

    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {<span>{content}</span>}
      </div>
    )
  }
}
