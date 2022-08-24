import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { Fragment } from 'vue-fragment'

import { isFunction } from '../utils/index'

interface IAttrs {
  [key: string]: any
  [index: number]: any
}

@Component({
  components: { Fragment },
})
export default class CustomPlus extends Vue {

  mounted() {
    console.log(this.$attrs, 'SuperCustomPlus attrs')
    // console.log(this.$listeners, 'CustomPlus listeners')
    console.log(this.$scopedSlots, 'SuperCustomPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    const { custom } = this.$scopedSlots
    const node = custom ? custom({ h, instance: this }) : ''

    return <fragment>123456</fragment>
  }
}
