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
    width="50%"
    @after-open-change="console.log('图片预览')"
  >
      <a-layout-content class="content">

        <a-divider orientation="left" orientation-margin="0px">主图</a-divider>

            <div style="margin: 0 auto;">
              
              <p>图片列表</p>
              
            </div>

        <a-divider orientation="left" orientation-margin="0px">白底图</a-divider>

        <a-divider orientation="left" orientation-margin="0px">规格图</a-divider>

        <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>


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

        console.log(props.data.product_id);

        const handleOk = e => {
            console.log(e);
        };


        return{
            props,
            handleOk,
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