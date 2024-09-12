<template>
  <a-drawer
      :title="open.adddata.title"
      :width="720"
      :open="open.adddata.open"
      :body-style="{ paddingBottom: '80px',}"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >

      <a-form
          name="Add_fun"
          ref="formRef"
          :model="formdata"
          :rules="rules"
          layout="vertical"
          class="font_size_12"
          autocomplete="off">

                <a-row :gutter="16"></a-row>

                <a-row :gutter="16"></a-row>

                <a-row :gutter="16"></a-row>


      </a-form>


  </a-drawer>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {useStore} from "vuex";

export default defineComponent({
  // 菜单添加
  name: "Ver_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {
    adddata:{
      type:Object
    }
  },
  // 组合API返回到模版
  setup(props) {

    const store = useStore();// 共享数据
    const open = props;// 获取父组件传递的
    const formRef = ref() // 表单验证数据绑定ref

    const formdata = reactive({

    }) // 表单数据绑定
    const PAGEDATA = reactive({})


    const rules={

    }

    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
        open.adddata.data = ''// 清除数据
    };

    return {
      open,
      store,
      PAGEDATA,
      formdata,
      formRef,
      rules,
      onClose,
    }
  }


})
</script>

<style>

</style>