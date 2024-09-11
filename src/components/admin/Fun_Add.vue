<template>

</template>

<script>
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  // 功能添加
  name: "Fun_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props, ctx) {

    const PAGEDATA = reactive({})


    return {
      PAGEDATA,
    }
  }


})
</script>

<style>

</style>