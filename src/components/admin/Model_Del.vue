<template>
  <div>
    <a-modal v-model:open="open.deldata.open" title="确认删除？" :confirm-loading="confirmLoading" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <p>{{ modalText }}</p>
    </a-modal>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {useStore} from "vuex";
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

export default defineComponent({
  // 模版名称
  name: "Model_Del",
  // 引用组件
  components: {

  },
  // 父组件数据
  props: {
    deldata:{
      type:Object
    }

  },
  // 组合API返回到模版
  setup(props,ctx) {
    const API = new utils.A_Patch()// 请求接口
    const TO = new TABLE.TableOperate()// 表格操作方法

    const store = useStore();// 共享数据
    const open = props


    const modalText = ref('数据删除将无法恢复！');
    const confirmLoading = ref(false);


    // 确认方法
    const handleOk = () => {

      modalText.value = '正在删除数据中,请稍等...';

      confirmLoading.value = true;

      // 新建用户接口
      TO.message.url = open.deldata.actian_name

      TO.actions.del(open.deldata.detaile_obj,(res)=>{

        console.log(res)

        setTimeout(()=>{

          open.deldata.open = false;

          confirmLoading.value = false;

          ctx.emit('del_coallback') // 删除成功后刷新表格

        },2000)

      })


    };

    return {
      open,
      modalText,
      confirmLoading,
      handleOk,

    }
  }


})
</script>

<style>

</style>