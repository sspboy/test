<template>
    <a-drawer :width="200" title="更多查询" placement="top" :open="props.data.MoreSelectData" @close="onClose" >
        <template #extra>
            <a-button style="margin-right: 8px ;font-size:12px;" size="small" @click="onClose" >取消</a-button>
            <a-button type="primary" size="small" style="font-size: 12px;" @click="onClose">查询</a-button>
        </template>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>
</template>
<script>
import { defineComponent,ref, } from 'vue';
export default defineComponent({

    name: "more_select",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        console.log(props.data.MoreSelectData)

        const handleOk = e => {
            console.log(e);
        };

        const onClose = () => {
            props.data.MoreSelectData = false;
        };

        return{
            props,
            handleOk,
            onClose
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