import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { Fragment } from 'vue-frag'

import { isFunction } from '../../utils/index'

interface IAttrs {
  [key: string]: any
  [index: number]: any
}

@Component({
  components: { Fragment },
})
export default class CustomPlus extends Vue {

  @Watch('$attrs.value', { immediate: true, deep: true })
  private dataChange(val: any) {
    this.dispatch('ElFormItem', 'el.form.change', [val])
  }

  private dispatch(componentName: string, eventName: string, params: any[]) {
    let parent = this.$parent || this.$root;
    let name = (parent.$options as any).componentName;

    while (parent && (!name || name !== componentName)) {
      // @ts-ignore
      parent = parent.$parent;

      if (parent) {
        name = (parent.$options as any).componentName;
      }
    }
    if (parent) {
      const arg: any = [eventName].concat(params)
      // eslint-disable-next-line prefer-spread
      parent.$emit.apply(parent, arg);
    }
  }

  render(h: CreateElement): VNode {
    const { custom } = this.$scopedSlots
    const node = custom ? custom({ h, instance: this }) : ''

    return <fragment>{node}</fragment>
  }
}
