// 删除组件
<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" okText="删除" cancelText="取消">
        <p style="margin-top: 20px;">数据删除后将无法恢复！</p>
      </a-modal>
    </div>
</template>
  <script>
import { defineComponent,ref } from 'vue';
import * as TABLE from '@/assets/JS_Model/TableOperate';
export default defineComponent({

    name: "Model_del",  // 删除组件


    // 引用组件
    components: {



    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        const TO = new TABLE.TableOperate()// 表格操作方法
        const confirmLoading = ref(false);
        
        

        const handleOk = () => {
                        
            confirmLoading.value = true;


            // 新建用户接口

            TO.message.url = props.data.action
            
            var del_data = {
                "id":props.data.data
            }

            TO.actions.del(del_data,(res)=>{

                // console.log(res)

                setTimeout(()=>{

                    props.data.open = false;

                    confirmLoading.value = false;

                    ctx.emit('del_callback') // 删除成功后刷新表格

                },2000)

            })


        };
    
    
    
    return {
        props,
        confirmLoading,
        handleOk,

        }
    }


})
  
  </script>