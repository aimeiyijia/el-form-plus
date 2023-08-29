import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import type { Option } from 'element-ui'
// @ts-ignore
import omit from 'lodash/omit'
import { isDefined } from '../../utils/index'

type SelectPlus = {
  value: any
  groupOptions: Option[]
  options: Option[]
}

@Component
export default class SelectDetail extends Vue {
  render(h: CreateElement): VNode {
    const {
      value,
      groupOptions = [],
      options = [],
      detail,
    } = this.$attrs as any
    const { value: forceValue, format } = detail
    let curOption: any = (options as Option[]).find(o => o.value === value)
    if (!curOption) {
      curOption = groupOptions.find((o: any) => {
        o.next = {}
        const next = o.options.find((m: any) => m.value === value)
        if (next) {
          o.next = next
          delete o.options
          return next
        }
        return false
      })
      if (!curOption) {
        curOption = {
          value: '',
          label: '未知',
        }
      }
    }
    let label = curOption.label
    if (curOption.next && curOption.next.label) {
      label = label + '/' + curOption.next.label
    }
    function getContent() {
      if (isDefined(forceValue)) return forceValue
      if (format) {
        return format(value)
      }
      return label
    }
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {getContent()}
      </div>
    )
  }
}
