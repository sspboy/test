<template>
    <div>
      <a-modal v-model:open="props.data.open" width="750px" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <div>
            运费模板
        </div>

      </a-modal>
    </div>




</template>
  <script>
import { defineComponent, onBeforeUnmount, ref, shallowRef, computed, reactive } from 'vue'


export default defineComponent({

    name: "Edit_freight_id",  // 运费模板

    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        console.log(props.data.data)
            
        const confirmLoading = ref(false);

        const handleOk = () => {
            confirmLoading.value = true;
            setTimeout(() => {
            confirmLoading.value = false;
            }, 2000);
        };

    
    return {
        props,
        confirmLoading,
        handleOk,

        }
    }


})
  
  </script>