<template>
    <a-layout-header class="head">
      <div class="logo_text cursor">{{ user_data.brand_name }}</div>
      <div class="font_size_12 cursor" style="margin-left:20px;float: right; color: dimgray;">
        <LogoutOutlined style="margin: 0 3px;" />
        退出
      </div>
      <div class="font_size_12 cursor" style="float: right; color: dimgray;">
        <MehOutlined style="margin: 0 3px;" />
        {{ user_data.id }}
      </div>
    </a-layout-header>
</template>

<script>
import {defineComponent,computed } from 'vue';
import { useStore } from 'vuex'

import {LogoutOutlined, MehOutlined} from '@ant-design/icons-vue'

export default defineComponent({

  name: "menu_head",

  components: {
    LogoutOutlined,
    MehOutlined,
  },

  // 接受父组件数据
  props:{
    headdata:{
      type:Object // 数据类型效验
    }
  },

  setup(props){

    const store = useStore();// 共享数据
    const user_data = computed(()=>{
      return store.state.member.message.user_data
    })


    return{
      user_data,
      props,
    }
  }
})
</script>

<style scoped>
.logo_text{width: 60px; float: left; color: #ffffff;font-size: 18px;}
.head{textAlign:'center';color:#fff;height: 64px;paddingInline: 50px;lineHeight: '64px';backgroundColor: '#fff';width:100%;}

</style>