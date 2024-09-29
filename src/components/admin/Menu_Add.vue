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
                  :options="parent_select"
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
                  :options="fun_select"
                  @change="fun_handleChange"
                  class="font_size_12"
                  placeholder="输入功能描述"
                  type="string" ></a-select>
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
import {useStore} from "vuex";

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

    const store = useStore();// 共享数据

    const open = props;// 获取父组件传递的

    const formRef = ref() // 表单验证数据绑定ref

    // loading状态

    const loading = ref(false)

    // 绑定数据初始化
    const formdata = computed(()=>{

        // 多选表单指定数据绑定

        var list = ref(undefined)

        if(open.adddata.data.function_info !== undefined){

          list.value = open.adddata.data.function_info.split('|')

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
    const parent_select = computed(()=>{

      // console.log(store.state.menu.message.data_list.data)

      var data_list = store.state.menu.message.data_list.data;

      var first_menu = [{"value":"0","label":"一级菜单"}]

      for(let i of data_list){
        if(i.parent_id == 0){
          let o = {}
          o.value = i.id.toString()
          o.label = i.name
          first_menu.push(o)
        }
      }
      return reactive(first_menu)
    })

    // 功能列表选择监听
    const fun_handleChange = value => {
      console.log(`selected ${value}`);
    };

    // 菜单功能功能选择
    let message = {"page":1, "page_size":20}
    store.dispatch('fun/list', message)

    const fun_select = computed(()=>{
      var data_list = store.state.fun.message.data_list.data;
      var _menu = []
      for(let i of data_list){
          let o = {}
          o.index = i.index
          o.value = i.def_name
          o.label = i.name
          _menu.push(o)
      }
      return reactive(_menu)
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

        formdata.value.function_info = formdata.value.function_info.join('|')

        store.dispatch(open.adddata.action, formdata.value).then(()=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('menu_add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

          },1000)

        }).catch(error => {

          console.log('error', error);

        });

      })

    }

    // 更新数据方法
    const fun_update=()=>{

      formRef.value.validate().then(() => {

        loading.value = true;

        // 验证图标
        if(formdata.value.ico_name == null){
          formdata.value.ico_name = ''
        }

        formdata.value.function_info = formdata.value.function_info.join('|')

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        store.dispatch(open.adddata.action, up_date).then(()=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('menu_add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

          },1000)

        }).catch(error => {

          console.log('error', error);

        });

      })

    }


    return {
      open,
      store,
      formdata,
      formRef,
      rules,
      onClose,
      parent_select,
      fun_select,
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