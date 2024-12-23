<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >
        <div style="text-align: center;padding:20px 0 ;">
          <video width="320" height="320" :src="videodata.data.url" type="video/mp4" controls />
          <a-textarea rows={2} v-model:value="videodata.data.url" placeholder="输入视频地址"  style="width: 360px;margin:10px 0 0 0;font-size: 12px;"/>        
        </div>
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,ref,reactive,computed } from 'vue';

export default defineComponent({

    name: "Edit_video",  // 功能添加
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