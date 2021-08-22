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
    const { groupOptions, options, type } = this.$attrs
    // 获取出除groupOptions, options之外的配置项
    const attrs = omit(this.$attrs, ['groupOptions', 'options', 'type'])
    const { groupChange, singleChange } = this.$listeners

    let RadioType = 'el-radio'
    if (type) RadioType = 'el-radio-' + type

    console.log(attrs, '配置项')
    // 单选框
    const renderOptions = () => {
      return (options as any).map((o: any) => {
        const { label, value, type } = o
        const restAttrs = omit(o, ['label', 'value', 'type'])
        let RadioTypeChild = 'el-radio'
        if (type === "button") { RadioTypeChild = 'el-radio-button' }
        else if (!type) { RadioTypeChild = RadioType }
        else { RadioTypeChild = 'el-radio' }
        console.log(restAttrs, '123')
        return (
          <RadioTypeChild
            on-input={(val: any) => {
              this.$emit('input', val)
            }}
            {...{ props: { ...attrs, label: value, ...restAttrs }, on: { change: singleChange } }}
          >
            {label}
          </RadioTypeChild>
        )
      })
    }

    // 单选框组
    const renderGroupOption = () => {
      const radios = (groupOptions as any).map((o: any) => {
        const { label, value, type } = o
        const restAttrs = omit(o, ['label', 'value', 'type'])
        let RadioTypeChild = 'el-radio'
        if (type === "button") { RadioTypeChild = 'el-radio-button' }
        else if (!type) { RadioTypeChild = RadioType }
        else { RadioTypeChild = 'el-radio' }
        return <RadioTypeChild {...{ props: { label: value, ...restAttrs } }}>{label}</RadioTypeChild>
      })
      return (
        <el-radio-group
          on-input={(val: any) => {
            this.$emit('input', val)
          }}
          {...{ props: { ...attrs }, on: { change: groupChange } }}>
          {radios}
        </el-radio-group>
      )

    }

    const renderRadios = () => {
      return renderOptions().concat(renderGroupOption())
    }
    return <fragment>{renderRadios()}</fragment>
  }
}
