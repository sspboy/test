<template>
    <div>
      <!-- <a-button type="primary" @click="showModal">Open Modal with async logic</a-button> -->
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >



        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">

          <a-form-item v-for="(spec, spec_index) in dynamicValidateForm.obj" :key="spec.id" style="display: flex; margin-bottom: 8px">
            
            <div style="width: 30%;float: left;">
              <a-input v-model:value="spec.spec_name" />
            </div>
            
            <a-button type="dashed" size="small" style="float:left;width: 60px;font-size: 12px; margin:2px 0 0 20px;" block @click="addUser(spec_index)">
              <PlusOutlined />
            </a-button>

            <a-button type="dashed" size="small" style="float:left;width: 60px;font-size: 12px; margin:2px 0 0 20px;" block @click="removeSpec(spec,spec_index)">
              <MinusOutlined />
            </a-button>

            <div style="width: 100%;display: block;clear: both;background-color: aliceblue;float: left;margin-top: 10px;">
              <a-space v-for="(user, spec_value_index) in spec.spec_value" :key="user.id" style="margin:2px 10px 0 0;clear: both;" align="baseline">
                  
                  <a-form-item :name="['users', spec_value_index]" :rules="{ required: true,message: 'Missing first name',}">
                    <a-input v-model:value="user.name" placeholder="输入规格值" style="font-size: 12px;" />
                  </a-form-item>

                  <MinusCircleOutlined @click="removeUser(user, spec_index)" />

              </a-space>
            </div>

          </a-form-item>
          



          <a-form-item>
            <a-button type="primary" @click="addspec" size="small">添加规格</a-button>
          </a-form-item>



        </a-form>




        
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,ref,reactive  } from 'vue';
import { MinusCircleOutlined, PlusOutlined,MinusOutlined } from '@ant-design/icons-vue';
export default defineComponent({

    name: "Edit_SKU",  // 功能添加
    // 引用组件
    components: {

      MinusCircleOutlined,
      PlusOutlined,
      MinusOutlined
    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        const confirmLoading = ref(false);

        const handleOk = () => {
            modalText.value = 'The modal will be closed after two seconds';
            confirmLoading.value = true;
            setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
            }, 2000);
        };


        const formRef = ref();
        
        const dynamicValidateForm = reactive({
          obj:[
            {
              "spec_name":"规格名称",
              "spec_value":[{name:'name1'},{name:'name2'}]
            }
          ],

          users: [
            {first: '',last: '',id: Date.now()}
          ],
        });


        const removeUser = (item, data) => {
          console.log(item)
          console.log(data)

          let index = dynamicValidateForm.obj[data].spec_value.indexOf(item);
          console.log(index)

          if (index !== -1) {
            dynamicValidateForm.obj[data].spec_value.splice(index, 1);
          }
        };

        // 删除规格
        const removeSpec = (item, data)=>{
          let index = dynamicValidateForm.obj.indexOf(item);
          console.log(index)

          if (index !== -1) {
            dynamicValidateForm.obj.splice(index, 1);
          }
        }

        const addUser = (data) => {
          console.log(data)
          dynamicValidateForm.obj[data].spec_value.push({
            name: 'add_value',
          });
        };
        // 添加规格
        const addspec = () =>{
          dynamicValidateForm.obj.push({
              "spec_name":"规格名称",
              "spec_value":[{name:'name1'},{name:'name2'}]
            })
          console.log(dynamicValidateForm.obj)
        }

        const onFinish = values => {
          console.log('Received values of form:', values);
          console.log('dynamicValidateForm.users:', dynamicValidateForm.users);
        };
        
        
        return {
          props,
          confirmLoading,
          handleOk,
          formRef,
          dynamicValidateForm,
          onFinish,
          removeUser,
          removeSpec,
          addUser,
          addspec
        };
    }


})
  
  </script>