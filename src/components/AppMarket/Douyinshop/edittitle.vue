<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="cancel">
          <a-form :model="formfata" ref="formRef" :rules="rules">
            <a-form-item name="title" :key="formfata.id"  class="font_size_12">
              <a-textarea v-model:value="formfata.title" 
              placeholder="输入标题文字" 
              show-count 
              :maxlength="30" 
              style="width: 100%;font-size: 12px;
              padding-top: 8px;"
              autocomplete="off"
              />
            </a-form-item>
          </a-form>
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
      const formRef = ref('');
      const formfata = computed(()=>{

        return reactive({
          id:props.data.id,
          title:props.data.data
        });

      })


      const validate_title = async (_rule, value) => {

      
        if (value === '') {

          return Promise.reject('不能为空');

        } else {

          if (value.length > 30) {

            return Promise.reject('不能超过30个汉字');

          }

        return Promise.resolve();

        }
      }

      // 表单验证方法：：：
      const rules = {

        title:[{
          required: true,
          type:'string',
          trigger: ['change', 'blur'],
          validator: validate_title,// 绑定验证方法
        }],
      }


      // 提交方法
      const handleOk = () => {

        formRef.value.validate().then(() => {

          console.log('验证通过')

          confirmLoading.value = true;

          TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

          const up_date = {

            id:props.data.id,

            setting_data:{
              "title": formfata.value.title,
            }

          }

          TO.actions.update(up_date,(res)=>{
            // console.log('更新标题' + res)
            setTimeout(() => {
              confirmLoading.value = false;
              props.data.open = false;  // 收起model
              ctx.emit('edit_title_callback')   // 回调刷新表格
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
        confirmLoading,
        handleOk,
        cancel,
        rules

        }
    }


})
  
  </script>