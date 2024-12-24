<template>
    <div>

      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish" style="padding-top: 20px;">

          <a-space v-for="(user, index) in dynamicValidateForm.users" :key="user.id" style="display: flex; width: 100%; margin-bottom: 8px" align="baseline">


            <a-form-item :name="['users', index, 'url']"
                :rules="{
                required: true,
                message: '图片地址不能为空',
              }"
            >
              <div v-if="user.url === ''" style="float: left;width: 50px;height: 50px;text-align: center;background-color: #f2f2f2;border-radius: 4px;"></div>
              <div v-else-if="user.url != ''" style="float: left;">
                <a-image :src="user.url" :width="50" :height="50" style="float: left;border-radius: 4px;" />
              </div>

              <span style="display: block;float: right; width: 20px;height: 20px; margin:14px 0 0 10px;"><MinusCircleOutlined @click="removeUser(user)" /></span>
              <a-textarea v-model:value="user.url" placeholder="输入图片地址"  style="float: right;width: 360px;margin:2px 0 0 10px;font-size: 12px;"/>


            </a-form-item>

          </a-space>
          
          
          <a-form-item>
            <a-button type="dashed" block @click="addUser">
              <PlusOutlined />
              添加图片
            </a-button>
          </a-form-item>


          <a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
       
        </a-form>







      </a-modal>
    </div>







</template>
<script>
import { defineComponent,ref,reactive,computed } from 'vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';


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
      
      const get_img_obj = (data)=>{
        const img_obj = []
        const img_list = data.split('|')
        for (let i of img_list){
          var obj = {}
          obj.url = i
          img_obj.push(obj)
        }
        console.log(img_obj)
        return img_obj
      }



      const confirmLoading = ref(false);

      const formRef = ref();

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
        dynamicValidateForm.value.users.push({
          url: ''
        });
      };
      
      const onFinish = values => {
        try {
          console.log('Received values of form:', values);
        } catch (error) {
          // 可能抛出异常的代码
          console.log('hehe')
        }
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
        confirmLoading,
        handleOk,

        formRef,
        dynamicValidateForm,
        onFinish,
        removeUser,
        addUser,
        }
    }


})
  
  </script>
<style>



</style>