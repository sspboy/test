<template>
    
    <div class="head">
      
      <div class="logo_text cursor">

        <div style="float: left;">
          <img src="../../assets/logo_36x36.png"/>
        </div>

        <div style="margin: 8px 0 0 18px;float: left;">
          {{ user_data.brand_name }}
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
        {{ user_data.id }}
      </div>

      <div class="font_size_12 cursor right_tips">
        <div ref="myDiv"></div>
      </div>
          

    </div>
</template>

<script>
import {defineComponent,computed, reactive,ref,onBeforeMount} from 'vue';
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

    const badgeconfig = reactive({
      bad:ref(false), // 小红点是否显示
      mesPage:ref(false)
    })
    
    const tool = new TOOL.TOOL()            // 工具方法
    const myDiv = ref(null)
    const API = new utils.A_Patch()// 请求接口
  
    const router = useRouter(); // 初始化路由方法
    
    const store = useStore();// 共享数据
    
    store.dispatch('member/get')

    const user_data = computed(()=>{

      var page_data = ref({

        brand_name:'',  // 品牌名称、店铺名称
        id:'',          // 用户id
        shop_id:'',     // 店铺id
        mes_request_data:{
              "appId":"583", // 应用id
              "shopId":"4463798", // 店铺id
              "token":'CgYIASAHKAESXgpcq5wYeC1md7Ogx/VZWrPTxKp3HzD9PyDl2UGF9q8yRoeEaJ1NPYyLD5fPxUnHNUhN2b7AgnR+M5bT7ixnfk1hQACfBG76c9KGJSsVaRU4okBvz6FakV+rAXGwhNEaAA==',
              "componentId": 317, // 组件id
              "extra": {} // 多店铺配置
          }
      })

      var userDATA = store.state.member.message.user_data // 获取用户数据

      if(userDATA === 'NOT_Login_Power'){ // 未登录提示

        router.push('/pleaselogin')// 权限提示页面 点击去登录

        return {brand_name:'', id:''}

      }else if(JSON.stringify(userDATA) !== '{}'){ // 数据请求成功
        
        // 请求token接口验证
        
        var shopId = ''
        var token = ''

        // 多店铺

        console.log(userDATA)

        return userDATA
      
      }else{ // 数据未空

          return page_data
      }

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
    const get_mes = async () => {

      try {
          
          await tool.Fun_.loadScript('http://lf1-fe.ecombdstatic.com/obj/ecom-fe-open-public/component/index.js', {crossOrigin: 'anonymous' }).then(()=>{
              const ele = myDiv.value
              ecopen.start({
                  "appId":"583",
                  "shopId":"4463798",
                  "token":'CgYIASAHKAESXgpcq5wYeC1md7Ogx/VZWrPTxKp3HzD9PyDl2UGF9q8yRoeEaJ1NPYyLD5fPxUnHNUhN2b7AgnR+M5bT7ixnfk1hQACfBG76c9KGJSsVaRU4okBvz6FakV+rAXGwhNEaAA==',
                  "componentId": 317,
                  "extra": {}
              });

              ecopen.bixi(ele, {
                  "appId":"583",
                  "shopId":"4463798",
                  "token":'CgYIASAHKAESXgpcq5wYeC1md7Ogx/VZWrPTxKp3HzD9PyDl2UGF9q8yRoeEaJ1NPYyLD5fPxUnHNUhN2b7AgnR+M5bT7ixnfk1hQACfBG76c9KGJSsVaRU4okBvz6FakV+rAXGwhNEaAA==',
                  "componentId": 317,
                  "extra": {},

              })

          })

      } catch (e) {

          console.error(e)

      }

    }

    get_mes()

    return{
      myDiv,
      badgeconfig,
      user_data,
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