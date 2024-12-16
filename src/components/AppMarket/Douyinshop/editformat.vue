<template>
    <div>
      <!-- <a-button type="primary" @click="showModal">Open Modal with async logic</a-button> -->
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >
        <p>{{ props.data.data }}</p>
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,ref } from 'vue';

export default defineComponent({

    name: "Edit_format",  // 功能添加
    // 引用组件
    components: {



    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        console.log(props.data)

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