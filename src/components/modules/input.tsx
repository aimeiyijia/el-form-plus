import Vue, { VNode, CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class ElTableTs extends Vue {

  // 表单整体配置
  @Prop({ type: Object, default: () => { } }) readonly config!: any

  @Prop({ type: Object, default: () => { } }) readonly model!: any

  created(){
    console.log(this, 'input实例')
  }

  render(h: CreateElement): VNode {





    return  <el-input
             value={this.model[this.config.field]}
            on-input={(val) => {this.model[this.config.field] = val}} />
  }
}
