import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import moment from 'dayjs'
import { isDefined, isArray } from '../../utils/index'

@Component
export default class DateTimePickerDetail extends Vue {
  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'date-time-picker 属性')
    const { value, detail } = this.$attrs as any

    const {
      value: forceValue,
      format = 'YYYY-MM-DD HH-mm-ss',
      separator = ' ~ ',
    } = detail
    function getContent() {
      if (isDefined(forceValue)) return forceValue
      if (isArray(value)) {
        const formatValue = []
        for (const v of value) {
          const formatV = moment(v).format(format)
          formatValue.push(formatV)
        }
        return formatValue.join(separator)
      }
      return moment(value).format(format)
    }
    return (
      <div class="el-form-item__content-detail" {...{ on: this.$listeners }}>
        {getContent()}
      </div>
    )
  }
}
