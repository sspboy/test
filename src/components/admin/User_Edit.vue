<template>
  <a-drawer
      title="编辑"
      :width="720"
      :open="open.editdata.open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
      <a-form :model="form" :rules="rules" layout="vertical">

        <a-row :gutter="16">


          <a-col :span="12">
            <a-form-item label="账号名称" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="账号类型" name="account_type">
              <a-select v-model:value="form.account_type" placeholder="Please choose the type">
                <a-select-option value="1">品牌会员</a-select-option>
                <a-select-option value="2">后台管理员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="版本号" name="owner">
              <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
                <a-select-option value="xiao">个人版本</a-select-option>
                <a-select-option value="mao">企业版</a-select-option>
                <a-select-option value="hou">管理后台</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="昵称" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="密码" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="品牌名称" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="手机号" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="角色" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="部门id" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="部门名称" name="name">
              <a-input v-model:value="form.name" placeholder="Please enter user name" />
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>


      <template #extra>
        <a-space>
          <a-button @click="onClose" style="font-size: 12px;" size="small">取消</a-button>
          <a-button type="primary" @click="onClose" class="font_size_12" size="small">保存</a-button>
        </a-space>
      </template>


  </a-drawer>



</template>


<script>
import { reactive, ref, defineComponent } from 'vue';
import { PlusOutlined} from '@ant-design/icons-vue';


export default defineComponent({

  name: "User_Edit",   // 添加用户

  components:{
      PlusOutlined
  },
  // 接受父组件数据
  props:{
    editdata:{
      type: Object
    }
  },
  setup(props){

      const open = props

        // 表单数据
        const form = reactive({
          // 用户id
          // 会员类型
          // 版本id
          // 昵称
          // 密码
          // 品牌名称
          // 手机号码
          // 角色
          // 部门id
          // 部门名称
          // 会员状态
            name: '',
            url: '',
            owner: '',
            type: '',
            approver: '',
            dateTime: null,
            description: '',
        });

        // 表单验证规则
        const rules = {
            name: [
                {
                required: true,
                message: 'Please enter user name',
                },
            ],
            url: [
                {
                required: true,
                message: 'please enter url',
                },
            ],
            owner: [
                {
                required: true,
                message: 'Please select an owner',
                },
            ],
            type: [
                {
                required: true,
                message: 'Please choose the type',
                },
            ],
            approver: [
                {
                required: true,
                message: 'Please choose the approver',
                },
            ],
            dateTime: [
                {
                required: true,
                message: 'Please choose the dateTime',
                type: 'object',
                },
            ],
            description: [
                {
                required: true,
                message: 'Please enter url description',
                },
            ],
        };

        // 抽屉展开收起
        // const open = props.adddata.open

        const onClose = () => {
            open.editdata.open = false;
        };


        return{
            open,
            form,
            rules,
            onClose
        }
    }

})

</script>