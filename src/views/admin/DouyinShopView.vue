<template>
<div>店铺信息</div>
</template>

<script>
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  // 模版名称：抖音店铺信息
  name: "DouyinShopView",
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