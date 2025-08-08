<!-- 尺码模板详情查看 组件 -->
 <template>
    <a-drawer
        v-model:open="props.data.open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        size="large"
        style="color: #666"
        title="尺码模板详情"
        placement="right"
    >

    <div>尺码模板详情</div>
    {{ props.data.data }}

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
        console.log(props.data)

        return{
            props
        }
    }
    })
</script>

<style scoped>

</style>