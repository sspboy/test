<!-- 商品编辑 组件 -->
<template>
    <a-modal
      v-model:open="props.data.EditDate"
      title="编辑商品"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
      <a-layout-content class="content">

            <div style="width: 950px;margin: 0 auto;">
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="基础信息">
                  主图+标题+分类+属性
                </a-tab-pane>

                <a-tab-pane key="2" tab="图片视频" force-render>
                  白底图+商品长图+主图3:4+视频
                </a-tab-pane>

                <a-tab-pane key="3" tab="商品规格">规格+图片+备注</a-tab-pane>
                <a-tab-pane key="4" tab="库存数量">库存+价格+商家编码+状态</a-tab-pane>
                <a-tab-pane key="5" tab="描述详情">描述图</a-tab-pane>
              </a-tabs>
              
              <p>编辑表单</p>
              


            </div>
      </a-layout-content>

      
    </a-modal>
</template>
<script>
import { defineComponent,ref, } from 'vue';
export default defineComponent({

    name: "edit",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        console.log(props.data.product_id)

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