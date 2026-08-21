<template>
<!--内容部分 菜单 右侧列表 开始-->
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


        <a-layout-sider style="height: 100%;padding: 6px 4px 0 0;">
          <p>图片操作区域</p>
          <a-button type="">选择本地图片</a-button>
          <a-button type="">选择素材库图片</a-button>
        </a-layout-sider>


        <a-layout-content class="content_border" >

          <h1>素材上传</h1>

          <div>
            <a-steps :current="current" :items="items" />
    
            <!-- 步骤内容区：带淡入淡出动画 -->
            <div class="steps-content">
              <transition name="fade" mode="out-in">
                <component 
                  :is="stepComponents[current]" 
                  :key="current"
                  @next="next"
                  @prev="prev"
                  @submit="handleSubmit"
                />
              </transition>
            </div>

            <div class="steps-action">
              <a-space>
              <a-button 
                v-if="current > 0" 
                style="margin-left: 8px" 
                @click="prev"
              >
                上一步
              </a-button>

              <a-button 
                v-if="current < steps.length - 1" 
                type="primary" 
                @click="next"
              >
                下一步
              </a-button>
              <a-button
                v-if="current === steps.length - 1"
                type="primary"
                @click="message.success('Processing complete!')"
              >
                Done
              </a-button>
              </a-space>
            </div>
          </div>


          

        </a-layout-content>

      </a-layout>
  </a-layout>

</template>

<script>
import { computed,ref,reactive,onMounted,h,onUnmounted,defineAsyncComponent } from 'vue';
import { useStore } from 'vuex'
// 网络请求工具引用
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";

// ========== 步骤组件：在 setup 外直接定义好 ==========
const Step1BaseInfo    = defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/pic_title_cate.vue'));
const Step2Attr        = defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/edit_component/format_cp.vue'));
const Step3Spec        = defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/spec_component.vue'));
const Step4Delivery    = defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/preselltype_component.vue'));
const Step5Desc        = defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/des.vue'));
const Step6Quality     = defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/quality_list_component.vue'));

export default {
  name: 'Size_optimization',
  components: {
    menu_left,
    menu_head,
    nav_pagination,
  },
  props: {
    data: { type: Object },
  },
  setup(props, ctx) {

    const store = useStore();// 共享数据
    const tool = new TOOL.TOOL()// 工具方法
    const API = new utils.A_Patch()// 请求接口地址合集
    // 组件挂之后---请求数据===============================开始

    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
    };

    const PAGEDATA = reactive({
        title:'素材上传',
        innerHeight: ref(window.innerHeight - 180), // 初始化列表高度
        menudata:{       // 菜单选中配置
            'key':'123',
            'openKeys':'cloudstorage',
            },
        loading:true,         // 列表load状态
        justify:'center',     // 列表内容对齐：loading加载居中设定
        align:'center',       // 列表内容对齐：loading加载居中设定
        // 列表信息
        datalist:[],
        total_number:0,     // 内容总数
        List_conditions:ref({
            page:1
        })
    })


    const current = ref(0);

    const steps = [
      { title: '基础信息',  content: 'First-content' },
      { title: '商品属性', content: 'Second-content' },
      { title: '规格信息',   content: 'Last-content' },
      { title: '库存发货',   content: 'Last-content' },
      { title: '描述详情',   content: 'Last-content' },
      { title: '资质规则',   content: 'Last-content' },
    ];

    // 组件容器
    const stepComponents = [
      Step1BaseInfo,
      Step2Attr,
      Step3Spec,
      Step4Delivery,
      Step5Desc,
      Step6Quality,
    ];

    // 用 computed 更语义化
    const items = computed(() => 
      steps.map(item => ({ key: item.title, title: item.title }))
    );

    const next = () => {
      if (current.value < steps.length - 1) current.value++;
    };

    const prev = () => {
      if (current.value > 0) current.value--;
    };





    return {
      PAGEDATA,
      store,
      current,steps,items,next,prev,stepComponents
    };
  }
}
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}

/* 切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border-color: #404040;
}
</style>