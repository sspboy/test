<!-- 尺码模板列表 组件 -->
<template>

    <a-drawer
        v-model:open="fen.open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        size="large"
        style="color: #666"
        title="质量分可优化建议"
        placement="right"
    >
        <div v-if="fen.field_problem_list !== undefined">

            <p style="margin: 0 0 30px 0 ;">质量{{ fen.value }}分： <a-rate :value="fen.value" disabled /></p>

            <div v-for="(item,index) in fen.field_problem_list" :key="index" style="font-size: 12px;border: 1px silver solid; border-radius: 6px;padding: 14px;margin:10px 0;">
                <p style="padding: 6px 0 0 0;font-weight: bold;font-size: 14px;">{{ item.field_name }} - {{ item.problem_name }}</p>
                <p style="line-height: 26px;">{{ item.suggestion }}</p>
            </div>

        </div>

    </a-drawer>
</template>

<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
// 网络请求工具引用
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default defineComponent({

    name: "detaile",  // 筛选条件查询组件

    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },
    
    setup(props, ctx) {
    
        return{
            fen:props.data
        }
    }
    })
</script>

<style scoped>

</style>