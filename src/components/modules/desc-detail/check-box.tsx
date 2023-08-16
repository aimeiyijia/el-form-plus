import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import type { Option } from 'element-ui'
import omit from 'lodash/omit'
import { isArray } from '../../utils/index'
import { Fragment } from 'vue-frag'

@Component({
  components: { Fragment },
})
export default class CheckBoxPlus extends Vue {
  deepQuery(tree: any, value: string) {
    let isGet = false
    let retNode = null
    function deepSearch(tree: any, value: string) {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].children && tree[i].children.length > 0) {
          deepSearch(tree[i].children, value)
        }
        if (value === tree[i].value || isGet) {
          isGet || (retNode = tree[i])
          isGet = true
          break
        }
      }
    }
    deepSearch(tree, value)
    return retNode
  }

  render(h: CreateElement): VNode {
    console.log(this.$attrs, 'checkbox 属性')
    const { value, options } = this.$attrs as any
    const matchArrs: string[] = []
    for (const v of value) {
      const match: any = this.deepQuery(options, v)
      matchArrs.push(match.label)
    }

    return (
      <div class="el-form-item__content-detail">
        {<div>{matchArrs.join('/')}</div>}
      </div>
    )
  }
}
