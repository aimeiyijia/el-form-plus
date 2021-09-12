import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { Fragment } from 'vue-fragment'

interface IAttrs {
  [key: string]: any;
  [index: number]: any;
}

@Component({
  components: { Fragment },
})
export default class CustomPlus extends Vue {

  mounted() {
    console.log(this.$attrs, 'CustomPlus attrs')
    // console.log(this.$listeners, 'CustomPlus listeners')
    // console.log(this.$scopedSlots, 'CustomPlus scopedSlots')
  }

  render(h: CreateElement): VNode {
    const { customNode } = this.$attrs as IAttrs
    const node = customNode({ h, instance: this })
    return <fragment>{node}</fragment>
  }
}
