let id = 0
const cascader = {
  // 表单项渲染类型 必需
  type: 'Cascader',
  // 表单项绑定的值（字段名） 必需
  field: 'cascader',
  // 初始值 注意事项 开启多选时的value结构时[[value,value,value]]，
  value: [['zhinan', 'shejiyuanze', 'yizhi']],
  // 非多选时[value,value,value]
  // value: ['zhinan', 'shejiyuanze', 'yizhi'],
  detail: {
    // separator: '-',
    // 这里的value会覆盖外面的value，不做任何处理会直接渲染出来
    // value: '456789',
  },
  // 表单项的配置项
  attrs: {
    // 省市区联动快捷方式
    shortcut: 'area',
    // filterable: true,
    props: {
      multiple: true,
      // lazy: true,
      // lazyLoad(node, resolve) {
      //   const { level } = node
      //   setTimeout(() => {
      //     const nodes = Array.from({ length: level + 1 }).map(item => ({
      //       value: ++id,
      //       label: `选项${id}`,
      //       leaf: level >= 2,
      //     }))
      //     // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      //     resolve(nodes)
      //   }, 1000)
      // },
    },
    options: [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致',
              },
              {
                value: 'fankui',
                label: '反馈',
              },
              {
                value: 'xiaolv',
                label: '效率',
              },
              {
                value: 'kekong',
                label: '可控',
              },
            ],
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {
                value: 'cexiangdaohang',
                label: '侧向导航',
              },
              {
                value: 'dingbudaohang',
                label: '顶部导航',
              },
            ],
          },
        ],
      },
      {
        value: 'zujian',
        label: '组件',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout 布局',
              },
              {
                value: 'color',
                label: 'Color 色彩',
              },
              {
                value: 'typography',
                label: 'Typography 字体',
              },
              {
                value: 'icon',
                label: 'Icon 图标',
              },
              {
                value: 'button',
                label: 'Button 按钮',
              },
            ],
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio 单选框',
              },
              {
                value: 'checkbox',
                label: 'Checkbox 多选框',
              },
              {
                value: 'input',
                label: 'Input 输入框',
              },
              {
                value: 'input-number',
                label: 'InputNumber 计数器',
              },
              {
                value: 'select',
                label: 'Select 选择器',
              },
              {
                value: 'cascader',
                label: 'Cascader 级联选择器',
              },
              {
                value: 'switch',
                label: 'Switch 开关',
              },
              {
                value: 'slider',
                label: 'Slider 滑块',
              },
              {
                value: 'time-picker',
                label: 'TimePicker 时间选择器',
              },
              {
                value: 'date-picker',
                label: 'DatePicker 日期选择器',
              },
              {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器',
              },
              {
                value: 'upload',
                label: 'Upload 上传',
              },
              {
                value: 'rate',
                label: 'Rate 评分',
              },
              {
                value: 'form',
                label: 'Form 表单',
              },
            ],
          },
          {
            value: 'data',
            label: 'Data',
            children: [
              {
                value: 'table',
                label: 'Table 表格',
              },
              {
                value: 'tag',
                label: 'Tag 标签',
              },
              {
                value: 'progress',
                label: 'Progress 进度条',
              },
              {
                value: 'tree',
                label: 'Tree 树形控件',
              },
              {
                value: 'pagination',
                label: 'Pagination 分页',
              },
              {
                value: 'badge',
                label: 'Badge 标记',
              },
            ],
          },
          {
            value: 'notice',
            label: 'Notice',
            children: [
              {
                value: 'alert',
                label: 'Alert 警告',
              },
              {
                value: 'loading',
                label: 'Loading 加载',
              },
              {
                value: 'message',
                label: 'Message 消息提示',
              },
              {
                value: 'message-box',
                label: 'MessageBox 弹框',
              },
              {
                value: 'notification',
                label: 'Notification 通知',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'menu',
                label: 'NavMenu 导航菜单',
              },
              {
                value: 'tabs',
                label: 'Tabs 标签页',
              },
              {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑',
              },
              {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单',
              },
              {
                value: 'steps',
                label: 'Steps 步骤条',
              },
            ],
          },
          {
            value: 'others',
            label: 'Others',
            children: [
              {
                value: 'dialog',
                label: 'Dialog 对话框',
              },
              {
                value: 'tooltip',
                label: 'Tooltip 文字提示',
              },
              {
                value: 'popover',
                label: 'Popover 弹出框',
              },
              {
                value: 'card',
                label: 'Card 卡片',
              },
              {
                value: 'carousel',
                label: 'Carousel 走马灯',
              },
              {
                value: 'collapse',
                label: 'Collapse 折叠面板',
              },
            ],
          },
        ],
      },
      {
        value: 'ziyuan',
        label: '资源',
        children: [
          {
            value: 'axure',
            label: 'Axure Components',
          },
          {
            value: 'sketch',
            label: 'Sketch Templates',
          },
          {
            value: 'jiaohu',
            label: '组件交互文档',
          },
        ],
      },
    ],
  },
  // 表单项事件
  on: {
    blur: () => {
      console.log('失去焦点')
    },
    input: (val: any) => {
      console.log('input事件', val)
    },
    'expand-change': (val: any) => {
      console.log('expand-change事件', val)
    },
  },
  // 插槽
  // scopedSlots: {
  //   default(a: any) {
  //     console.log(a, 'default')
  //     return 111
  //   },
  //   empty(a: any) {
  //     console.log(a, 'empty')
  //     return '没有数据'
  //   },
  // },
  // el-form-item配置项 可选
  config: {
    // vue ref属性 默认为field 利用此属性来查找某一组件
    ref: 'cascader',
    label: 'cascader：',
    labelWidth: '120px',
  },
}
export default cascader
