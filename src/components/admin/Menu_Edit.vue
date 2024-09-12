<template>
  <!-- 选择菜单 -->
  <a-drawer v-model:open="childrenDrawer" title="选择菜单" width="320" :closable="false">
    <a-button type="primary" @click="showChildrenDrawer">确认</a-button>
  </a-drawer>
  <!-- 选择菜单 -->


</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  // 模版名称
  name: "Menu_Edit",
  // 引用组件
  components: {},
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props) {

    const PAGEDATA = reactive({})
    const childrenDrawer = ref(false);
    // 弹出--选择菜单抽屉弹出
    const showChildrenDrawer = () => {
      childrenDrawer.value = true;
    };


    return {
      PAGEDATA,
      childrenDrawer,
      showChildrenDrawer,
    }
  }


})
</script>

<style>

</style>