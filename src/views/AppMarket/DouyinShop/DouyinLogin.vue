<template>
  <a-row>
    <a-col :span="12" :offset="6" style="text-align:center;margin-top: 20%;">
        
        <div class="example">
            
            <div style="width: 100px;height: 106px;">
                <a-spin style="margin-top: 45px;" v-if="loading" />
                <img src="../../../assets/logo.png" height="102" width="94" v-if="post"/>

            </div>
            <p style="margin-top: 10px;;">{{load_text}}</p>
            <div v-if="post" class="logo">
            <p class="font_size_12">将在 {{s_time.seconds}} 秒后进入</p>
            </div>
        </div>

        


    </a-col>
  </a-row>


    <div v-if="error" class="error">{{ error }}</div>

</template>

<script>
import {ref, reactive, watch} from 'vue';

import { useRoute } from 'vue-router'
import axios from "axios";
import * as utils from '@/assets/JS_Model/public_model';

export default {

    name:'douyinlogin',
    // 组件加载
    components: {

    },
    setup() {
        const API = new utils.A_Patch()           // 请求接口

        const route =   useRoute()
        const loading = ref(true)
        const post =    ref(false)
        const error =   ref(undefined)
        const code =    route.query.code;
        const load_text = ref('..loading..')
        const s_time = reactive({
            seconds:3,
            intervalId:null
        })

        console.log(code);

        // 侦听路由的参数，以便再次获取数据
        watch(() => route.query.code, fetchData, { immediate: true })

        // 获取链接参数
        function fetchData(id) {

            try {
            

                var url = API.LoginAPI.url.login+'?code='+ code

                axios.get(url).then((res)=>{

                    // console.log(res)

                    if(res.data === true){

                        loading.value = false

                        load_text.value = '授权成功'

                        post.value = true

                        startCountdown()// 倒计时读秒 进入首页

                    }else{

                        // 授权失败
                        // 刷新页面重新授权
                        // 联系客服
                    
                    }


                }).then(()=>{


                })




            } catch (err) {
            
                error.value = err.toString()
            
            } finally {
            
                loading.value = true
            
            }

        }


        // 发送到后台
        // 返回授权成功:: 跳转到首页
        // 返回授权失败:: 
        const startCountdown = ()=> {

            if (s_time.intervalId !== null) {
                clearInterval(this.intervalId); // 如果已经有一个定时器在运行，先清除
            }
            s_time.seconds = 3; // 重置倒计时时间
            s_time.intervalId = setInterval(() => { // 设置定时器
                if (s_time.seconds > 0) {
                    s_time.seconds--; // 倒计时减1
                } else {
                    clearInterval(s_time.intervalId); // 倒计时结束，清除定时器
                    s_time.intervalId = null;
                    console.log('欢迎来到！！！')
                }
            }, 1000);
        }

        // 发送code请求
        



        return{
            loading,
            error,
            post,
            load_text,
            s_time
        }
    }

}


</script>

<style>
.loading{width: 400px;height: 200px; margin: auto 10px;}
.example {width: 100px;height:100px; margin: 0 auto 0 auto;padding-top: 30px;border-radius: 5px;}
.logo {width: 100px;height:100px; margin: 0 auto 0 auto;border-radius: 5px;}

</style>
<!-- // get请求获取code

// 将codepost发送给login接口

// 返回授权结果 true：授权成功 跳转到指定页面

// 返回授权结果 false： 授权失败 跳转到指定提示页面 去开通；

code = request.args.get('code')               # 获取链接地址参数

token_res_msg = AccessToken().Toolapp(code)   # 获取token后，写入数据库，写入session

session['data'] = token_res_msg.get('data')   # 获取token后，写入数据库，写入session

shop_id = token_res_msg.get('data').get('shop_id')    # shop_id

material_object_id = Douyin_login_auth().select_material_folder()   # 新建默认素材文件夹

Douyin_login_auth().Douyin_default_material_id_add(material_object_id, shop_id) # 添加默认文件夹ID到数据库

session.permanent = True                                    # 配置session有效时间

return redirect(url_for('douyincopy.itemdetaile'))            # 跳转至批量修改页面 -->