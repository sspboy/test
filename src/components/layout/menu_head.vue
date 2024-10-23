<template>
    <a-layout-header class="head">
      <div class="logo_text cursor">{{ user_data.brand_name }}</div>
      <div class="font_size_12 cursor" style="margin-left:20px;float: right; color: dimgray;" @click="Login_out">
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
import * as utils from '@/assets/JS_Model/public_model';
import axios from 'axios';
import { useRouter } from "vue-router"; // 导入路由

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
    const API = new utils.A_Patch()// 请求接口
    const router = useRouter(); // 初始化路由方法

    const store = useStore();// 共享数据
    const user_data = computed(()=>{
      return store.state.member.message.user_data
    })

    // 退出登录方法
    const Login_out = () => {

      axios.get(API.LoginAPI.url.loginout).then((res)=>{
        console.log(res)
        if(res.data === "login out True"){
          router.push('/')  // 前端路由
        }
      })

      
      console.log('点击退出方法：注销后、进入login页面')

    }

    return{
      user_data,
      props,
      Login_out
    }
  }
})
</script>

<style scoped>
.logo_text{width: 60px; float: left; color: #ffffff;font-size: 18px;}
.head{textAlign:'center';color:#fff;height: 64px;paddingInline: 50px;lineHeight: '64px';backgroundColor: '#fff';width:100%;}

</style>