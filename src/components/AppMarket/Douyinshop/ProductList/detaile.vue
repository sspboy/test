<template>
    <a-modal
      v-model:open="props.data.DetaileDate"
      title="商品详情"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
    
    <a-layout-content :style="contentStyle">

        <div style="height: 220px;background-color: aliceblue;">
            
            <a-row>
            
                <a-col :span="12">
                    <div style="height: 100px;width: 100px;float: left;background-color: aqua;">
                    </div>
                    <div style="height: 100px;width: 70%;float: left;background-color:#f5222d;">
                        <a-skeleton active/>

                    </div>
                        <!-- <a-skeleton-image style="float: left;"/>  
                        <a-skeleton active style="float: left;"/> -->
                </a-col>


            </a-row>
        </div>

        <div style="padding: 12px 0 0 0;">

            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="基础信息" force-render>基础信息</a-tab-pane>
                <a-tab-pane key="2" tab="图片视频">图片视频</a-tab-pane>
                <a-tab-pane key="3" tab="商品规格">规格</a-tab-pane>
                <a-tab-pane key="4" tab="类目属性">类目属性</a-tab-pane>
                <a-tab-pane key="5" tab="发布规则">发布规则</a-tab-pane>
                <a-tab-pane key="6" tab="商品诊断">商品诊断</a-tab-pane>
                <a-tab-pane key="7" tab="卡券">资质</a-tab-pane>
                <a-tab-pane key="9" tab="组合搭配">组合搭配</a-tab-pane>
                <a-tab-pane key="8" tab="资质">资质</a-tab-pane>

            </a-tabs>

        </div>

    </a-layout-content>
    




    </a-modal>
</template>
<script>
import { defineComponent,ref,reactive,onMounted } from 'vue';
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

        const activeKey = ref('1');
        // 页面占位符配置
        const contentStyle = reactive({
            padding: 24,
            background: '#fff',
        });

        // 获取商品id
        // 请求商品详情信息
        // 分组渲染页面
        // 头部信息
        // 基础信息
        // 主图视频
        // 商品规格
        // 类目属性
        // 发布规则
        // 商品诊断
        // 卡券
        // 组合搭配
        // 资质
        // 关闭清空页面信息

        const handleOk = e => {
            console.log(e);
        };


        return{
            activeKey,
            props,
            handleOk,
        }
    }
    
})
</script>