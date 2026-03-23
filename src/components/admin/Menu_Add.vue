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
                  v-model:value="formdata.parent_id"
                  ref="select"
                  style="width: 100%"
                  :options="first_menu"
                  @change="handleChange"
                  class="font_size_12"
                  placeholder="选择父级菜单"
                  type="string"
                  ></a-select>
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="图标名称" name="ico_name">
                  <a-input v-model:value="formdata.ico_name" class="font_size_12" placeholder="输入函数字符名称" type="text" />
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
                <a-form-item label="功能字符" name="field">
                  <a-input v-model:value="formdata.field" class="font_size_12" placeholder="输入函数字符名称" type="text" />
                </a-form-item>
              </a-col>
          </a-row>

          <a-row :gutter="16">

            <a-col :span="24">
              <a-form-item label="功能配置" name="function_info">
                  <a-select
                  v-model:value="formdata.function_info"
                  mode="multiple"
                  :allowClear="true"
                  style="width: 100%"
                  :options="function_list"
                  @change="fun_handleChange"
                  class="font_size_12"
                  placeholder="输入功能描述"
                  type="string"></a-select>
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
import {defineComponent, reactive, ref, computed} from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
export default defineComponent({
  // 菜单添加
  name: "Menu_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {
    adddata:{type:Object}
  },
  // 组合API返回到模版
  setup(props, ctx) {

    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法

    const open = props;// 获取父组件传递的

    const formRef = ref() // 表单验证数据绑定ref

    // loading状态

    const loading = ref(false)

    // 绑定数据初始化
    const formdata = computed(()=>{

        // 多选表单指定数据绑定

        var list = ref(undefined)

        if(open.adddata.data.function_info !== undefined){

          list.value = for_value_list(JSON.parse(open.adddata.data.function_info))

        }else {

          list.value = []

        }

      return reactive({
        parent_id:open.adddata.data.parent_id,
        ico_name:open.adddata.data.ico_name,
        name:open.adddata.data.name,
        field:open.adddata.data.field,
        function_info:list,
      })

      function for_value_list(data) {
        var text_list = []
        for(let i of data){
          text_list.push(i.value)
        }
        return text_list
      }


    })

    const rules={
      parent_id:[{
        required: true,
        trigger: 'change',
        message: '不能为空',
      }],
      ico_name:[{

      }],
      name:[{
        required: true,
        trigger: 'change',
        message: '不能为空',
      }],
      field:[{
        required: true,
        trigger: 'change',
        message: '不能为空',
      }],
      function_info:[{
        required: true,
        trigger: 'change',
        message: '不能为空',
      }]

    }

    // 上级菜单选择监听
    const handleChange = value => {

      console.log(`selected ${value}`);

    };

    // 一级菜单选择
    var first_menu = reactive([{"value":"0","label":"一级菜单"}])
    TO.message.url = API.AdminAPI.menu.list    // 请求接口地址赋值
    var message = {"page":1, "page_size":100}
    TO.actions.list(message,(res)=>{
      TO.menu.add_colum(res)        // 添加表头
      for(let i of res.data){
        if(i.parent_id == 0){
          let o = {}
          o.value = i.id.toString()
          o.label = i.name
          first_menu.push(o)
        }
      }
    })

    // 功能列表选择监听
    const fun_handleChange = value => {
      console.log(`selected ${value}`);
    };

    // 功能列表选择
    var function_list = reactive([])
    TO.message.url = API.AdminAPI.function.list    // 请求接口地址赋值
    TO.actions.list(message,(res)=>{
      for(let i of res.data){
          let o = {}
          o.index = i.index
          o.value = i.def_name
          o.label = i.name
          function_list.push(o)
      }
    })


    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
        open.adddata.data = ''// 清除数据
    };


    // 提交数据
    const from_submit = ()=>{
      // 新建提交
      if(open.adddata.title === '添加菜单'){

        fun_add()

      }else if(open.adddata.title === '编辑菜单'){// 编辑提交

        fun_update()

      }
    }

    // 添加数据方法
    const fun_add = () => {

      formRef.value.validate().then(() => {

        loading.value = true;

        // 验证图标
        if(formdata.value.ico_name == null){
          formdata.value.ico_name = ''
        }

        formdata.value.function_info = for_dict(formdata.value.function_info)

        TO.message.url = API.AdminAPI.menu.add

        TO.actions.add(formdata.value,(res)=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('menu_add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

          },1000)
        })

        }).catch(error => {

          console.log('error', error);

        });

    }

    // 更新数据-提交方法
    const fun_update=()=>{

      formRef.value.validate().then(() => {

        loading.value = true;

        // 验证图标
        if(formdata.value.ico_name == null){
          formdata.value.ico_name = ''
        }

        formdata.value.function_info = for_dict(formdata.value.function_info)

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        TO.message.url = API.AdminAPI.menu.edit

        TO.actions.update(up_date,(res)=>{

          setTimeout(()=>{

            loading.value = false;            // 关闭loading效果

            open.adddata.open = false;        // 收起抽屉

            ctx.emit('menu_add_coallback')    // 回调刷新表格

            formRef.value.resetFields();      // 重置表单

          },1000)



        })


        }).catch(error => {

          console.log('error', error);

        });

    }

    // 菜单功能列表转字典
    const for_dict = (array) =>{
      var fun_list = []
      var data_list = function_list;
      for(let i of array){
        for(let y of data_list){
          var obj = {}
          if(i == y.value){
            obj.value = i
            obj.label = y.label
            fun_list.push(obj)
          }
        }
      }
      return fun_list
    }

    return {
      open,
      formdata,
      formRef,
      rules,
      onClose,
      first_menu,
      function_list,
      handleChange,
      fun_handleChange,
      loading,
      from_submit

    }
  }


})
</script>

<style>

</style>