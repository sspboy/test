<template>
    
    <div class="head">
      
      <div class="logo_text cursor">

        <div style="float: left;">
          <img src="../../assets/logo_36x36.png"/>
        </div>

        <div style="margin: 8px 0 0 18px;float: left;">
          {{ store.state.member.message.user_data.brand_name }}
        </div>

        <div style="float: left; margin: 14px 0 0 10px;" class="font_size_12">
          ~您的满意是我们最大的追求！
        </div>
      
      </div>



      <div class="font_size_12 cursor right_tips" @click="Login_out">
        <LogoutOutlined style="margin: 0 3px;" />
        退出
      </div>

      <div class="font_size_12 cursor right_tips">
        <MehOutlined style="margin: 0 3px;" />
        {{ store.state.member.message.user_data.id }}
      </div>

      <div class="font_size_12 cursor right_tips">

        <div ref="myDiv" id="mytest"></div>

      </div>
          

    </div>
</template>

<script>
import {defineComponent,computed, reactive,ref,onBeforeMount,onMounted} from 'vue';

import { useStore } from 'vuex'
import {LogoutOutlined, MehOutlined,BellOutlined} from '@ant-design/icons-vue'
import axios from 'axios';
import { useRouter } from "vue-router"; // 导入路由
// 组件引用

// 方法引用
import * as utils from '@/assets/JS_Model/public_model';
import * as TOOL from '@/assets/JS_Model/tool';


export default defineComponent({

  name: "menu_head",

  components: {
    BellOutlined,
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

    
    const tool = new TOOL.TOOL()   // 工具方法
    const API = new utils.A_Patch()// 请求接口
    const router = useRouter();     // 初始化路由方法
    const store = useStore();       // 共享数据

    const myDiv = ref(null)         // 消息通知容器
    
    onBeforeMount(async () => {

      // 共享会员数据刷新
      await store.dispatch('member/get').then(()=>{
        
        if(store.state.member.message.user_data === 'NOT_Login_Power'){// 未登录提示
              router.push('/pleaselogin')// 权限提示页面 点击去登录
        }

        var s = store.state.member.message.shop.id;//店铺id

        tool.mc_token.resh_mc_token(s).then((res)=>{
            var token_obj = JSON.parse(localStorage.getItem('MCtoken'));//前端插件token对象
            var t = token_obj[s].token // 前端插件token
            // 多店铺
            Load_MessagePlus(s,t) // 加载消息组件
        })
      })
    })
    

    // 退出登录方法
    const Login_out = () => {

      axios.get(API.LoginAPI.url.loginout).then((res)=>{

        // console.log(res)
        
        if(res.data === "login out True"){

          router.push('/')  // 前端路由
          
        }
      
      })
      
      // console.log('点击退出方法：注销后、进入login页面')

    }

    // 封装================显示消息插件方法
    const Load_MessagePlus = async (shop_id, token) => {

      try {
          
          await tool.Fun_.loadScript(API.AppSrtoreAPI.shoptool.MessagePlus_SDK, {crossOrigin: 'anonymous' }).then(()=>{

            ecopen.start({
                "appId":"583",
                "shopId":shop_id,
                "token":token,
                "componentId": 317,
                "extra": {}
            });

            ecopen.bixi(myDiv.value, {
                "appId":"583",
                "shopId":shop_id,
                "token":token,
                "componentId": 317,
                "extra": {},
            })

          })
      } catch (e) {
          console.error(e)
      }
    }

    return{
      myDiv,
      store,
      props,
      Login_out
    }
  }
})
</script>

<style scoped>
.logo_text{width: 34%; float: left; color: #ffffff;font-size: 18px;}
.head{text-align:'center';color:#fff;height: 64px;padding: 20px 10px 0 26px;line-height: '64px';background-color: '#fff';width:100%;}
.op_component_base_container{height:30px !important}
.right_tips{float: right; color: dimgray;margin: 16px 20px 0 0;}
</style>