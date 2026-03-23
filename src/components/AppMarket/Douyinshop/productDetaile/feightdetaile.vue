<!-- 运费详情 组件-->
<template>
    <div>
        <a-drawer
            title="运费详情"
            v-model:open="props.data.FreightDate"
            root-class-name="root-class-name"
            :root-style="{ color: 'blue' }"
            size="large"
            style="color: #666"
            width="50%"
            placement="right"
        >
            <div>
                <p>运费：{{ props.data.freight_id }}</p>

            </div>
        </a-drawer>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
// 网络请求工具引用
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
export default defineComponent({

    name: "feightdetaile",  // 运费详情组件
    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },
    
    setup(props, ctx) {
        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集

        console.log(props.data)
        
        // 运费模板查询
        const load_get_freight=(f_id)=>{
            if(f_id !== undefined && f_id !== null){
                tool.Http_.post(API.AppSrtoreAPI.freight.detaile, {
                    freight_id:f_id
                }).then((res)=>{
                    feight_detaile.data = res.data.data
                })
            }
        }
    
        return{
            props,
            visible:ref(false),
        }
    }
    })
</script>

