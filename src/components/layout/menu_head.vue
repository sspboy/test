<template>
    <a-layout-header class="head">
      <div class="logo_text cursor">{{ PAGE.data.detaile?.brand_name }}</div>
      <div class="font_size_12 cursor" style="margin-left:20px;float: right; color: dimgray;">
        <LogoutOutlined style="margin: 0 3px;" />
        退出
      </div>
      <div class="font_size_12 cursor" style="float: right; color: dimgray;">
        <MehOutlined style="margin: 0 3px;" />
        {{ PAGE.data.detaile?.id }}
      </div>
    </a-layout-header>
</template>

<script>
import {defineComponent, computed, reactive} from 'vue';
import {LogoutOutlined, MehOutlined} from '@ant-design/icons-vue'
import { useStore } from 'vuex'

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
    const PAGE = reactive({
      data:{}
    })

    // 单个用户信息查询
    store.dispatch('get_user',{user_id:'xiaohaha'}).then(()=>{
      PAGE.data = store.state.user.message
    })

    // 列表查询
    // 添加
    // 删除
    store.dispatch('del_user',{user_id:'ndai@example.com'}).then(()=>{
      PAGE.data = store.state.user.message
    })



    // 更新



    // 计算属性
    const heda = computed(()=>{
      return props
    })

    return{
      heda,
      PAGE
    }
  }
})
</script>

<style scoped>
.logo_text{width: 60px; float: left; color: #ffffff;font-size: 18px;}
.head{textAlign:'center';color:#fff;height: 64px;paddingInline: 50px;lineHeight: '64px';backgroundColor: '#fff';width:100%;}

</style>