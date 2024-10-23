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
            <a-form-item label="功能名称" name="name">
              <a-input v-model:value="formdata.name" class="font_size_12" placeholder="输入名称" type="string" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="功能字符" name="def_name">
              <a-input v-model:value="formdata.def_name" class="font_size_12" placeholder="输入函数字符名称" type="text" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="24">
            <a-form-item label="描述" name="miaoshu">
              <a-input v-model:value="formdata.miaoshu" class="font_size_12" placeholder="输入功能描述" type="text" />
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>



    <template #footer>
      <a-space style="float: left;">
        <a-button type="primary" @click="from_submit" style="font-size: 12px;" html-type="submit" :loading="loading">保存</a-button>
        <a-button @click="onClose" style="font-size: 12px;">取消</a-button>
      </a-space>
    </template>

  </a-drawer>
</template>

<script>
import {defineComponent, reactive, ref, computed } from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';

export default defineComponent({
  name: "Fun_Add",  // 功能添加
  components: {  // 引用组件
},

  // 父组件数据
  props: {
    adddata:{typr:Object}
  },

  // 组合API返回到模版
  setup(props, ctx) {
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const open = props;
    const formRef = ref()

    const formdata = computed(()=>{
      return reactive({
        name:open.adddata.data.name,
        def_name:open.adddata.data.def_name,
        miaoshu:open.adddata.data.miaoshu
      })
    })

    const PAGEDATA = reactive({})
    const loading = ref(false)


    // 验证规则
    const rules={
      // 菜单名称
      name: [{
        required: true,
        message: '不能为空',
      }],
      m_name: [{
        required: true,
        message: '不能为空',
      }],
      def_name: [{
        required: true,
        message: '不能为空',
      }],
      miaoshu: [{
        required: true,
        message: '不能为空',
      }]
    }


    // 提交数据
    const from_submit = ()=>{
      // 新建提交
      if(open.adddata.title === '添加功能'){

        fun_add_()

      // 编辑提交
      }else if(open.adddata.title === '编辑功能'){

        fun_update()

      }
    }

    // 添加数据方法
    const fun_add_ = () => {

      formRef.value.validate().then(() => {

        loading.value = true;

        TO.message.url = API.AdminAPI.function.add

        TO.actions.add(formdata.value,(res)=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

            },1000)

        })

        }).catch(error => {

          console.log('error', error);

        });


    }

    // 更新数据方法
    const fun_update=()=>{

      formRef.value.validate().then(() => {

        loading.value = true;

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        // 编辑用户接口
        TO.message.url = API.AdminAPI.function.edit

        TO.actions.update(up_date,(res)=>{
          
          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

            },1000)

        })

        }).catch(error => {

          console.log('error', error);

        });

    }

    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
        open.adddata.data = ''// 清除数据
    };




    return {
      open,
      PAGEDATA,
      formdata,
      formRef,
      rules,
      from_submit,
      onClose,
      loading,

    }
  }


})
</script>

<style>

</style>