import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class RadioPlus extends Vue {

  // 数据相关
  @Prop({ type: Array, default: () => [] }) readonly data!: any[]

  created(){
    console.log(this.data, '表单数据')
  }

  render(h: CreateElement): VNode {
    const data = this.data





    return h('div')
  }
}
