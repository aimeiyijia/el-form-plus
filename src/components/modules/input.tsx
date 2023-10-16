import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { isBoolean, isFunction, isObject } from '../utils'
import '../directives/thousands'
@Component
export default class InputPlus extends Vue {
  customInput(val: any, leg = 2) {
    const reg1 = /^\d{1,11}$|^\d{1,11}[.]\d{1,8}$/
    console.log(val.match(reg1), 'test')
    const reg = new RegExp(`^\\d*(\\.?\\d{0,${leg}})`, 'g')
    const { input } = this.$listeners as any
    if (!input) return
    if (isFunction(input)) {
      const finalVal =
        val
          .toString() // 第一步：转成字符串
          .replace(/[^\d^.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
          .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
          .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
          .match(reg)[0] || '' // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
      // eslint-disable-next-line no-useless-call
      input.call(this, finalVal)
    }
  }

  get moneyExit() {
    const { money } = this.$attrs
    if (!money) return false
    if (isBoolean(money)) {
      return money
    }
    return money
  }

  get moneyConfig() {
    const { money } = this.$attrs
    return isObject(money) ? money : {}
  }

  get directives() {
    const directives = this.moneyExit
      ? [
          {
            name: 'thousands',
            value: this.moneyConfig,
          },
        ]
      : []
    return directives
  }

  get listeners() {
    const { precision = 2 } = this.moneyConfig as any
    return this.moneyExit
      ? {
          ...this.$listeners,
          input: (val: any) => this.customInput(val, precision),
        }
      : this.$listeners
  }

  render(h: CreateElement): VNode {
    // 组装插槽及作用域插槽
    const scopedSlots: any = this.$scopedSlots
    const slots = []
    const customScopedSlots: any = {}
    for (const slot in scopedSlots) {
      // el-input内部使用了 v-if="$slots.[slotName]"来判断是否有插槽
      // 因此这一步是骗它有插槽，然后再用scopedSlots来实现自定义渲染函数渲染插槽内容
      slots.push({ name: slot, value: [h('template')] })
      // 插槽额外增加h函数，便于生成vnode
      customScopedSlots[slot] = () => {
        return scopedSlots[slot]({ h, value: this.$attrs.value })
      }
    }
    return (
      <el-input
        {...{ directives: this.directives }}
        {...{
          attrs: this.$attrs,
          props: this.$attrs,
          on: this.listeners,
          scopedSlots: customScopedSlots,
        }}
      >
        {slots.map(o => {
          return <template slot={o.name}>{o.value}</template>
        })}
      </el-input>
    )
  }
}
