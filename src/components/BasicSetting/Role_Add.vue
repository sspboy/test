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
            <a-form-item label="状态" name="role_state">
              <a-select v-model:value="formdata.role_state" placeholder="选择状态" class="font_size_12">
                <a-select-option value="0">启用</a-select-option>
                <a-select-option value="1">停用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="描述" name="role_info">
              <a-input v-model:value="formdata.role_info" class="font_size_12" placeholder="输入函数字符名称" type="text" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="数据权限" name="data_permissions">
              <a-select v-model:value="formdata.data_permissions" placeholder="选择数据权限">
                <a-select-option value="0">个人</a-select-option>
                <a-select-option value="1">部门</a-select-option>
                <a-select-option value="2">所有</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="24">

          <a-col :span="24">

            <a-list item-layout="horizontal" :data-source="checked_data_list?.menu" >

              <template #renderItem="{ item }">
                <a-list-item style="padding: 0px;border: none;">
                  <a-list-item-meta >


                  <template #title>

                    <a-divider orientation="left" style="font-size: 14px;">【{{ item.name }}】</a-divider>



                    <!--checkbox 迭代 开始-->
                    <a-list item-layout="horizontal" :data-source="item.child">
                      <template #renderItem="{ item }">
                      <a-list-item>

                        <a-checkbox style="font-size: 12px;" :name="item.id+''" v-model:checked="true" @change="onCheckAllChange">
                          {{ item.name }}
                        </a-checkbox>

                          <a-list item-layout="horizontal" :data-source="item.function_info">

                            <template #renderItem="{ item }">
                                <span>
                                    <a-checkbox type="checkbox" :name="item.id+''" :checked="item.checked" v-model:disabled="item.disabled" v-model:value="item.value"  style="font-size: 12px;">{{ item.label }}</a-checkbox>
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
        <a-button @click="get_checked_res" style="font-size: 12px;">获取选择表单</a-button>
      </a-space>
    </template>

  </a-drawer>
</template>

<script>
import {defineComponent, reactive, ref, computed,watch} from 'vue';
import { useStore } from 'vuex'

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

    const open = props;

    const store = useStore();// 共享数据

    const formRef = ref()

    const formdata = computed(()=>{
      return reactive({
        role_name:open.adddata.data.role_name,
        role_state:open.adddata.data.role_state,
        role_info:open.adddata.data.role_info,
        data_permissions:open.adddata.data.data_permissions,
        view_permissions:open.adddata.data.view_permissions,
        fun_permissions:open.adddata.data.fun_permissions,
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
      view_permissions: [{
        required: true,
        message: '不能为空',
      }]
    }

    // 视图权限&功能权限设置====开始
    // 用户信息+版本信息+菜单信息
    // 更具用户版本号，获取功能菜单
    // const checked_data_list = reactive([
    //     {
    //       'menu':{'id':'65','name':'客户管理','field':'menu'},// 菜单名称
    //       'child':[
    //         {'name':'menuA','menu_name':'二级菜单A','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuB','menu_name':'二级菜单B','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuC','menu_name':'二级菜单B','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         ],
    //     },
    //     {
    //       'menu':{'id':'65','name':'视频管理','field':'video'},// 菜单名称
    //       'child':[
    //         {'name':'menuD','menu_name':'二级菜单A','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuE','menu_name':'二级菜单B','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuF','menu_name':'二级菜单C','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         ],
    //
    //     },
    //     {
    //       'menu':{'id':'65','name':'视频管理','field':'mini'},// 菜单名称
    //       'child':[
    //         {'name':'menuD','menu_name':'二级菜单A','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuE','menu_name':'二级菜单B','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuF','menu_name':'二级菜单C','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         ],
    //
    //     },
    //     {
    //       'menu':{'id':'65','name':'视频管理','field':'video'},// 菜单名称
    //       'child':[
    //         {'name':'menuD','menu_name':'二级菜单A','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuE','menu_name':'二级菜单B','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         {'name':'menuF','menu_name':'二级菜单C','fun':[
    //             {'label':'列表','value':'list','checked':false,'disabled':true},
    //             {'label':'详情','value':'detaile','checked':false,'disabled':true},
    //             {'label':'添加','value':'add','checked':false,'disabled':true},
    //             {'label':'编辑','value':'edit','checked':false,'disabled':true},
    //             {'label':'删除','value':'del','checked':false,'disabled':true},
    //             {'label':'批量删除','value':'batch_del','checked':false,'disabled':true}]
    //         },
    //         ],
    //
    //     },
    //
    //     ])

    const checked_data_list = computed(()=>{

      var data = JSON.parse(JSON.stringify(store.state.member.message));

      for(let i of data.menu){
        for(let y of i.child){
          y.function_info = JSON.parse(y.function_info)
          for(let z of y.function_info){
            z.checked = false
            z.disabled = true
          }
        }
      }
      return data

    })



    // 勾选主菜单，全选功能
    const onCheckAllChange = e => {

      //
      var name = e.target.name
      //
      var checked = e.target.checked
      //
      console.log(name)
      console.log(checked)

      for(let i of checked_data_list.value.menu){
        console.log(i)

        for(let y of i.child){

          var child_menu_id = y.id

          if(child_menu_id === name){

            for(let x of y.fun){
              if(checked){
                x.checked = checked
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

      console.log(checked_data_list)

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
        // console.log(open.adddata.action)
        // console.log(formdata.value)

        store.dispatch(open.adddata.action, formdata.value).then(()=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

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

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        store.dispatch(open.adddata.action, up_date).then(()=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

          },1000)

        }).catch(error => {

          console.log('error', error);

        });

      })

    }

    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
        open.adddata.data = ''// 清除数据
    };

    return {
      open,
      formdata,
      formRef,
      rules,
      from_submit,
      onClose,
      loading,
      onCheckAllChange,
      get_checked_res,
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