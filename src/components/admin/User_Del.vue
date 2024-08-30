<template>
  <div>
    <a-modal v-model:open="open.deldata.open" title="确认删除？" :confirm-loading="confirmLoading" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <p>{{ modalText }}</p>
    </a-modal>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  // 模版名称
  name: "User_Del",
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
  setup(props) {

    const open = props
    const modalText = ref('数据删除将无法恢复！');
    const confirmLoading = ref(false);


    // 确认方法
    const handleOk = () => {
      modalText.value = '正在删除数据中,请稍等...';
      confirmLoading.value = true;
      setTimeout(() => {
        open.deldata.open = false;
        confirmLoading.value = false;
      }, 2000);
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