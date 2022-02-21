import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import omit from 'lodash/omit'
import { isArray } from '../utils/index'
import { Fragment } from 'vue-fragment'

@Component({
  components: { Fragment },
})
export default class CheckBoxPlus extends Vue {

  render(h: CreateElement): VNode {
    // 取出Checkbox渲染数组
    const { options = [], isGroup = false } = this.$attrs
    // 获取出除options, options之外的配置项
    const attrs = omit(this.$attrs, ['options', 'type'])

    // 单选框
    const renderSingleCheckboxs = () => {
      const checkboxs = (options as any).map((o: any) => {
        const { label, value, type } = o
        const restAttrs = omit(o, ['label', 'value', 'type'])
        let CheckboxTypeChild = 'el-checkbox'
        if (type === "button") { CheckboxTypeChild = 'el-checkbox-button' }
        else { CheckboxTypeChild = 'el-checkbox' }
        return (
          <CheckboxTypeChild
            {...{ props: { ...attrs, label: value, ...restAttrs }, on: this.$listeners }}
          >
            {label}
          </CheckboxTypeChild>
        )
      })
      return checkboxs
    }

    // 单选框组
    const renderGroupCheckboxs = () => {
      return (
        <el-checkbox-group
          {...{ props: { ...attrs }, on: this.$listeners }}>
          {renderSingleCheckboxs()}
        </el-checkbox-group>
      )
    }

    const renderCheckboxs = () => {
      // 如果value为数组类型，则渲染为多选框组
      if (isGroup) {
        return renderGroupCheckboxs()
      }
      return renderSingleCheckboxs()
    }

    return <fragment>{renderCheckboxs()}</fragment>
  }
}
