import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { Fragment } from 'vue-fragment'

// todo 区分groupCheckbox Event与单checkbox Event

@Component({
  components: { Fragment },
})
export default class CheckBoxPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'attrs')
    console.log(this.$listeners, 'listeners')
    console.log(this.$scopedSlots, 'scopedSlots')
  }

  render(h: CreateElement): VNode {
    // 取出Checkbox渲染数组
    const { options = [], lable, type = '' } = this.$attrs
    // 获取出除options, options之外的配置项
    const attrs = omit(this.$attrs, ['options', 'type', 'lable'])

    let CheckboxType = 'el-checkbox'
    if (type) CheckboxType = 'el-checkbox-' + type

    // 单选框
    const renderOptions = () => {
      const { label, value, type } = attrs
      const restAttrs = omit(attrs, ['label', 'value', 'type'])
      let CheckboxTypeChild = 'el-checkbox'
      if (type === "button") { CheckboxTypeChild = 'el-checkbox-button' }
      else if (!type) { CheckboxTypeChild = CheckboxType }
      else { CheckboxTypeChild = 'el-checkbox' }
      return (
        <CheckboxTypeChild
          on-input={(val: any) => {
            this.$emit('input', val)
          }}
          {...{ props: { ...attrs, label: value, ...restAttrs }, on: this.$listeners }}
        >
          {label}
        </CheckboxTypeChild>
      )
    }

    // 单选框组
    const renderGroupOption = () => {
      const checkboxs = (options as any).map((o: any) => {
        const { label, value, type } = o
        const restAttrs = omit(o, ['label', 'value', 'type'])
        let CheckboxTypeChild = 'el-checkbox'
        if (type === "button") { CheckboxTypeChild = 'el-checkbox-button' }
        else if (!o.hasOwnProperty('type')) { CheckboxTypeChild = CheckboxType }
        else { CheckboxTypeChild = 'el-checkbox' }
        return <CheckboxTypeChild {...{ props: { label: value, ...restAttrs } }}>{label}</CheckboxTypeChild>
      })
      return (
        <el-checkbox-group
          on-input={(val: any) => {
            this.$emit('input', val)
          }}
          {...{ props: { ...attrs }, on: this.$listeners }}>
          {checkboxs}
        </el-checkbox-group>
      )

    }

    const renderCheckboxs = () => {
      // return renderOptions().concat(renderGroupOption())
      if (options.length === 0) return renderOptions()
      return renderGroupOption()
    }
    return <fragment>{renderCheckboxs()}</fragment>
  }
}
