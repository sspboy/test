<template>

    <a-layout-header :style="headerStyle">
      <div class="logo" style="width: 60px; float: left; color: dimgray;">{{ brand_name }}</div>
      <span class="font_size_12" style="{span:2;margin-left:20px;float: right; color: dimgray;}">退出</span>
      <span class="font_size_12" style="{span:2;float: right; color: dimgray;}">用户名称</span>
    </a-layout-header>
</template>

<script>
import {defineComponent, inject} from 'vue';
export default defineComponent({
  name: "menu_head",

  // 接受父组件数据
  props:{
    // 接受总页面信息
    message:{
      type:Object // 数据类型效验
    }

  },

  setup(){

    // 接收数据
    const head_msg = inject('head_msg');
    console.log(head_msg)
    const brand_name = head_msg.head;


    const headerStyle = {
      textAlign: 'center',
      color: '#fff',
      height: 64,
      paddingInline: 50,
      lineHeight: '64px',
      backgroundColor: '#fff',
      width:'100%',
    };


    return{
      brand_name,
      headerStyle
    }
  }
})
</script>

<style>

</style>