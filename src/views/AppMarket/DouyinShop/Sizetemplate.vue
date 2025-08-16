<!-- 尺码模板 -->
 <template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--右侧内容部分 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/><!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <!--右侧 内容组件  开始-->
      <a-layout-content class="content_border">

        <div style="height: 40px;">
            <a-row>

                <a-col :span="4">
                    <a-button type="primary" size="small">
                        <PlusOutlined />
                        新建尺码模板
                    </a-button>
                </a-col>
                <a-col offset="12" :span="8">
                    <a-space-compact block size="small">
                        <a-input size="small" placeholder="请输入模板名称" />
                        <a-button type="primary" size="small" style="font-size: 12px;">查询</a-button>
                    </a-space-compact>
                </a-col>
            </a-row>
        </div>
        
        <a-list
            :grid="{ gutter: 0, column: 4 }"
            size="default"
            :loading="initLoading"
            :data-source="list"
            :split="false"
        >

            <template #renderItem="{ item }">
                <a-card size="small" style="margin:0px 10px 10px 0;font-size: 12px;">

                    <template #title>
                        <span class="font_size_12">{{ item.template_name }}</span>
                    </template>
                    <span v-if="item.image !== undefined">
                        <a-image :src="item.image.url" style="width: 110px;height: 100%;" />
                    </span>
                    
                    <template #actions>
                        <EyeOutlined />
                        <edit-outlined />
                        <DeleteOutlined />
                    </template>
                </a-card>
            </template>

            <template #loadMore>
                <a-button @click="onLoadMore" size="small" style="font-size: 12px;" :loading="loading">加载更多</a-button>
            </template>

        </a-list>
                        

      </a-layout-content>

    </a-layout>
</a-layout>



</template>
<script>
import { defineComponent,ref,reactive,onMounted,h,nextTick } from 'vue';
import { useStore } from 'vuex'
import { PlusOutlined,EditOutlined,EllipsisOutlined,DeleteOutlined,EyeOutlined } from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default {

    name:"SizeTemplate",

    components:{
        EyeOutlined,
        PlusOutlined,
        DeleteOutlined,
        EditOutlined,
        EllipsisOutlined,
        menu_left,
        menu_head,
    },
    setup(props) {

        const PAGEDATA = reactive({

            title:'尺码模板',

            menudata:{      // 菜单选中配置
                'key':'93', // 当前菜单key
                'openKeys':'douyinshop' // 一级菜单
            },

            datalist:[],          // 列表信息
            total_number:0,       // 内容总数

        })

        const tool = new TOOL.TOOL()            // 工具方法

        const API = new utils.A_Patch()         // 请求接口地址合集

        const store = useStore();// 共享数据

        const innerHeight = ref(window.innerHeight-100);// 初始化表格高度
        
        const initLoading = ref(true); // 初始化加载状态

        const count = ref(0); // 分页

        const total_num = ref(0); // 数据总条数

        const data = ref([]); // 初始化数据对象

        const list = ref([
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            },
            {
                'id':1,
                'template_name':'尺码模板名称',
                'image_url':'https://img1.baidu.com/it/u=3422522222,2222222222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 图片地址
                'shareable':false, // 是否能共享
                'create_time':'2023-08-01 10:00:00',
                'update_time':'2023-08-01 10:00:00',
            }
    
    ]);

        const loading = ref(false);

        const drawer = ref(false);

        onMounted(() => {

            // 初始化数据
            const first_Data = {
                "page_num":count.value,
                "page_size":10,
            }

            tool.Http_.post(API.AppSrtoreAPI.size.list, first_Data).then(res=>{

                var datarespone = res.data.data;// 数据对象
                var total_num = datarespone.total_num; // 数据总条数
                var component_template_info_list = datarespone.component_template_info_list; // 列表数据
                for(let i = 0; i < component_template_info_list.length; i++){
                    console.log('尺码列表数据',component_template_info_list[i])
                }


              
                initLoading.value = false;
              
              data.value = component_template_info_list;

              list.value = component_template_info_list;

          })

        })


        // 加载更多数据
        const onLoadMore = () => {

            loading.value = true;

            list.value = data.value.concat(
                [...new Array(1)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            );

            count.value = count.value + 1;

            const get_more_data = {
                "page":count.value,
                "page_size":10, 
            }

            tool.Http_.post(API.AppSrtoreAPI.size.list, get_more_data).then(res=>{
                
                // console.log(res)

                if(res.data.data == "None"){ // 请求数据为空

                    list.value = data.value;

                    loading.value = false;

                    return tool.Fun_.message('info','没有更多数据了') // 提示信息
                
                }else{ // 请求数据不为空

                    const newData = data.value.concat(res.data.data.component_template_info_list);

                    data.value = newData;

                    list.value = newData;

                    nextTick(() => {
                        window.dispatchEvent(new Event('resize'));
                    });
                    
                    loading.value = false;

                }
                

            })


        };

        // 新建

        // 更新

        // 删除



        return{
          PAGEDATA,
          store,
          innerHeight,
          initLoading,
          loading,
          list,
          onLoadMore

        }
    }

}

</script>

<style scoped>

</style>
