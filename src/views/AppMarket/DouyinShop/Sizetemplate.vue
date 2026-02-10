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
                <a-col :span="4" >
                    <!--导航收起按钮-->
                  <a-button type="primary" size="small" style="font-size: 12px;margin-right: 16px;" @click="() => {store.commit('menu/change')}">
                    <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                    <menu-fold-outlined v-else class="trigger" />
                  </a-button>
                    <a-button type="primary" size="small" @click="PAGEDATA.ADDtemplate">
                        <PlusOutlined />
                        新建尺码
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
                :grid="{ gutter: 0, column: 5 }"
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
                        <template #cover>
                            <span v-if="item.image.url !== undefined && item.image.url !== ''">
                                <a-image :src="item.image.url" width="80" height="100px"/>
                            </span>
                            <span v-else-if="item.image.url == ''">
                                <a-image
                                :width="100"
                                :height="100"
                                src="https://www.antdv.com/#error"
                                fallback="data:image/png;base64,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"
                            />
                            </span>
                        </template>
                        <template #actions>
                            <EyeOutlined @click="size_detail.play(item)"/>
                            <edit-outlined @click="PAGEDATA.edit_template(item)"/>
                            <DeleteOutlined @click="size_delete.play(item.template_id)"/>
                        </template>
                    </a-card>
                </template>

            </a-list>

        </div>
                
        
        <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>

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
import { MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined,EditOutlined,EllipsisOutlined,DeleteOutlined,EyeOutlined } from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import nav_pagination from "@/components/nav_pagination.vue";

export default {

    name:"SizeTemplate",

    components:{
        MenuFoldOutlined, 
        MenuUnfoldOutlined,
        EyeOutlined,
        PlusOutlined,
        DeleteOutlined,
        EditOutlined,
        EllipsisOutlined,
        menu_left,
        menu_head,
        templateAdd: defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/templateAdd.vue')),
        templateEdit:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/templateEdit.vue')),
        nav_pagination
    },

    setup(props) {

        const PAGEDATA = reactive({

            title:'尺码模板',

            menudata:{      // 菜单选中配置
                'key':'93', // 当前菜单key
                'openKeys':'douyinshop' // 一级菜单
            },

            datalist:[],          // 列表信息
            innerHeight:ref(window.innerHeight-180),

            add_open:ref(false),// 添加模板弹窗状态
            ADDtemplate:() =>{// 弹出新建模板
                PAGEDATA.add_open = true;
            },

            edit_open:ref(false), // 编辑模板弹窗状态
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
            seach_id:ref(undefined),
            // 默认条件
            total_number:0,// 内容总数
            List_conditions:reactive({
                "template_type":"size_info",
                "page_num": 0,
                "page_size":10,
             })

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

        // 翻页查询条件配置:每次翻页只需替换 page size即可
        const navData = ref({
                "template_type":"size_info",
                "page_num": 0,
                "page_size":10,
        })

        onMounted(() => {

            window.addEventListener('resize', handleResize);// 窗口变换时候

            load_page(navData.value) // 初始化列表数据
            
        })

        // 组件挂之后---请求数据===============================开始
        // 定义一个函数来处理窗口大小变化 ==
        const handleResize = () => {
            PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
        };

        // 在组件卸载时移除事件监听器
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });
        // 【组件挂载】========================================结束

        // 初始化列表数据
        const load_page = (data)=>{

            tool.Http_.post(API.AppSrtoreAPI.size.list, data).then(res=>{

                var datarespone = res.data.data;// 数据对象

                PAGEDATA.total_number = datarespone.total_num;// 数据总条数

                var component_template_info_list = datarespone.component_template_info_list; // 列表数据
                console.log(component_template_info_list)

                initLoading.value = false;
              
                data.value = component_template_info_list;

                list.value = component_template_info_list;

          })
        }

        // 【翻页-组件 回调方法】========================================开始
        const page_turning = (data)=>{

            PAGEDATA.justify = 'flex-start';
            
            PAGEDATA.align = 'flex-start';

            navData.value.page_num = data.page;
            
            navData.value.page_size = data.page_size;
            
            initLoading.value = true;

            load_page(navData.value)

        }
        // 【查询组件 回调方法】========================================结束


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
          load_page,
          seacher_template,
          page_turning

        }
    }

}

</script>

<style scoped>
.content_list{overflow-x: hidden;overflow-y: scroll;}
</style>
