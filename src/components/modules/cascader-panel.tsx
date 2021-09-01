import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'

@Component
export default class CascaderPanelPlus extends Vue {
  mounted() {
    console.log(this, 'CascaderPanelPlus实例')
    console.log(this.$attrs, 'CascaderPanelPlus attrs')
    console.log(this.$listeners, 'CascaderPanelPlus listeners')
    console.log(this.$scopedSlots, 'CascaderPanelPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    // 组装插槽及作用域插槽
    const scopedSlots: any = this.$scopedSlots
    const slots = []
    const customScopedSlots: any = {}
    for (let slot in scopedSlots) {
      // el-autocomplete内部使用了 v-if="$slots.[slotName]"来判断是否有插槽
      // 因此这一步是骗它有插槽，然后再用scopedSlots来实现自定义渲染函数渲染插槽内容
      slots.push({ name: slot, value: [h('template')] })

      // 插槽额外增加h函数，便于生成vnode
      customScopedSlots[slot] = (item: any) => {
        return scopedSlots[slot]({ ...item, value: this.$attrs.value, h })
      }
    }
    return (
      <el-cascader-panel
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
        {...{ scopedSlots: customScopedSlots }}
      >
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </el-cascader-panel>
    )
  }
}
