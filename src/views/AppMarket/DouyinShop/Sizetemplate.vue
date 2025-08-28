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
                            <a-image :src="item.image.url" width="80" />
                        </span> -->
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
    title="新建"
    placement="right"
    width="800"
  >
    <div>

        <p>模板名称: 请输入模板名称</p>
        <p>尺码标题: 请输入模板名称</p>
        <p>标题注释: 请输入模板名称</p>

        <a-radio-group 
            v-model:value="size_add.add_value" 
            size="middle"
            @change="size_add.change"
        >
            <a-radio-button value="clothing" class="font_size_12">服装</a-radio-button>
            <a-radio-button value="undies" class="font_size_12">内衣</a-radio-button>
            <a-radio-button value="shoes" class="font_size_12">鞋靴类</a-radio-button>
            <a-radio-button value="children_clothing" class="font_size_12">童装</a-radio-button>
            <a-radio-button value="rings" class="font_size_12">戒指</a-radio-button>
            <a-radio-button value="bracelets" class="font_size_12">手镯</a-radio-button>
        </a-radio-group>
    </div>
    <div style="height: 34px;margin: 20px 0 0 0;">
        <a-checkbox-group 
            v-model:value="size_add.op_value" 
            name="checkboxgroup" 
            :options="size_add[size_add.op_name]" 
        />
    </div>
    <p>
        <a-table :columns="size_add.columns" :data-source="size_add.data" :pagination="false" size="small" bordered>
            <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
            </template>
            </template>
        </a-table>
    </p>
    <div>
        <a-space>
            <a-button type="primary" size="small">保存</a-button>
            <a-button size="small">取消</a-button>
        </a-space>
    </div>

</a-drawer>


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

                console.log(component_template_info_list)

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
            // 新建模板类型选择
            add_value:ref('clothing'),
            // 模板选项
            template_type:{
                'clothing':'服装',
                'undies':'内衣',
                'shoes':'鞋靴类',
                'children_clothing':'童装',
            },

            op_value:ref([]),// 选中的尺码值

            op_name:ref('clothing'),

            clothing:['身高(cm)', '体重(cm)', '胸围(cm)', '肩宽(cm)', '腰围(cm)', '臀围(cm)', '袖长(cm)'],

            undies:['下胸围(cm)', '胸围差(cm)', '杯罩'],

            shoes:['脚长(cm)', '脚宽(cm)', '靴筒高(cm)', '靴筒围(cm)', '鞋跟高(cm)'],

            children_clothing:['身高(cm)', '体重(斤)', '胸围(cm)'],

            rings:['戒指内周长(mm)', '戒指内直径(mm)'],

            bracelets:['手掌最宽长度(mm)', '手掌最宽周长(mm)'],

            columns:ref([{
                title: 'Name',
                dataIndex: 'name',
                }, {
                title: 'Cash Assets',
                className: 'column-money',
                dataIndex: 'money',
                }, {
                title: 'Address',
                dataIndex: 'address',
            }]),
            data:ref([{
                key: '1',
                name: 'John Brown',
                money: '￥300,000.00',
                address: 'New York No. 1 Lake Park',
                }, {
                key: '2',
                name: 'Jim Green',
                money: '￥1,256,000.00',
                address: 'London No. 1 Lake Park',
                }, {
                key: '3',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            }]),

            play:()=>{
                size_add.open = true
            },
            add:()=>{
                var url ="https://fxg.jinritemai.com/ffa/g/size-chart/manage"
                window.open(url)
            },
            change:()=>{
                size_add.op_name = size_add.add_value
                console.log(size_add.add_value)
            }
        })

        // 查看详情
        const size_detail = reactive({
            open:ref(false),
            data:ref(undefined),
            play:(item)=>{
                size_detail.open = true
                size_detail.data = item
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
