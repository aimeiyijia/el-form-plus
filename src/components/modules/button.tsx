import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import omit from 'lodash/omit'

@Component
export default class ButtonPlus extends Vue {

  render(h: CreateElement): VNode {
    const { value } = this.$attrs
    const attrs = omit(this.$attrs, ['value'])
    return (
      <el-button
        {...{
          props: attrs,
          on: {
            click: (e: Event) => {
              if (this.$listeners.click) {
                (this.$listeners as any).click({ e, instance: this })
              }
              e.preventDefault()
            },
          },
        }}
      >
        {value}
      </el-button>
    )
  }
}
