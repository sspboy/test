<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >
        <div style="text-align: center;padding:20px 0 ;">

        </div>
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,ref,reactive,computed } from 'vue';

export default defineComponent({

    name: "Edit_sku_list",  // 功能添加
    // 引用组件
    components: {



    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

      const get_video_data = (data)=>{
        return JSON.parse(data)
      }

      const videodata = computed(()=>{  
        return reactive({
          data:get_video_data(props.data.data)
        })
      })

      const confirmLoading = ref(false);

      const handleOk = () => {
          confirmLoading.value = true;
          setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
          }, 2000);
      };
    
    
    
    return {
        props,
        videodata,
        confirmLoading,
        handleOk,

        }
    }


})
  
  </script>