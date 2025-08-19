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
                    <a-button type="primary" size="small" @click="size_add.play">
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
                        <!-- <span v-if="item.image !== undefined">
                            <a-image :src="item.image.url" style="width: 110px;height: 80px;" />
                        </span>
                         -->
                        <template #actions>
                            <EyeOutlined @click="size_detail.play(item)"/>
                            <edit-outlined @click="size_update.play(item)"/>
                            <DeleteOutlined @click="size_delete.play()"/>
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

<!-- 新建尺码模板 -->
<a-drawer
    v-model:open="size_add.open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="新建"
    placement="right"
  >
    <p>clothing(服装)、undies(内衣)、shoes(鞋靴类)、children_clothing(童装),戒指，手镯</p>
    <p>模板名称: 请输入模板名称</p>
    <p>模板子类型: clothing(服装)、undies(内衣)、shoes(鞋靴类)、children_clothing(童装)</p>

</a-drawer>


<!-- 详情尺码模板 -->
<a-drawer
    v-model:open="size_detail.open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="详情"
    placement="right"
  >
    <p>尺码模板详情</p>
</a-drawer>
<!-- 尺码模板更新 -->
<a-drawer
    v-model:open="size_update.open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="编辑"
    placement="right"
  >
    <p>尺码模板更新</p>
</a-drawer>

<!--尺码模板删除-->
<a-modal v-model:open="size_delete.open" title="确认删除" :confirm-loading="size_delete.confirmLoading" @ok="size_delete.handleOk">
    <p>是否确认删除？删除后数据将无法恢复。</p>
</a-modal>


</template>
<script>
import { defineComponent,ref,reactive,onMounted,h,nextTick,onUnmounted } from 'vue';
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
            innerHeight:ref(window.innerHeight-150),
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

            // 初始化数据
            const first_Data = {
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

        // 加载更多数据
        const onLoadMore = () => {

            loading.value = true;

            count.value = count.value + 1;

            const get_more_data = {
                "page":count.value,
                "page_size":12, 
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

        // 新建尺码详情
        const size_add = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                size_add.open = true
            },
            add:()=>{
                var url ="https://fxg.jinritemai.com/ffa/g/size-chart/manage"
                window.open(url)
            }
        })

        // 查看详情
        const size_detail = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                size_detail.open = true
            }
        })


        // 更新
        const size_update = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                size_update.open = true
            }
        })

        // 删除
        const size_delete = reactive({
            open:ref(false),
            data:ref(undefined),
            confirmLoading:ref(false),
            play:()=>{
                size_delete.open = true
            },
            handleOk:()=>{
                size_delete.confirmLoading = true
            }
        })



        return{
          PAGEDATA,
          size_add,
          size_detail,
            size_update,
            size_delete,
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
.content_list{overflow-x: hidden;overflow-y: scroll;}
</style>
