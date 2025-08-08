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
        // 尺码表格
        
        const columns = ref([])
        const data = ref([])


        console.log(props.data.data.component_template_info_list)
        
        if(props.data.data !== undefined){

            const t_obj = props.data.data.component_template_info_list[0]
            const component_data = JSON.parse(t_obj.component_data)

            const component_front_data = JSON.parse(t_obj.component_front_data)
            const configTable = component_front_data.configTable

            var t_name = t_obj.template_name
            console.log('模板名称',t_name)

            console.log(component_data)
            var title = component_data.title
            console.log(title)

            var sub_title = component_data.sub_title
            console.log(sub_title)


            for(let i of configTable){
                console.log(i)
            }


        }
        

        return{
            props
        }
    }
    })
</script>

<style scoped>

</style>