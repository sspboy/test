<template>
    <a-modal
      v-model:open="props.data.EditDate"
      title="编辑商品"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
      <p>各种编辑表单</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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