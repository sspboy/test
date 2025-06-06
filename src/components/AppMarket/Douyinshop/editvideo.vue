<template>
    <div>
<<<<<<< HEAD
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <div style="width: 100%;clear: both;text-align: center;padding: 20px 0 20px 0;">
          <video autoplay width="320" height="320" :src="VideoData.obj.url" controls />
          <p>
            <a-input v-model:value="VideoData.obj.url" placeholder="输入视频地址"  style="width: 360px;margin:10px 0 0 0;font-size: 12px;"/>
          </p>

        </div>
=======
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="cancel">
        <a-form :model="videodata" ref="formRef" :rules="rules">
          <div style="text-align: center;padding:20px 0 ;">
              <a-form-item name="url" :key="videodata.id">
              <video width="355" height="355" :src="videodata.url" type="video/mp4" controls />
              <a-textarea v-model:value="videodata.url" placeholder="输入视频地址"  style="width: 360px;margin:10px 0 0 0;font-size: 12px;"/>
              </a-form-item>
          </div>
        </a-form>
>>>>>>> 778e44502c5f20f58d839483faff34c77a6c2db9
      </a-modal>
    </div>
</template>
  <script>
<<<<<<< HEAD
  import {defineComponent, ref, reactive, computed} from 'vue';

=======
import { defineComponent,ref,reactive,computed } from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
>>>>>>> 778e44502c5f20f58d839483faff34c77a6c2db9
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

<<<<<<< HEAD
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
=======
      const API = new utils.A_Patch()       // 请求接口地址合集
      const TO = new TABLE.TableOperate()   // 表格操作方法
      const formRef = ref('');
      const get_video_data = (data)=>{
        return JSON.parse(data)
      }

      const videodata = computed(()=>{

        if(props.data.data === '0'){
          var video_obj = ''
        }else if(props.data.data != '0'){
          var video_obj = get_video_data(props.data.data)
        }
        
        return reactive({
          id:props.data.id,
          pic:video_obj.pic,
          url:video_obj.url
        })
      })

      // 表单规则
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
              "video_url": {
                "pic":videodata.value.pic,
                "url":videodata.value.url
              }
            }
          }

          TO.actions.update(up_date,(res)=>{
            // console.log('视频链接' + res)
>>>>>>> 778e44502c5f20f58d839483faff34c77a6c2db9
            setTimeout(() => {
              confirmLoading.value = false;
              props.data.open = false;  // 收起model
              ctx.emit('edit_video_url_callback')   // 回调刷新表格
              
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
<<<<<<< HEAD
        VideoData,
=======
        formRef,
        videodata,
        rules,
>>>>>>> 778e44502c5f20f58d839483faff34c77a6c2db9
        confirmLoading,
        handleOk,
        cancel,

        }
    }


})
  
  </script>