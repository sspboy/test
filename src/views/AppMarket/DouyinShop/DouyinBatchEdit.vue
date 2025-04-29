<template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

        <!--左侧 菜单组件  开始-->
        <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
            <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
        </a-layout-sider>
        <!--左侧 菜单组件  结束-->

        <a-layout-content class="content_border">
            <a-row>
                <a-col :span="24">

                    <a-steps
                        :current="1"
                        :items="[
                        {
                            title: 'Finished',
                            description,
                        },
                        {
                            title: 'In Progress',
                            description,
                            subTitle: 'Left 00:00:08',
                        },
                        {
                            title: 'Waiting',
                            description,
                        },
                        ]"
                    ></a-steps>

                </a-col>
            </a-row>
            <a-row>
                <a-col :span="8" class="content_border">col-8</a-col>
                <a-col :span="8" class="content_border">col-8</a-col>
                <a-col :span="8" class="content_border">col-8</a-col>
            </a-row>
            
        </a-layout-content>

    </a-layout>

</a-layout>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

// 组件引用=====开始
import menu_left from "@/components/layout/menu_left.vue";
import menu_head from "@/components/layout/menu_head.vue";

export default defineComponent({
  // 模版名称【角色管理】
  name: "BatchEdit",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    menu_left,
    menu_head,
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup() {
    // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    const PAGEDATA = reactive({
      title:'批量修改',
      menudata:{'key':'92','openKeys':'douyinshop'},            // 菜单选中配置
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })
    const description = 'This is a description.';
    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      description

    }
    }
})
</script>
<style scoped>
.content_border{
text-align: center;border: 1px silver solid;border-radius: 4px;
}
</style>