<template>
    <a-layout-header class="head">
      
      <div class="logo_text cursor">
        <div style="float: left;">
          <img src="../../assets/logo_36x36.png"/>
        </div>

        <div style="margin: 2px 0 0 18px;float: left;">
          {{ user_data.brand_name }}
        </div>

        <div style="float: left; margin: 4px 0 0 10px;" class="font_size_12">
          ~您的满意是我们最大的追求！
        </div>
      
      </div>

        <div type="link" class="font_size_12 cursor" style="float: right; color: dimgray;margin: 6px 10px 0 0;"  @click="Login_out">
          <LogoutOutlined style="margin: 0 3px;" />
          退出
        </div>


      <div class="font_size_12 cursor" style="float: right; color: dimgray; margin: 6px 10px 0 0;">
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
    user_data:{
      type:Object // 数据类型效验
    }
  },

  setup(props){
    

    const API = new utils.A_Patch()// 请求接口
  
    const router = useRouter(); // 初始化路由方法
    
    const store = useStore();// 共享数据
    
    store.dispatch('member/get')

    const user_data = computed(()=>{

      if(store.state.member.message.user_data === 'NOT_Login_Power'){

        router.push('/pleaselogin')// 权限提示页面 点击去登录

        return {
          brand_name:'',
          id:''
        }

      }else{
      
        return store.state.member.message.user_data
      
      }
    
    })

    

    // 退出登录方法
    const Login_out = () => {

      axios.get(API.LoginAPI.url.loginout).then((res)=>{

        console.log(res)
        
        if(res.data === "login out True"){

          router.push('/')  // 前端路由
          
        }
      
      })
      
      // console.log('点击退出方法：注销后、进入login页面')

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
.logo_text{width: 34%; float: left; color: #ffffff;font-size: 18px;}
.head{text-align:'center';color:#fff;height: 64px;padding: 0px 10px 0 26px;line-height: '64px';background-color: '#fff';width:100%;}

</style>