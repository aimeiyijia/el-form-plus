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

  @Watch('$attrs.value', { immediate: true, deep: true })
  private dataChange(val: any) {
    this.dispatch('ElFormItem', 'el.form.change', [val])
  }

  private dispatch(componentName: string, eventName: string, params: any[]) {
    var parent = this.$parent || this.$root;
    var name = (parent.$options as any).componentName;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = (parent.$options as any).componentName;
      }
    }
    if (parent) {
      const arg: any = [eventName].concat(params)
      parent.$emit.apply(parent, arg);
    }
  }

  render(h: CreateElement): VNode {
    const { customNode } = this.$attrs as IAttrs
    const node = customNode({ h, instance: this })

    return <fragment>{node}</fragment>
  }
}
