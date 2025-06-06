<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <a-form>
          <a-form-item style="margin-top: 20px;">
            <a-radio-group v-model:value="formState.resource">
                <a-radio value="0">普通</a-radio>
                <a-radio value="3">虚拟</a-radio>
                <a-radio value="6">玉石闪购</a-radio>
                <a-radio value="7">云闪购</a-radio>
              </a-radio-group>
      </a-form-item>
      </a-form>

      </a-modal>
    </div>




</template>
  <script>
import { defineComponent, onBeforeUnmount, ref, shallowRef, computed, reactive } from 'vue'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

export default defineComponent({

    name: "Edit_product_type",  // 商品类型

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
      const formState = computed(()=>{
        return reactive({
          resource:props.data.data
        })
      })
            
      const confirmLoading = ref(false);

      const handleOk = () => {
        
        confirmLoading.value = true;

        TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

        const up_date = {

          id:props.data.id,

          setting_data:{

            "product_type":formState.value.resource

          }
        }

        TO.actions.update(up_date,(res)=>{

          // console.log('商品类型' + res)

          setTimeout(() => {

            confirmLoading.value = false;             

            props.data.open = false;  // 收起model

            ctx.emit('edit_product_type_callback')   // 回调刷新表格
            
          },2000)

        })
      };

    
    return {
        props,
        formState,
        confirmLoading,
        handleOk,

        }
    }


})
  
  </script>