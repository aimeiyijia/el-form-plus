<template>
  <div id="app">
    <el-form-plus :config="config" :options="options"></el-form-plus>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      // 表单整体配置
      config: {
        labelWidth: '60px',
      },

      // 表单项配置
      options: [
        // {
        //   // 表单项渲染类型 必需
        //   type: 'Input',
        //   // 表单是否隐藏 默认为false（控制的是el-form-item）
        //   hidden: false,
        //   // 表单项的配置项
        //   attrs: {
        //     type: 'text',
        //     // 表单项绑定的值（字段名） 必需
        //     field: 'name',
        //     // 初始值
        //     value: '',
        //   },
        //   // 表单项事件
        //   on: {
        //     blur: () => {
        //       console.log('失去焦点')
        //     },
        //     input: () => {
        //       console.log('input事件')
        //     },
        //   },
        //   // 插槽
        //   scopedSlots: {
        //     prefix: () => {
        //       return '表单内头部内容'
        //     },
        //     suffix: () => {
        //       return '表单内尾部内容'
        //     },
        //     prepend: () => {
        //       return <div>表单前置插槽</div>
        //     },
        //     append: () => {
        //       return <div>表单后置插槽</div>
        //     },
        //   },
        //   // el-form-item配置项 可选
        //   config: {
        //     // vue ref属性 默认为field 利用此属性来查找某一组件
        //     ref: 'name',
        //     label: 'input：',
        //     // labelWidth: '120px',
        //   },
        // },
        // {
        //   // 表单项渲染类型 必需
        //   type: 'Autocomplete',
        //   // 表单是否隐藏 默认为false（控制的是el-form-item）
        //   hidden: false,
        //   // 表单项的配置项
        //   attrs: {
        //     type: 'text',
        //     // 表单项绑定的值（字段名） 必需
        //     field: 'name',
        //     // 初始值
        //     value: '',
        //   },
        //   // 表单项事件
        //   on: {
        //     blur: () => {
        //       console.log('失去焦点')
        //     },
        //     input: () => {
        //       console.log('input事件')
        //     },
        //   },
        //   // el-form-item配置项 可选
        //   config: {
        //     // vue ref属性 默认为field 利用此属性来查找某一组件
        //     ref: 'name',
        //     label: 'autocomplete：',
        //     labelWidth: '120px',
        //   },
        // },
        // {
        //   // 表单项渲染类型 必需
        //   type: 'Select',
        //   // 表单是否隐藏 默认为false（控制的是el-form-item）
        //   hidden: false,
        //   // 表单项的配置项
        //   attrs: {
        //     // 表单项绑定的值（字段名） 必需
        //     field: 'city',
        //     // 初始值
        //     value: 'Guangzhou',
        //     clearable: true,

        //     groupOptions: [
        //       {
        //         // 分组名称
        //         label: '中国城市',
        //         options: [
        //           {
        //             // value做key
        //             value: 'Chengdu',
        //             label: '成都',
        //             slot: o => {
        //               const { attr } = o
        //               console.log()
        //               return <span style="float: left">{attr.label}</span>
        //             },
        //           },
        //           {
        //             value: 'Shenzhen',
        //             label: '深圳',
        //             slot: () => {},
        //           },
        //           {
        //             value: 'Guangzhou',
        //             label: '广州',
        //             slot: () => {},
        //           },
        //           {
        //             value: 'Dalian',
        //             label: '大连',
        //             slot: () => {},
        //           },
        //         ],
        //       },
        //     ],
        //     // select options
        //     options: [
        //       {
        //         value: 'Chengdu1',
        //         label: '成都',
        //       },
        //       {
        //         value: 'Shenzhen1',
        //         label: '深圳',
        //       },
        //       {
        //         value: 'Guangzhou1',
        //         label: '广州',
        //       },
        //       {
        //         value: 'Dalian1',
        //         label: '大连',
        //       },
        //     ],
        //   },
        //   // 表单项事件
        //   on: {
        //     blur: () => {
        //       console.log('失去焦点')
        //     },
        //     input: () => {
        //       console.log('input事件')
        //     },
        //   },
        //   // 插槽
        //   scopedSlots: {
        //     prefix: () => {
        //       return '表单内头部内容'
        //     },
        //     empty: () => {
        //       return '空'
        //     },
        //   },
        //   // el-form-item配置项 可选
        //   config: {
        //     // vue ref属性 默认为field 利用此属性来查找某一组件
        //     ref: 'age',
        //     label: 'select：',
        //     // labelWidth: '120px',
        //   },
        // },
        {
          // 表单项渲染类型 必需
          type: 'Radio',
          // 表单是否隐藏 默认为false（控制的是el-form-item）
          hidden: false,
          // 表单项的配置项
          attrs: {
            // 表单项绑定的值（字段名） 必需
            field: 'fav',
            // 初始值
            value: 1,
            size: 'mini',
            border: true,
            // 具有渲染优先性
            // type: 'button',
            // radio group
            // groupOptions渲染优先，该配置项只要存在且不为false,那么就优先渲染组radio
            groupOptions: [
              // 即可整体设置属性，也可单项设置属性(此时整体设置优先)
              {
                label: '备选项1',
                value: 1,
                size: 'medium',
                border: true,
                type: 'button'
              },
              {
                label: '备选项2',
                value: 2,
                size: 'small',
                border: true,
              },
              { label: '备选项3', value: 3, border: true },
            ],
            // radio options
            options: [
              // 即可整体设置属性，也可单项设置属性(此时单项设置优先)
              { label: '备选项1', value: 1, size: 'medium', border: true },
              { label: '备选项2', value: 2, size: 'small', border: true },
              { label: '备选项3', value: 3 },
            ],
          },
          // 表单项事件
          on: {
            change: () => {
              console.log('change值发生变化')
            },
            input: () => {
              console.log('input值发生变化')
            },
          },
          // el-form-item配置项 可选
          config: {
            // vue ref属性 默认为field 利用此属性来查找某一组件
            ref: 'age',
            label: 'radio：',
            // labelWidth: '120px',
          },
        },
      ],
    }
  },
  created() {
    // const timer = setTimeout(() => {
    //   // this.options[0].attrs.value = '值变化'
    //   // console.log('model: ', this.options)
    //   // clearTimeout(timer)
    // }, 3000)
  },
  methods: {},
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: calc(100% - 48px);
  padding: 24px;
}
</style>
