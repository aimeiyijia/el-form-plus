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
        {
          // 表单项渲染类型 必需
          type: 'Input',
          // 表单是否隐藏 默认为false（控制的是el-form-item）
          hidden: false,
          // 表单项的配置项
          attrs: {
            type: 'text',
            // 表单项绑定的值（字段名） 必需
            field: 'name',
            // 初始值
            value: '',
          },
          // 表单项事件
          on: {
            blur: () => {
              console.log('失去焦点')
            },
            input: () => {
              console.log('input事件')
            },
          },
          // 插槽
          scopedSlots: {
            prefix: () => {
              return '表单内头部内容'
            },
            suffix: () => {
              return '表单内尾部内容'
            },
            prepend: () => {
              return <div>表单前置插槽</div>
            },
            append: () => {
              return <div>表单后置插槽</div>
            },
          },
          // el-form-item配置项 可选
          config: {
            // vue ref属性 默认为field 利用此属性来查找某一组件
            ref: 'name',
            label: 'input：',
            // labelWidth: '120px',
          },
        },
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

        //     // select options
        //     options: [
        //       {
        //         value: 'Chengdu',
        //         label: '成都',
        //       },
        //       {
        //         value: 'Shenzhen',
        //         label: '深圳',
        //       },
        //       {
        //         value: 'Guangzhou',
        //         label: '广州',
        //       },
        //       {
        //         value: 'Dalian',
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
        //   // el-form-item配置项 可选
        //   config: {
        //     // vue ref属性 默认为field 利用此属性来查找某一组件
        //     ref: 'age',
        //     label: 'select：',
        //     // labelWidth: '120px',
        //   },
        // },
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
