<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="cancel">
        <a-form :model="formfata" ref="formRef" :rules="rules">
          <a-form-item style="margin-top: 20px;" name="mobile" :key="formfata.id"  class="font_size_12">
            <a-input type="tel" v-model:value="formfata.mobile" placeholder="输入手机号码" show-count :maxlength="11" style="width: 100%;font-size: 12px;padding-top: 8px;"/>
        </a-form-item>
      </a-form>
      </a-modal>
    </div>




</template>
  <script>
import { defineComponent, onBeforeUnmount, ref, shallowRef, computed, reactive } from 'vue'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
import { message } from 'ant-design-vue';

export default defineComponent({

    name: "Edit_mobile",  // 客服电话

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
          mobile:props.data.data
        });

      })
      // 表单验证方法：：：
      const rules = {

        mobile:[{
          required: true,
          message:"不能为空",
          type:'string',
          trigger: ['change', 'blur'],
        }],
      }

      const handleOk = () => {

        formRef.value.validate().then(() => {}).then(()=>{

          confirmLoading.value = true;

          TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

          const up_date = {

            id:props.data.id,

            setting_data:{

              "mobile":formfata.value.mobile

            }
          }

          TO.actions.update(up_date,(res)=>{

            // console.log('客服电话' + res)

            setTimeout(() => {

              confirmLoading.value = false;             

              props.data.open = false;  // 收起model

              formRef.value.resetFields(); // 重置表单

              ctx.emit('edit_mobile_callback')   // 回调刷新表格
              
            },2000)

          })

        }).catch(error => {// 表单验证错误
          
          console.log('error', error);
        
        })
        
      };
      const cancel=()=>{

        formRef.value.resetFields(); // 重置表单
      }
    
    return {
        props,
        formRef,
        formfata,
        rules,
        cancel,
        confirmLoading,
        handleOk,

        }
    }


})
  
  </script>