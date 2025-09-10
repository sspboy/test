<!-- 尺码模板 -->
 <template>
<templateAdd v-if="PAGEDATA.add_open" :data="PAGEDATA" v-on:add_callback="load_page"/>
<templateEdit v-if="PAGEDATA.edit_open" :data="PAGEDATA" v-on:edit_callback="load_page"/>

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
                    <a-button type="primary" size="small" @click="PAGEDATA.ADDtemplate">
                        <PlusOutlined />
                        新建尺码模板
                    </a-button>
                </a-col>
                <a-col offset="12" :span="8">
                    <a-space-compact block size="small">
                        <a-input 
                        size="small" 
                        placeholder="请输入模板ID" 
                        v-model:value="PAGEDATA.seach_id"
                        allowClear
                        />
                        <a-button type="primary" size="small" style="font-size: 12px;" @click="seacher_template">查询</a-button>
                    </a-space-compact>
                </a-col>
            </a-row>
        </div>

        <div :style="{height:PAGEDATA.innerHeight + 'px'}" class="content_list">

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
                        
                        ID: {{ item.template_id }}

                        模板类型：{{ PAGEDATA.chuan_type_name(item.template_sub_type) }}

                        <!-- <span v-if="item.image !== undefined">
                            <a-image :src="item.image.url" width="80" />
                        </span> -->
                        <template #actions>
                            <EyeOutlined @click="size_detail.play(item)"/>
                            <edit-outlined @click="PAGEDATA.edit_template(item)"/>
                            <DeleteOutlined @click="size_delete.play(item.template_id)"/>
                        </template>
                    </a-card>
                </template>

                <template #loadMore>
                    <div style="height: 50px;padding: 20px 0 0 0;width: 100%;text-align: center;">

                        <a-button @click="onLoadMore" size="small" style="font-size: 12px;margin: 0 auto;" :loading="loading">加载更多</a-button>
                    </div>
                </template>

            </a-list>

        </div>
      
    </a-layout-content>
    </a-layout>
</a-layout>


<!-- 详情尺码模板 -->
<a-drawer
    v-model:open="size_detail.open"
    class="custom-class"
    root-class-name="root-class-name"
    title="详情"
    placement="right"
  >
    <p>模板名称：{{ size_detail.data.template_name }}</p>
    <p>模板子类型：{{ PAGEDATA.chuan_type_name(size_detail.data.template_sub_type) }}</p>
    <a-image :src="size_detail.data.image.url" width="80" />

</a-drawer>

<!--尺码模板删除-->
<a-modal v-model:open="size_delete.open" title="确认删除" :confirm-loading="size_delete.confirmLoading" @ok="size_delete.handleOk">
    <p>是否确认删除？删除后数据将无法恢复。</p>
</a-modal>


</template>
<script>
import { defineComponent,ref,reactive,onMounted,h,nextTick,onUnmounted,defineAsyncComponent } from 'vue';
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
        templateAdd: defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/templateAdd.vue')),
        templateEdit:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/templateEdit.vue')),
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
            innerHeight:ref(window.innerHeight-150),

            add_open:ref(false),// 添加模板弹窗状态
            ADDtemplate:() =>{// 弹出新建模板
                PAGEDATA.add_open = true;
            },

            edit_open:ref(false),
            template_info:ref(undefined),
            edit_template:(item)=>{
                PAGEDATA.edit_open = true;
                PAGEDATA.template_info = item;
            },

            // 模板类型转移
            chuan_type_name:(type_str)=>{
                if(type_str == 'clothing'){
                    return '服装'
                }else if(type_str == 'undies'){
                    return '内衣'
                }else if(type_str == 'shoes'){
                    return '鞋靴'
                }else if(type_str == 'children_clothing'){
                    return '童装'       
                }else if(type_str == 'rings'){
                    return '戒指'
                }else if(type_str == 'bracelets'){
                    return '手镯'
                }
            },

            // 搜索id
            seach_id:ref(undefined)

        })

        const tool = new TOOL.TOOL()            // 工具方法

        const API = new utils.A_Patch()         // 请求接口地址合集

        const store = useStore();// 共享数据
        
        const initLoading = ref(true); // 初始化加载状态

        const count = ref(0); // 分页

        const total_num = ref(0); // 数据总条数

        const data = ref([]); // 初始化数据对象

        const list = ref([]);

        const loading = ref(false);

        onMounted(() => {

            window.addEventListener('resize', handleResize);// 窗口变换时候

            load_page() // 初始化列表数据
            
            console.log(count.value)

        })

        // 组件挂之后---请求数据===============================开始
        // 定义一个函数来处理窗口大小变化 ==
        const handleResize = () => {
            PAGEDATA.innerHeight = window.innerHeight - 150; // 作为表格自适应高度
        };

        // 在组件卸载时移除事件监听器
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });
        // 【组件挂载】========================================结束

        // 初始化列表数据
        const load_page = ()=>{

            const first_Data = {
                "template_type":"size_info",
                "page_num": count.value,
                "page_size":12,
            }

            tool.Http_.post(API.AppSrtoreAPI.size.list, first_Data).then(res=>{

                var datarespone = res.data.data;// 数据对象
                var total_num = datarespone.total_num; // 数据总条数
                var component_template_info_list = datarespone.component_template_info_list; // 列表数据

                initLoading.value = false;
              
                data.value = component_template_info_list;

                list.value = component_template_info_list;

          })
        }

        // 加载更多数据
        const onLoadMore = () => {

            loading.value = true;

            count.value = count.value + 1;

            const get_more_data = {
                "template_type":"size_info",
                "page_num":count.value,
                "page_size":12, 
            }

            tool.Http_.post(API.AppSrtoreAPI.size.list, get_more_data).then(res=>{

                console.log(get_more_data)

                Object.keys(res.data.data.component_template_info_list).forEach(k => console.log(res.data.data.component_template_info_list[k].template_id))
                
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

        // 用id查询模板列表：通过id查询
        const seacher_template=()=>{

            initLoading.value = true;

            console.log(PAGEDATA.seach_id)

            const seach_Data = {
                "template_type":"size_info",
                "template_id":PAGEDATA.seach_id,
                "page_num": 0,
                "page_size":12,
            }

            tool.Http_.post(API.AppSrtoreAPI.size.list, seach_Data).then(res=>{

                var datarespone = res.data.data;// 数据对象

                console.log(datarespone)

                var component_template_info_list = datarespone.component_template_info_list; // 列表数据

                initLoading.value = false;

                list.value = component_template_info_list;

            })

        }


        // 查看详情
        const size_detail = reactive({
            open:ref(false),
            data:ref(undefined),
            play:(item)=>{
                size_detail.open = true
                size_detail.data = item
            }
        })

        // 删除
        const size_delete = reactive({
            open:ref(false),
            data:ref(undefined),
            confirmLoading:ref(false),
            template_id:ref(undefined),
            play:(t_id)=>{
                size_delete.open = true
                size_delete.template_id = t_id
            },
            handleOk:()=>{
                size_delete.confirmLoading = true
                console.log(size_delete.template_id)
                console.log('请求接口')
                setTimeout(() => {
                    size_delete.confirmLoading = false;
                    size_delete.open = false;

                }, 2000);

            }
        })



        return{
          PAGEDATA,
          size_detail,
            size_delete,
          store,
          innerHeight,
          initLoading,
          loading,
          list,
          onLoadMore,
          load_page,
          seacher_template

        }
    }

}

</script>

<style scoped>
.content_list{overflow-x: hidden;overflow-y: scroll;}
</style>
