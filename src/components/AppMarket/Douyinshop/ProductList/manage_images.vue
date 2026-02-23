<!-- 商品列表 图片管理 组件 -->
<template>

<a-drawer
    v-model:open="props.data.ImageDate"
    class="custom-class"
    root-class-name="root-class-name"  
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="图片预览"
    placement="right"
    @after-open-change="console.log('图片预览')"
  >
      <a-layout-content class="content">

            <div style="width: 950px;margin: 0 auto;">
              <a-tabs v-model:activeKey="activeKey">

                <a-tab-pane key="1" tab="主图">
                  主图
                </a-tab-pane>

                <a-tab-pane key="2" tab="3:4主图" force-render>
                  3:4主图
                </a-tab-pane>

                <a-tab-pane key="3" tab="3:4长图">
                    3:4长图
                </a-tab-pane>

                <a-tab-pane key="4" tab="规格图">
                    规格图
                </a-tab-pane>

                <a-tab-pane key="5" tab="白底图">
                    白底图
                </a-tab-pane>

                <a-tab-pane key="6" tab="描述详情图">
                    描述详情图
                </a-tab-pane>

              </a-tabs>
              
              <p>图片管理</p>
              


            </div>
      </a-layout-content>
      </a-drawer>
      </template>
<script>
import { defineComponent,ref, } from 'vue';
export default defineComponent({

    name: "manage_images",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        console.log(props.data)

        const handleOk = e => {
            console.log(e);
        };

        const activeKey = ref('1');

        return{
            props,
            handleOk,
            activeKey,
        }
    }
})
</script>
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>