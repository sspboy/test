<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >
        <div style="text-align: center;">
          <a-form :model="formfata">
            <a-form-item name="title" :key="formfata.id" :rules="{required: true, trigger: 'change', message: '标题不能为空'}">
              <a-textarea v-model:value="formfata.title" placeholder="输入标题文字" show-count :maxlength="30" style="width: 100%;margin:0 0 0 0;font-size: 12px;padding-top: 8px;"/>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,reactive,ref,computed } from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

export default defineComponent({

    name: "Edit_title",  // 功能添加
    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

      const API = new utils.A_Patch()       // 请求接口地址合集
      const TO = new TABLE.TableOperate()   // 表格操作方法
      const confirmLoading = ref(false);


      const formfata = computed(()=>{

        return reactive({
          id:props.data.id,
          title:props.data.data
        });

      })

      const handleOk = () => {

          confirmLoading.value = true;

          setTimeout(() => {
            confirmLoading.value = false;
          }, 2000);
      
      };
    
    
    
    return {
        props,
        formfata,
        confirmLoading,
        handleOk,

        }
    }


})
  
  </script>