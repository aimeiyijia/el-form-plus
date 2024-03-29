import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import type { Option } from 'element-ui'
import omit from 'lodash/omit'
import { cloneDeep } from 'lodash'

function transformKeyValue(
  o: any,
  {
    labelName = 'label',
    valueName = 'value',
  }: { labelName?: string, valueName?: string }
): any {
  return {
    ...omit(o, [labelName, valueName]),
    label: o[labelName],
    value: o[valueName],
  }
}

@Component
export default class SelectPlus extends Vue {
  render(h: CreateElement): VNode {
    const { labelName = 'label', valueName = 'value' } = this.$attrs
    // 组装插槽及作用域插槽
    const scopedSlots: any = this.$scopedSlots
    const slots = []
    const customScopedSlots: any = {}
    for (const slot in scopedSlots) {
      // el-select内部使用了 v-if="$slots.[slotName]"来判断是否有插槽
      // 因此这一步是骗它有插槽，然后再用scopedSlots来实现自定义渲染函数渲染插槽内容
      slots.push({ name: slot, value: [h('template')] })

      // 插槽额外增加h函数，便于生成vnode
      customScopedSlots[slot] = () => {
        return scopedSlots[slot]({ h, value: this.$attrs.value })
      }
    }

    const renderOptions = (options: any) => {
      return options.map((o: any) => {
        const transformObj = transformKeyValue(o, { labelName, valueName })
        const { value, slot } = transformObj
        return (
          <el-option
            key={value}
            {...{ attrs: transformObj, props: transformObj }}
          >
            {slot ? slot({ attr: transformObj }) : ''}
          </el-option>
        )
      })
    }
    const renderGroupOption = () => {
      const { groupOptions = [], options = [] } = cloneDeep(this.$attrs)
      const optionEl: any = []
      // groupOptions只要存在，就渲染分组select
      if (groupOptions) {
        (groupOptions as any).forEach((o: any) => {
          o.options = o.options.map((m: any) =>
            transformKeyValue(m, { labelName, valueName })
          )
          const { options: gOptions } = o
          // 除options之外的配置项均为group参数
          const restAttrs = omit(o, 'options')

          const el = (
            <el-option-group {...{ attrs: restAttrs, props: restAttrs }}>
              {renderOptions(gOptions)}
            </el-option-group>
          )
          optionEl.push(el)
        })
      }
      return optionEl.concat(renderOptions(options))
    }
    return (
      <el-select
        ref={this.$attrs.ref}
        {...{
          attrs: this.$attrs,
          props: this.$attrs,
          on: this.$listeners,
          scopedSlots: customScopedSlots,
        }}
      >
        {renderGroupOption()}
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </el-select>
    )
  }
}
