import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { Fragment } from 'vue-fragment'

@Component({
  components: { Fragment },
})
export default class RadioPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'attrs')
    console.log(this.$listeners, 'listeners')
    console.log(this.$scopedSlots, 'scopedSlots')
  }

  render(h: CreateElement): VNode {
    // 取出radio渲染数组
    const { options } = this.$attrs
    // 获取出除options之外的配置项
    const attrs = omit(this.$attrs, ['options'])
    console.log(attrs, '值')
    const renderOptions = () => {
      // 为了保持统一，需要交换下label与value
      const { options } = this.$attrs
      return (options as any).map((o: any) => {
        const { label, value } = o
        return (
          <el-radio
            on-input={(val: any) => {
              this.$emit('input', val)
            }}
            value={attrs.value}
            {...{ props: {label: value}, on: this.$listeners}}
          >
            {label}
          </el-radio>
        )
      })
    }
    // const renderGroupOption = () => {
    //   const { groupOptions, options } = this.$attrs
    //   let optionEl: any = []
    //   // groupOptions只要存在，就渲染分组select
    //   if (groupOptions) {
    //     (groupOptions as any).forEach((o: any) => {
    //       const { options: gOptions } = o
    //       // 除options之外的配置项均为group参数
    //       const restAttrs = omit(o, 'options')

    //       const el = <el-radio-group {...{ props: restAttrs }}>{renderOptions(gOptions)}</el-radio-group>
    //       optionEl.push(el)
    //     })
    //   }
    //   return optionEl.concat(renderOptions(options))
    // }
    return <fragment>{renderOptions()}</fragment>
  }
}
