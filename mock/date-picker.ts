import Vue from 'vue'
const datepicker = {
  // 表单项渲染类型 必需
  type: 'DatePicker',
  // 表单是否隐藏 默认为false（控制的是el-form-item）
  hidden: false,
  // 表单项绑定的值（字段名） 必需
  field: 'datePicker',
  // 初始值
  value: '',
  // 表单项的配置项
  attrs: {
    type: 'daterange',
    align: 'right',
    unlinkPanels: true,
    rangeSeparator: '至',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    pickerOptions: {
      shortcuts: [
        {
          text: '最近一周',
          onClick(picker: Vue) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        },
        {
          text: '最近一个月',
          onClick(picker: Vue) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        },
        {
          text: '最近三个月',
          onClick(picker: Vue) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        },
      ],
    },
  },
  // 表单项事件
  on: {
    blur: () => {
      console.log('失去焦点')
    },
    focus: () => {
      console.log('focus事件')
    },
    change(val: any) {
      console.log('change事件', val)
    },
  },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'datePicker',
    label: 'datePicker：',
    labelWidth: '120px',
  },
}
export default datepicker
