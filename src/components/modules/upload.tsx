import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { omit, isFunction } from 'lodash'

@Component
export default class UploadPlus extends Vue {
  mounted() {
    console.log(this.$attrs, 'UploadPlus attrs')
    console.log(this.$listeners, 'UploadPlus listeners')
    console.log(this.$scopedSlots, 'UploadPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    const attrs = omit(this.$attrs, 'onChange')
    // 组装插槽及作用域插槽
    const scopedSlots: any = this.$scopedSlots
    const slots = []
    for (let slot in scopedSlots) {
      slots.push({
        name: slot,
        value: scopedSlots[slot]({ h, value: this.$attrs.value }),
      })
    }

    // 拦截onChange事件，捕获到变更的文件列表
    const onChange = (file: object, fileList: object[]) => {
      const origOnChangeF = this.$attrs.onChange
      if (!origOnChangeF) return
      if (isFunction(origOnChangeF)) {
        origOnChangeF.call(null, file, fileList)
      } else {
        console.error(`onChange必须是函数`)
      }
      this.$emit('input', fileList)
    }
    return (
      <el-upload
        {...{
          props: { ...attrs, onChange: onChange },
          on: this.$listeners,
        }}
      >
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </el-upload>
    )
  }
}
