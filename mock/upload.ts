import Vue, { VNode, CreateElement } from 'vue'
import { Message, MessageBox } from 'element-ui'
function handleRemove(file: any[], fileList: any[]) {
  console.log(file, '移除的文件')
  console.log(fileList, '剩余的文件')
}
function handleChange(file: any[], fileList: any[]) {
  console.log(file, '变化的文件')
  console.log(fileList, '剩余的文件')
}
function handlePreview(file: any) {
  console.log(file)
}
function handleExceed(files: any[], fileList: any[]) {
  Message.warning(
    `当前限制选择 3 个文件，本次选择了 ${
      files.length
    } 个文件，共选择了 ${files.length + fileList.length} 个文件`
  )
}
function beforeRemove(file: any) {
  return MessageBox.confirm(`确定移除 ${file.name}？`)
}
const fileList = [
  {
    name: 'food.jpeg',
    url:
      'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url:
      'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
]
const upload = {
  // 表单项渲染类型 必需
  type: 'Upload',
  // 表单项绑定的值（字段名） 必需
  field: 'upload',
  // 初始值
  value: '',
  // 表单项的配置项
  attrs: {
    action: 'https://jsonplaceholder.typicode.com/posts/',
    onPreview: handlePreview,
    onRemove: handleRemove,
    beforeRemove: beforeRemove,
    multiple: true,
    limit: 3,
    onExceed: handleExceed,
    fileList: fileList,
    onChange: handleChange,
  },
  // 表单项事件
  on: {
    input: (val: any) => {
      console.log('input事件', val)
    },
  },
  // 插槽
  scopedSlots: {
    default({ h }: { h: CreateElement }) {
      return h('el-button', '插槽点击上传')
    },
    tip({ h }: { h: CreateElement }) {
      console.log('tip插槽')
      return '只能上传jpg/png文件，且不超过500kb'
    },
  },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'upload',
    label: 'upload：',
    // labelWidth: '120px',
  },
}
export default upload
