import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class RatePlus extends Vue {

  render(h: CreateElement): VNode {
    return <el-rate {...{ props: this.$attrs, on: this.$listeners }} />
  }
}
