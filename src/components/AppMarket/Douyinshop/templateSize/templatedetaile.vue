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
        <a-table 
            :columns="columns" 
            :data-source="data" 
            :pagination="false" 
            bordered>

            <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
            </template>
            </template>
            <template #title>{{ table_name }}</template>
        </a-table>
        
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
        const table_name = ref('')

        const columns = ref([
            {
                title: '尺码',
                dataIndex: 'size'
            }
        ])

        const data = ref([])

        // console.log(props.data.data.component_template_info_list)
        
        if(props.data.data !== undefined){

            const t_obj = props.data.data.component_template_info_list[0]
            const component_data = JSON.parse(t_obj.component_data) // 模板数据

            const component_front_data = JSON.parse(t_obj.component_front_data)
            const configTable = component_front_data.configTable

            var t_name = t_obj.template_name
            table_name.value = t_name

            var title = component_data.title // 标题
            var sub_title = component_data.sub_title
            var sizeconfig = component_data.config


            // 表头数据
            var selected_specs = component_data.selected_specs
            for(let i of selected_specs){
                let o = {}
                o.title = i
                o.dataIndex =i
                columns.value.push(o)
            }

            Object.entries(sizeconfig).forEach((entry, index) => {
                const [key, value] = entry;
                let c = {}
                c.size = key
                for(let y in value){c[y] = value[y]}
                data.value.push(c)
            });

        }
        

        return{
            props,
            table_name,
            columns,
            data

        }
    }
    })
</script>

<style scoped>

</style>