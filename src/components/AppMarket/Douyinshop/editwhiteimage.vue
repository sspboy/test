<template>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="cancel">
        <div class="img_width">

          <a-form :model="formfata" ref="formRef" :rules="rules" style="float: left;margin-top: 4px;">
            
            <a-form-item name="url" :key="formfata.id">
              <div v-if="formfata.url != '' && formfata.url != '0'" style="width: 50px;height: 50px;float: left;">
                <a-image :src="formfata.url" :width="50" :height="50" style="border-radius: 4px;"/>
              </div>
            
              <div v-else-if="formfata.url === '' || formfata.url === '0'" style="width: 50px;height: 50px;float: left;text-align: center;margin-top: 6px;">
                <a-skeleton-avatar :active="false" size="large" shape="avatarShape"/>
              </div>


              <a-textarea v-model:value="formfata.url" placeholder="输入图片地址"  style="width: 400px;margin:4px 0 0 10px;font-size: 12px;"/>

            </a-form-item>
          
          </a-form>

        </div>

      </a-modal>
</template>
<script>
import { message } from 'ant-design-vue';
import { defineComponent,ref,computed,reactive } from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
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
      const API = new utils.A_Patch()       // 请求接口地址合集
      const TO = new TABLE.TableOperate()   // 表格操作方法
      const formRef = ref('');
      const formfata = computed(()=>{
        if(props.data.data === '0'){
          var img_url = '';
        }else{
          var img_url = props.data.data;
        }
        return reactive({
          id:props.data.id,
          url:img_url
        });

      })

      const rules = {
        url:[{
          required: true,
          message:"不能为空",
          type:'string',
          trigger: ['change', 'blur'],

        }]
      }

      const confirmLoading = ref(false);

      const handleOk = () => {

        // 验证表单结果是否正确
        formRef.value.validate().then(() => {

          console.log('验证通过')

          confirmLoading.value = true;

          TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

          const up_date = {

            id:props.data.id,

            setting_data:{
              "white_image": formfata.value.url,
            }

          }

          TO.actions.update(up_date,(res)=>{
            // console.log('更新百底图' + res)
            setTimeout(() => {
              confirmLoading.value = false;
              props.data.open = false;  // 收起model
              ctx.emit('edit_white_image_callback')   // 回调刷新表格
              formRef.value.resetFields(); // 重置表单
            }, 2000);

          })

        }).catch(error => {// 表单验证错误

          console.log('error', error);

        });
      
      };

      const cancel=()=>{

        formRef.value.resetFields(); // 重置表单
      }
    

    return {
        props,
        formRef,
        formfata,
        rules,
        confirmLoading,
        handleOk,
        cancel,

        }
    }


})
  
  </script>
  <style>
.img_width{width: 100%;clear: both; padding: 10px 0 10px 0 ;margin: 0 0 10px 0;height: 70px;}
</style>