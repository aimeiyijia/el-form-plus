import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import {
  isDefined,
  deepQuery,
  isArray,
  isMultiDimension,
} from '../../utils/index'
@Component
export default class CascaderDetail extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'cascader-panel 属性')
    const { value, options, detail }: any = this.$attrs

    const { value: forceValue, separator = '/' } = detail

    const matchArrs: any = []
    for (const v of value) {
      const matchArr = []
      if (isArray(v)) {
        for (const v1 of v) {
          const match: any = deepQuery(options, v1)
          matchArr.push(match.label)
        }
        matchArrs.push(matchArr)
      } else {
        const match: any = deepQuery(options, v)
        matchArrs.push(match.label)
      }
    }

    function getContent() {
      if (isDefined(forceValue)) return forceValue
      const labels = []
      if (isMultiDimension(matchArrs)) {
        for (const v of matchArrs) {
          labels.push(<div>{v.join(separator)}</div>)
        }
      } else {
        labels.push(<div>{matchArrs.join(separator)}</div>)
      }
      return labels
    }

    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {getContent()}
      </div>
    )
  }
}
