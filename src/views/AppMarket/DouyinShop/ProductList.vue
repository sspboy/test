<template>
<div>商品列表</div>
</template>

<script>
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  // 模版名称
  name: "ProductList",
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