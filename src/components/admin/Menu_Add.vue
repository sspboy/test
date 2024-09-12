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

          <a-row :gutter="16">

              <a-col :span="12">
                <a-form-item label="上级菜单" name="parent_id">
                  <a-select
                  v-model:value="formdata.id"
                  ref="select"
                  style="width: 100%"
                  :options="parent_select"
                  @change="handleChange"
                  class="font_size_12"
                  placeholder="选择父级菜单"
                  type="string"
                  loading="parent_select_loading"
                  ></a-select>
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="功能字符" name="field">
                  <a-input v-model:value="formdata.def_name" class="font_size_12" placeholder="输入函数字符名称" type="text" />
                </a-form-item>
              </a-col>

          </a-row>

          <a-row :gutter="16">

              <a-col :span="12">
                <a-form-item label="菜单名称" name="name">
                  <a-input v-model:value="formdata.name" class="font_size_12" placeholder="输入名称" type="string" />
                </a-form-item>
              </a-col>


              <a-col :span="12">
                <a-form-item label="图标名称" name="ico_name">
                  <a-input v-model:value="formdata.def_name" class="font_size_12" placeholder="输入函数字符名称" type="text" />
                </a-form-item>
              </a-col>

          </a-row>

          <a-row :gutter="16">

            <a-col :span="24">
              <a-form-item label="功能配置" name="miaoshu">
                  <a-select
                  v-model:value="formdata.miaoshu"
                  mode="multiple"
                  style="width: 100%"
                  :options="fun_select"
                  @change="handleChange"
                  class="font_size_12"
                  placeholder="输入功能描述"
                  type="string" ></a-select>
              </a-form-item>
            </a-col>

          </a-row>


      </a-form>


  </a-drawer>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {useStore} from "vuex";

export default defineComponent({
  // 菜单添加
  name: "Menu_Add",
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
    const parent_select_loading = ref(true)

    const rules={

    }

    const parent_select = ref([
      {"value":"0","label":"一级菜单"},
      {"value":"1","label":"客户管理"},
    ])

    const fun_select = ref([
      {"value":"list","label":"列表"},
      {"value":"detaile","label":"详情"},
    ])
    const handleChange = value => {
      console.log(`selected ${value}`);
    };

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
      parent_select,
      fun_select,
      parent_select_loading
    }
  }


})
</script>

<style>

</style>