import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'

@Component
export default class SelectPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'attrs')
    console.log(this.$listeners, 'listeners')
    console.log(this.$scopedSlots, 'scopedSlots')
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

    const renderOptions = (options: any) => {
      console.log(options)
      return options.map((o: any) => {
        const { value, slot } = o
        console.log(slot, '567')
        return <el-option key={value} {...{ props: o }}>{slot({attr: o})}</el-option>
      })
    }
    const renderGroupOption = () => {
      const { groupOptions, options } = this.$attrs
      // groupOptions只要存在，就渲染分组select
      if (groupOptions) {
        return (groupOptions as any).map((o: any) => {
          const { options: gOptions } = o
          // 除options之外的配置项均为group参数
          const restAttrs = omit(o, 'options')

          return <el-option-group {...{ props: restAttrs }}>{renderOptions(gOptions)}</el-option-group>
        })
      }
      return renderOptions(options)
    }
    return (
      <elSelect
        ref={this.$attrs.ref}
        type={this.$attrs.type}
        on-input={(val: any) => {
          this.$emit('input', val)
        }}
        {...{ props: this.$attrs, on: this.$listeners }}
        {...{ scopedSlots }}
      >
        {renderGroupOption()}
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </elSelect>
    )
  }
}
