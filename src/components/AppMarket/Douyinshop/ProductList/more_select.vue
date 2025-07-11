<template>
    <a-drawer :width="200" title="更多查询" placement="top" :open="props.data.MoreSelectData" @close="onClose" >
        <template #extra>
            <a-button style="margin-right: 8px ;font-size:12px;" size="small" @click="onClose" >取消</a-button>
            <a-button type="primary" size="small" style="font-size: 12px;" @click="onClose">查询</a-button>
        </template>
        <a-layout-content style="padding: 0 100px;background-color: aqua;">
            <a-row>
                <a-col :span="6">
                    <a-textarea 
                    v-model:value="SelectData.product_id_list" 
                    placeholder="多个商品ID查询 支持100个 逗号隔开" 
                    size="small" 
                    />
                </a-col>
                <a-col :span="6">
                    <a-textarea 
                        v-model:value="SelectData.sku_code" 
                        placeholder="多个商品编码查询 支持50个 逗号隔开" 
                        size="small" 
                    />
                </a-col>
                <a-col :span="6"><a-input /></a-col>
                <a-col :span="6">
                    <p>创建时间</p>
                    <p>更新时间</p>
                    <p>只看需要核销&只看被驳回</p>
                </a-col>
            </a-row>


        </a-layout-content>
    </a-drawer>
</template>
<script>
import { defineComponent,ref,reactive } from 'vue';

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

        const SelectData = reactive({
            product_id_list:ref(undefined),
            sku_code:ref(undefined),
            sort_id:ref(undefined)
        })

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
            onClose,
            SelectData
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