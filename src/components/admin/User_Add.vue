<template>
  <a-drawer
      title="新建"
      :width="720"
      :open="open.adddata.open"
      :body-style="{ paddingBottom: '80px',}"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
      <a-form
          ref="formRef"
          name="Add_user_msg"
          :model="form"
          :rules="rules"
          layout="vertical"
          class="font_size_12"
          autocomplete="off">

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="账号名称" name="id">
              <a-input v-model:value="form.id" class="font_size_12" placeholder="输入名称" type="string" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="密码" name="password">
              <a-input-password v-model:value="form.password" class="font_size_12" placeholder="输入密码" type="password" />
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="版本" name="version">
              <a-select
                v-model:value="form.version"
                show-search
                :placeholder="form.version"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="账号类型" name="account_type">
               <a-input v-model:value="form.account_type" class="font_size_12" placeholder="账号类型" disabled/>
            </a-form-item>
          </a-col>



        </a-row>


        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="昵称" name="nickname">
              <a-input v-model:value="form.nickname" class="font_size_12" placeholder="输入昵称" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="品牌名称" name="brand_name">
              <a-input v-model:value="form.brand_name" class="font_size_12" placeholder="输入品牌名称" type="string"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="手机号" name="mobile">
              <a-input v-model:value="form.mobile" class="font_size_12" placeholder="手机号"/>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="角色" name="role">
              <a-input v-model:value="form.role" class="font_size_12" type="string" placeholder="账号角色" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="部门id" name="department_id">
              <a-input v-model:value="form.department_id" placeholder="Please enter user name" type="number"/>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="部门名称" name="department">
              <a-input v-model:value="form.department" placeholder="Please enter user name" type="string"/>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>


      <template #extra>
        <a-space>
          <a-button @click="onClose" style="font-size: 12px;" size="small">取消</a-button>
          <a-button type="primary" @click="from_get" style="font-size: 12px;" size="small" html-type="submit">保存</a-button>
        </a-space>
      </template>


  </a-drawer>


    
</template>


<script>
import { reactive, ref, defineComponent,toRaw } from 'vue';


export default defineComponent({

  name: "User_Add",   // 添加用户

  components:{
  },
  // 接受父组件数据
  props:{
    adddata:{
      type: Object
    }
  },
  setup(props){


      const open = props;
      const formRef = ref()

      // 表单数据初始化
      const form = reactive({
        id:'',
        account_type:0,
        version:'个人版',
        nickname: '',
        password: '123456',
        brand_name: '',
        mobile: '',             // 手机号码
        role: 'admin',         // 角色
        department_id: '',     // 部门id
        department: '',        // 部门名称
      });

      // 表单验证规则
      const rules = {
        id: [{
            required: true,
            message: '不能为空',
            }],
        account_type: [{
            required: true,
            message: '不能为空',
            }],
        version:[{
              required: true,
              message: '版本号不能为空',
        }],
          nickname: [
              {
              required: true,
              message: '昵称不能为空',
              },
          ],
          password: [
              {
              required: true,
              message: '密码不能为空',
              },
          ],
          brand_name: [
              {
              required: true,
              message: '品牌名称不能为空',
              },
          ],
          mobile: [
              {
              required: true,
              message: '手机号不能为空',
              },
          ],
          role: [
              {
              required: true,
              message: '角色不能为空',
              },
          ],
          department_id: [
              {
              required: false,
              message: '',
              },
          ],
          department: [
              {
              required: false,
              message: '',
              },
          ],
      };

      // 关闭抽屉方法
      const onClose = () => {
          open.adddata.open = false;
      };

      // 【保存方法】获取表单信息
      const from_get=()=>{


        console.log(form)
        // 验证表单的全部值
        formRef.value.validate().then(() => {

            console.log('values', form, toRaw(form));

        }).catch(error => {

          console.log('error', error);

        });
      }


      // 选择版本方法 ===>开始
      const options = ref([
        {
          value: 'jack',
          label: '个人版',
        },
        {
          value: 'lucy',
          label: '企业版',
        },
        {
          value: 'tom',
          label: '管理后台',
        },
      ]);

      const handleChange = value => {
        console.log(`selected ${value}`);
      };
      const handleBlur = () => {
        console.log('blur');
      };
      const handleFocus = () => {
        console.log('focus');
      };
      const filterOption = (input, option) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };
      const value = ref(undefined);
      // 选择版本方法 ===>结束




      return{
        formRef,
        form,
        rules,
        open,
        onClose,
        handleChange,
        handleBlur,
        handleFocus,
        filterOption,
        value,
        options,
        from_get,
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