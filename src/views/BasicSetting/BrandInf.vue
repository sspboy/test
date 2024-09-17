<template>

</template>

<script>
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  // 模版名称【品牌资料】
  name: "BrandInf",
  // 引用组件
  components: {},
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props) {

    const PAGEDATA = reactive({})


    return {
      PAGEDATA,
    }
  }


})
</script>

<style>

</style>