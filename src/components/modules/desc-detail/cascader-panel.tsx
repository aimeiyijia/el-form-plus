import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class CascaderPanelPlus extends Vue {
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
    console.log(this.$attrs, 'cascader-panel 属性')
    const { value, options }: any = this.$attrs
    const matchArrs = []
    for (const v of value) {
      const matchArr = []
      for (const v1 of v) {
        const match: any = this.deepQuery(options, v1)
        matchArr.push(match.label)
      }
      matchArrs.push(matchArr)
      options.find((o: any) => o.value === 1)
    }

    const labels = []
    for (const v of matchArrs) {
      labels.push(<div>{v.join('/')}</div>)
    }
    return <div class="el-form-item__content-detail">{labels}</div>
  }
}
