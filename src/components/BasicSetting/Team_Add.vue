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
            <a-form-item label="子账号" name="name">
              <a-input v-model:value="formdata.name" :addon-before="store.state.member.message.user_data.brand_name + ':'" class="font_size_12" placeholder="子账号名称" type="text"/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="昵称" name="nickname">
              <a-input v-model:value="formdata.nickname" class="font_size_12" placeholder="输入昵称" type="text" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="电话号码" name="mobile">
              <a-input v-model:value="formdata.mobile" class="font_size_12" placeholder="输入电话号码" type="text" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="密码" name="password">
              <a-input-password v-model:value="formdata.password" class="font_size_12" placeholder="输入密码" type="text" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="状态" name="state">
              <a-select v-model:value="formdata.state" size="middle" placeholder="选择状态" class="font_size_12" :options="state_op"></a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="角色" name="role">
              <a-select v-model:value="formdata.role" mode="tags" size="middle" placeholder="选择角色" class="font_size_12" :options="role_op"></a-select>

            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="所属部门" name="department_name">
                <a-tree-select
                  v-model:value="formdata.department_name"
                  style="width: 100%"
                  :tree-data="department_op"
                  allow-clear
                  :show-checked-strategy="SHOW_PARENT"
                  placeholder="选择所属部门"
                  tree-node-filter-prop="label"
                />
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
import { useStore } from 'vuex'
import {TreeSelect} from "ant-design-vue";
import {Role} from '/src/assets/JS_Model/department.js'
export default defineComponent({
  // 模版名称
  name: "Team_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {
    adddata:{typr:Object}
  },
  // 组合API返回到模版
  setup(props,ctx) {

    const store = useStore();// 共享数据

    const open = props;

    const formRef = ref()

    const formdata = computed(()=>{

      console.log(store.state.member.message.user_data.b_id)

      return reactive({
        name:open.adddata.data.name,
        nickname:open.adddata.data.nickname,
        mobile:open.adddata.data.mobile,
        password:open.adddata.data.password,
        state:open.adddata.data.state,
        role:open.adddata.data.role,
        department_id:open.adddata.data.department_id,
        department_name:open.adddata.data.department_name

      })

    })

    // 状态下拉选择
    const state_op = [
      {label:'启用', value:'0'},
      {label:'停用', value:'1'}
    ]

    // 角色下拉选择==当前品牌所有角色id、名称
    const role_op=reactive([])
    // 获取所有角色
    var R = new Role()

    R.all_.get_all_role('12',(res)=>{
      
      for(let i of res.data){
        let r_obj = {}
        r_obj.label = i.role_name
        r_obj.value = i.id
        role_op.push(r_obj)
      }

    })



    // 所属部门下拉选择==当前品牌所有部门id、名
    // 树状菜单回填方法SHOW_ALL=全部节点回填（含父节点）；SHOW_PARENT=只回填父节点
    const SHOW_PARENT = TreeSelect.SHOW_ALL;
    const department_op = reactive([
      {label:'销售一部', value:'0',children: [{label: '小组A', value: '34'}]},
      {label:'销售二部', value:'1'},
      {label:'编导一组', value:'2'},
      {label:'编导二组', value:'admin'},
      {label:'', value:'yuangong'},

    ])

    const PAGEDATA = reactive({})
    const loading = ref(false)


    // 验证规则
    const rules={
      // 子账号名称::验证是否重名
      name: [{
        required: true,
        message: '不能为空',
      }],
      // 昵称：：验证是否重名
      nickname: [{
        required: true,
        message: '不能为空',
      }],
      state: [{
        required: true,
        message: '不能为空',
      }],
      role: [{
        required: true,
        message: '不能为空',
      }],
      department_name: [{
        required: true,
        message: '不能为空',
      }],
      password: [{
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
        console.log(open.adddata.action)
        console.log(formdata.value)

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
      store,
      state_op,
      role_op,
      department_op,
      SHOW_PARENT,
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
.ant-select-selection-item{
  font-size: 12px;
}
.ant-select-selection-placeholder{
    font-size: 12px;
}
</style>