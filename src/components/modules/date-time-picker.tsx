import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class DateTimePickerPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'InputPlus attrs')
    console.log(this.$listeners, 'InputPlus listeners')
    console.log(this.$scopedSlots, 'InputPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    // 组装插槽及作用域插槽
    const scopedSlots = this.$scopedSlots
    const slots = []
    for (let slot in scopedSlots) {
      // el-input内部使用了 v-if="$slots.[slotName]"来判断是否有插槽
      // 因此这一步是骗它有插槽，然后再用scopedSlots来实现自定义渲染函数渲染插槽内容
      slots.push({ name: slot, value: [h('template')] })
    }

    return (
      <el-date-picker
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
        {...{ scopedSlots }}
      >
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </el-date-picker>
    )
  }
}
