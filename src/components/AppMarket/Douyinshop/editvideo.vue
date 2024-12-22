<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <div style="width: 100%;clear: both;text-align: center;padding: 20px 0 20px 0;">
          <video autoplay width="320" height="320" :src="VideoData.obj.url" controls />
          <p>
            <a-input v-model:value="VideoData.obj.url" placeholder="输入视频地址"  style="width: 360px;margin:10px 0 0 0;font-size: 12px;"/>
          </p>

        </div>
      </a-modal>
    </div>
</template>
  <script>
  import {defineComponent, ref, reactive, computed} from 'vue';

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

      const get_vide=(data)=>{
        console.log(JSON.parse(data))
        return JSON.parse(data)
      }

      const VideoData = computed(()=> {

        return reactive({

          obj: get_vide(props.data.data)

        })

      })

        const confirmLoading = ref(false);
        const showModal = () => {
            open.value = true;
        };
        const handleOk = () => {
            confirmLoading.value = true;
            setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
            }, 2000);
        };
    
    
    
    return {
        props,
        VideoData,
        confirmLoading,
        showModal,
        handleOk,

        }
    }


})
  
  </script>