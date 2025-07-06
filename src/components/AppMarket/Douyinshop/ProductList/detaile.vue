<template>
    <a-modal
      v-model:open="props.data.DetaileDate"
      title="商品详情"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
      <p>查看商品详情页面的信息</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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