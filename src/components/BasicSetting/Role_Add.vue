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
            <a-form-item label="角色名称" name="role_name">
              <a-input v-model:value="formdata.role_name" class="font_size_12" placeholder="输入名称" type="string" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述" name="role_info">
              <a-input v-model:value="formdata.role_info" class="font_size_12" placeholder="输入函数字符名称" type="text" />
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="数据权限" name="data_permissions">
              <a-select v-model:value="formdata.data_permissions" placeholder="选择数据权限">
                <a-select-option value="0">个人</a-select-option>
                <a-select-option value="1">部门</a-select-option>
                <a-select-option value="2">所有</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>



          <a-col :span="12">
            <a-form-item label="状态" name="role_state">
              <a-select v-model:value="formdata.role_state" placeholder="选择状态" class="font_size_12">
                <a-select-option value="0">启用</a-select-option>
                <a-select-option value="1">停用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="24">

          <a-col :span="24">

            <a-list item-layout="horizontal" :data-source="checked_data_list" >

              <template #renderItem="{ item }">
                <a-list-item style="padding: 0px;border: none;">
                  <a-list-item-meta >


                  <template #title>

                    <a-divider orientation="left" style="font-size: 14px;">【{{ item.name }}】</a-divider>



                    <!--checkbox 迭代 开始-->
                    <a-list item-layout="horizontal" :data-source="item.child">
                      <template #renderItem="{ item }">
                      <a-list-item>

                        <a-checkbox style="font-size: 12px;" :name="item.id+''" v-model:checked="item.checked" @change="onCheckAllChange">
                          {{ item.name }}
                        </a-checkbox>

                          <a-list item-layout="horizontal" :data-source="item.function_info">

                            <template #renderItem="{ item }">
                                <span>
                                    <a-checkbox type="checkbox" :name="item.id+''" v-model:checked="item.checked" v-model:disabled="item.disabled" v-model:value="item.value"  style="font-size: 12px;">{{ item.label }}</a-checkbox>
                                </span>
                            </template>

                          </a-list>

                      </a-list-item>
                      </template>
                    </a-list>
                    <!--checkbox 迭代 结束-->



                  </template>
                  </a-list-item-meta>


                </a-list-item>
              </template>


            </a-list>

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
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';
export default defineComponent({
  // 模版名称
  name: "Role_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {
    adddata:{typr:Object}
},
  // 组合API返回到模版
  setup(props,ctx) {

    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const open = props;

    const store = useStore();// 共享数据

    const formRef = ref()

    const formdata = computed(()=>{
      return reactive({
        role_name:open.adddata.data.role_name,
        role_state:open.adddata.data.role_state,
        role_info:open.adddata.data.role_info,
        data_permissions:open.adddata.data.data_permissions,
      })
    })

    const loading = ref(false)

    // 表单---验证规则
    const rules={
      // 菜单名称
      role_name: [{
        required: true,
        message: '不能为空',
      }],
      role_state: [{
        required: true,
        message: '不能为空',
      }],
      data_permissions: [{
        required: true,
        message: '不能为空',
      }],
      role_info: [{
        required: true,
        message: '不能为空',
      }],
      view_permissions: [{
        required: true,
        message: '不能为空',
      }]
    }

    // 视图权限&功能权限设置====开始

    // 初始化-菜单权限-表单

    const checked_data_list = computed(()=>{

      var data = JSON.parse(JSON.stringify(store.state.member.message?.menu));


      // 新建权限 load
      if(open.adddata.data.view_permissions == undefined){
        for(let i of data){
          for(let y of i.child){
            y.checked = false
            y.function_info = JSON.parse(y.function_info)
            for(let z of y.function_info){
              z.checked = false
              z.disabled = true
            }
          }
        }


      }else {
      // 编辑权限 load

        var view_permissions = JSON.parse(open.adddata.data.view_permissions) // 视图权限
        var fun_permissions = JSON.parse(open.adddata.data.fun_permissions)  // 功能权限

        for(let i of data){

          for(let y of i.child){

            if(view_permissions.includes(y.field)){
              y.checked = true
            }else {
              y.checked = false
            }

            y.function_info = JSON.parse(y.function_info)

            for(let z of y.function_info){
              if(fun_permissions[y.field] !== undefined && fun_permissions[y.field].includes(z.value)){
                z.checked = true
                z.disabled = false
              }else {
                z.checked = false
                z.disabled = true
              }

            }
          }
        }
      }

      return reactive(data)

    })

    // 勾选主菜单，全选功能
    const onCheckAllChange = e => {

      var name = e.target.name

      var checked = e.target.checked

      for(let i of checked_data_list.value){

        for(let y of i.child){

          if(name == y.id){

            for(let x of y.function_info){
              if(checked){
                x.checked = true
                x.disabled = false
              }else {
                x.checked = false
                x.disabled = true
              }
            }
          }
        }
      }
    };

    // 用户信息中获取菜单：

    // 获取页面表单值
    const get_checked_res = () =>{

      var result_from = checked_data_list.value

      var obj = {}
      var view_permissions = []
      var fun_permissions = {}

      for(let i of result_from){

        for(let y of i.child){

          if(y.checked == true){
            view_permissions.push(y.field)
            var fun = []
            for(let z of y.function_info){
              if(z.checked == true){
                fun.push(z.value)
              }
            }
            fun_permissions[y.field] = fun
          }
        }
      }

      obj.view_permissions = view_permissions
      obj.fun_permissions = fun_permissions

      return obj

    }
    // 视图权限&功能权限设置====结束


    // 提交数据
    const from_submit = ()=>{
      // 新建提交
      if(open.adddata.title === '添加角色'){

        fun_add_()

      // 编辑提交
      }else if(open.adddata.title === '编辑角色'){

        fun_update()

      }
    }

    // 添加数据方法
    const fun_add_ = () => {

      formRef.value.validate().then(() => {

        loading.value = true;

        // 获取权限表单
        var pre = get_checked_res()

        formdata.value.view_permissions = JSON.stringify(pre.view_permissions)
        formdata.value.fun_permissions = JSON.stringify(pre.fun_permissions)

        TO.message.url = API.BasicsAPI.role.add

        TO.actions.add(formdata.value,(res)=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

            resh_checked() // 重置权限表单


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

        // 获取权限表单
        var pre = get_checked_res()
        formdata.value.view_permissions = JSON.stringify(pre.view_permissions)
        formdata.value.fun_permissions = JSON.stringify(pre.fun_permissions)

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        // 编辑用户接口
        TO.message.url = API.BasicsAPI.role.edit

        TO.actions.update(up_date,(res)=>{
          
          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

            resh_checked()// 重置权限表单


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
        open.adddata.data = ''        // 清除数据
        resh_checked() // 初始化权限表单

    };

    // 重置权限表单
    const resh_checked = ()=>{

      var result_from = checked_data_list.value

      // 初始化权限表单
        for(let i of result_from){
          for(let y of i.child){
            y.checked = false
            for(let z of y.function_info){
              z.checked = false
              z.disabled = true
            }
          }
        }
    }

    return {
      open,
      formdata,
      formRef,
      rules,
      from_submit,
      onClose,
      loading,
      onCheckAllChange,
      checked_data_list,

    }
  }


})
</script>

<style>
.ant-list-item{
  margin: 0px;
  padding: 0px;
}
</style>