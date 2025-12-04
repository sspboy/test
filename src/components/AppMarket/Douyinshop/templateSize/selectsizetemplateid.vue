<!--选择 尺码模板 组件-->
<template>
   <a-drawer 
      title="尺码模板" 
      :size="size" 
      :open="props.data.sizetemplate_open" 
      @close="onClose"
   >
      <template #extra>
         <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
         <a-button type="primary" @click="onClose">Submit</a-button>
      </template>
      <p>选择尺码模板</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
  </a-drawer>
</template>
<script>

import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
export default defineComponent({
   name:'selectsizetemplateid',
   components:{},
   props: {
      data:{typr:Object}
   },
   setup(props,ctx) {

      const size = 'default';

      // 获取当前店铺尺码模板
      // 单选模板id回传
      // 确认
      // 取消

      const onClose = () =>{

         props.data.sizetemplate_open = !props.data.sizetemplate_open;

      }
      return{
         props,
         onClose,
         size
      }
   }
})
</script>
<style scoped>
</style>