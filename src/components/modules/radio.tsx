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
    const { groupOptions, options } = this.$attrs
    // 获取出除groupOptions, options之外的配置项
    const attrs = omit(this.$attrs, ['groupOptions', 'options'])

    console.log(attrs, '配置项')
    // 单选框组
    const renderOptions = () => {
      return (options as any).map((o: any) => {
        const { label, value } = o
        const restAttrs = omit(o, ['label', 'value'])
        console.log(restAttrs, '123')
        return (
          <el-radio
            on-input={(val: any) => {
              this.$emit('input', val)
            }}
            {...{ props: { ...attrs, label: value, ...restAttrs }, on: this.$listeners }}
          >
            {label}
          </el-radio>
        )
      })
    }

    // 单选框组
    const renderGroupOption = () => {
      const radios = (groupOptions as any).map((o: any) => {
        const { label, value } = o
        const restAttrs = omit(o, ['label', 'value'])
        return <el-radio {...{ props: { label: value, ...restAttrs } }} size="small">{label}</el-radio>
      })
      return (
        <el-radio-group
          on-input={(val: any) => {
            this.$emit('input', val)
          }}
          {...{ props: { ...attrs }, on: this.$listeners }}>
          {radios}
        </el-radio-group>
      )

    }

    const checkRenderType = () => {
      if(groupOptions) return renderGroupOption()
      return renderOptions()
    }
    return <fragment>{checkRenderType()}</fragment>
  }
}
