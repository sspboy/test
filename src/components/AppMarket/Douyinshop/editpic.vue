<template>
    <div>

      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" style="padding-top: 20px;">

          <a-space v-for="(user, index) in dynamicValidateForm.users" :key="user.id" style="display: flex; width: 100%; margin-bottom: 8px" align="baseline">

            <a-form-item :name="['users', index, 'url']" :rules="{required: true,trigger: 'change', message: '图片地址不能为空'}">

              <div v-if="user.url === ''" style="float: left;width: 50px;height: 50px;text-align: center;background-color: #f2f2f2;border-radius: 4px;"></div>

              <div v-else-if="user.url != ''" style="float: left;">
                <a-image :src="user.url" :width="50" :height="50" style="float: left;border-radius: 4px;" />
              </div>

              <span style="display: block;float: right; width: 20px;height: 20px; margin:14px 0 0 10px;">
                
                <MinusCircleOutlined @click="removeUser(user)" />

              </span>

              <a-textarea v-model:value="user.url" placeholder="输入图片地址" style="float:right;width: 360px;margin:2px 0 0 10px;font-size: 12px;"/>

            </a-form-item>

          </a-space>
          
          
          <a-form-item>
            <a-button type="dashed" block @click="addUser">
              <PlusOutlined />
              添加图片
            </a-button>
          </a-form-item>
       
        </a-form>







      </a-modal>
    </div>







</template>
<script>
import { defineComponent,ref,reactive,computed } from 'vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

export default defineComponent({

    name: "Edit_pic",  // 功能添加
    // 引用组件
    components: {
      MinusCircleOutlined,
      PlusOutlined
    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {
      const API = new utils.A_Patch()       // 请求接口地址合集
      const TO = new TABLE.TableOperate()   // 表格操作方法
      const confirmLoading = ref(false); // 确认按钮状态
      const formRef = ref();

      // 请求图片列表
      const get_img_obj = (data)=>{
        const img_obj = []
        const img_list = data.split('|')
        for (let i=0;i<img_list.length;i++){
          var obj = {}
          obj.url = img_list[i]
          obj.id = i
          img_obj.push(obj)
        }
        // console.log(img_obj)
        return img_obj
      }

      // 数据集
      const dynamicValidateForm = computed(()=>{
        return reactive({
          users:get_img_obj(props.data.data)
        })
      })


      // 删除数据
      const removeUser = item => {
        
        let index = dynamicValidateForm.value.users.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.users.splice(index, 1);
        }

      };
      
      // 添加数据
      const addUser = () => {

        var url_num = dynamicValidateForm.value.users.length;// 已输入图片数量

        if(url_num >= 5){          
          message.info('主图最多不能超过5张！');        // 提示图片数量不能超过5张
        }else{
          dynamicValidateForm.value.users.push({url: ''});
        }

      };
      
      const handleOk = () => {

          // 验证表单结果是否正确
          formRef.value.validate().then(() => {

            // console.log('values', dynamicValidateForm.value);

            var url_num = dynamicValidateForm.value.users.length;// 已输入图片数量
        
            if(url_num > 5){          
              
              message.info('主图最多不能超过5张！');        // 提示图片数量不能超过5张

            }else if(url_num == 0){
              
              message.info('主图最多不能为空！');        // 提示图片数量不能超过5张

            }else{// 更新数据

              confirmLoading.value = true;

              TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

              var url_list = []

              for(let i of dynamicValidateForm.value.users){url_list.push(i.url)}

              const up_date = {

                id:props.data.id,

                setting_data:{
                  "pic":url_list.join('|'),
                  "top_pic":url_list[0]
                }

                }

              TO.actions.update(up_date,(res)=>{

                // console.log('更新主图' + res)

                setTimeout(() => {

                  confirmLoading.value = false;             

                  props.data.open = false;  // 收起model

                  ctx.emit('edit_pic_callback')   // 回调刷新表格

                  formRef.value.resetFields(); // 重置表单

                },2000)

              
              })

            }

          }).catch(error => {// 表单验证错误

            console.log('error', error);


          });

      }

      
    return {
        props,
        confirmLoading,
        handleOk,

        formRef,
        dynamicValidateForm,
        removeUser,
        addUser,
        }
    }


})
  
  </script>
<style>



</style>