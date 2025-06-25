<template>
<div class="backall">
    <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :wrapper-col="{ span: 24 }"
        :rules="rules"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="loginbox"
    >
        <div class="logo"><img src="../assets/logo.png" height="106" width="100"/></div>

        <a-divider style="color: darkgray;font-size: 12px;">Hi~欢迎回来！</a-divider>

        <!--用户名称-->
        <a-form-item
            class="font_size_12"
            name="username"
            tooltip="y"
          >
          <a-input v-model:value="formState.username" type="username" @change="set_username_state" placeholder="输入用户名" class="font_size_12">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>


        <!--密码-->
        <a-form-item
          name="password"
          class="font_size_12"
        >
          <a-input-password v-model:value="formState.password" type="password" @change="set_username_state" placeholder="输入密码" class="site-form-item-icon font_size_12">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input-password>
        </a-form-item>


        <!--记住我-->
        <a-form-item name="remember" :wrapper-col="{span: 24}" style="padding-left: 2px;" >
          <a-checkbox v-model:checked="formState.remember" style="font-size: 12px;">记住我</a-checkbox>
          <!--<div class="font_size_12">{{ u_tips }}</div>-->
        </a-form-item>


        <!--提交按钮-->
        <a-form-item :wrapper-col="{ span: 24 }" class="font_size_12">
          <a-button type="primary" html-type="submit" style="width: 100%;" class="font_size_12">登录</a-button>
        </a-form-item>

    </a-form>
</div>

<div class="g-bg"></div>
<css-doodle>

    :doodle {
      @grid: 1x20 /100vw 100vh;
    }
    @place-cell: center;
    width: @rand(40vmin, 80vmin);
    height: @rand(40vmin, 80vmin);
    transform: translate(@rand(-200%, 200%), @rand(-60%, 60%)) scale(@rand(.8, 1.8)) skew(@rand(45deg));
    clip-path: polygon(
      @r(0, 30%) @r(0, 50%), 
      @r(30%, 60%) @r(0%, 30%), 
      @r(60%, 100%) @r(0%, 50%), 
      @r(60%, 100%) @r(50%, 100%), 
      @r(30%, 60%) @r(60%, 100%),
      @r(0, 30%) @r(60%, 100%)
    );
    background: @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d, #ebbf4d, #00bcd4, #03a9f4, #2196f3, #009688, #5ee463, #f8e645, #ffc107, #ff5722, #43f8bf);
    opacity: @rand(.3, .8);
    position: relative;
    top: @rand(-80%, 80%);
    left: @rand(-80%, 80%);
    animation: colorChange @rand(6.1s, 16.1s) infinite @rand(-.5s, -2.5s) linear alternate;
    @keyframes colorChange {
      100% {
        left: 0;
        top: 0;
        filter: hue-rotate(360deg);
      }
    }
</css-doodle>

</template>


<script>
import axios from 'axios';
import * as utils from '@/assets/JS_Model/public_model';

import { useRouter } from "vue-router"; // 导入路由
import { reactive,ref} from 'vue';
import { UserOutlined,LockOutlined,} from '@ant-design/icons-vue';
import {useStore} from "vuex";

export default {
  // 组件
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    
    const API = new utils.A_Patch()           // 请求接口s
    const store = useStore();// 共享数据
    const router = useRouter(); // 初始化路由方法
    const formRef = ref();     // 初始化表单

    // 在组件中====刷新数据状态
    // const loadData = async(user_id) => {
      // await store.dispatch('get_user', user_id);
      // console.log('Data fetched:', store.state.head.user_message);
    // }
    
    
    // 绑定数据：：需要与模版使用数据同名
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
      user_state: false,      // 登录状态
      password_state: false   // 密码状态
    });


    // 更新用户名登录状态
    const set_username_state = ()=>{
      formState.user_state = false
      formState.password_state = false

    }


    // 定义验证用户名称方法
    const checkUsername = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('请输入用户名');

      }else{

        if (formState.user_state === 'None') {

          return Promise.reject('用户名不存在');

        }

        return Promise.resolve();
      }

    };

    // 定义验证密码方法
    const validatePassword = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('请输入密码');

      } else {

        if (formState.password_state === 'None') {

          // formRef.value.validateFields('password');
          return Promise.reject('账号或密码错误');

        }
        return Promise.resolve();
      }
    };

    // 验证规则
    const rules = {
      username: [{required: true, validator: checkUsername, trigger: 'change'}],
      password: [{required: true, validator: validatePassword, trigger: 'change'}],
    };

    // 验证成功 提交
    const onFinish = values => {

      // console.log('Success:', values);

      // 请求Login接口：：：
      axios.post(API.LoginAPI.url.login, {
        username: values.username,    // 参数 firstName
        password: values.password,    // 参数 lastName
        remember: values.remember     // 参数是否记住我30天

      }).then((response)=> {

        // 反馈请求结果
        const res = response.data
        
        // console.log(API.LoginAPI.url.login)
        // console.log(response)

        if(res === 'None'){        // 用户名不存在：None

          formState.user_state = "None"

          formRef.value.validateFields('username');

        }else if(res === 'true'){        // 登录成功：ture

          router.push('/introduction');

        }else if(res === 'false'){        // 登录失败：：密码错误：：false

          formState.password_state = "None"

          formRef.value.validateFields('password');

        }

      }).catch(function (error) {

        console.log(error);

      });

    };

    // 验证失败 提交
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };


    // 加载方法到模板
    return{
      router,
      rules,
      set_username_state,
      checkUsername,
      validatePassword,
      onFinishFailed,
      formRef,
      formState,
      onFinish,
    }

  }
};

</script>

<style scoped>
.backall{position: fixed;z-index: 10000;width: 100%;}
.logo{width: 100px;height: 100px;background-color: aliceblue; margin:25px auto;border-radius:6px;text-align:center;}
.loginbox{
  width: 300px;
  margin: 10% auto;
  border: 1px rgba(255, 255, 255, 0.5) solid;
  padding: 18px;
  border-radius: 46px;
  background: #fff;
  backdrop-filter: blur(10px);/*模糊*/
  background-color: rgba(255, 255, 255, 0.048); /* 背景色半透明 */
  box-shadow:
            1px 0px 2px 1px rgba(230, 230, 230, 0.5), /* 第一个阴影 */
            -2px -1px 4px 1px rgba(219, 219, 219, 0.3), /* 第二个阴影 */
            0px 5px 10px 0px rgba(123, 152, 172, 0.3); /* 第三个阴影 */}

.g-bg {
    position: fixed;
    width: 100%;
    height: 100vh;
    backdrop-filter: blur(200px);/*模糊*/
    z-index: 100;
}

</style>