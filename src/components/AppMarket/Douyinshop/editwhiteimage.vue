<template>
    <div>
      <!-- <a-button type="primary" @click="showModal">Open Modal with async logic</a-button> -->
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <div style="padding: 10px 0;">
        <img :src="props.data.data" width="50" height="50" style="border-radius: 4px;"/>
        <a-textarea v-model:value="props.data.data" placeholder="输入图片地址"  style="width: 360px;margin:0 0 0 10px;font-size: 12px;"/>
        </div>
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,ref } from 'vue';

export default defineComponent({

    name: "Edit_white_image",  // 功能添加
    // 引用组件
    components: {



    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        // console.log(props.data)

        const modalText = ref('编辑标题');
        const open = ref(false);
        const confirmLoading = ref(false);
        const showModal = () => {
            open.value = true;
        };
        const handleOk = () => {
            modalText.value = 'The modal will be closed after two seconds';
            confirmLoading.value = true;
            setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
            }, 2000);
        };
    
    
    
    return {
        props,
        modalText,
        open,
        confirmLoading,
        showModal,
        handleOk,

        }
    }


})
  
  </script>