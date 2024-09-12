<template>
  <a-drawer
      :title="open.editdata.title"
      :width="720"
      :open="open.editdata.open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
      <a-form
          name="user_edit"
          :model="formdata"
          ref="formRef"
          layout="vertical"
          :rules="rules"
          autocomplete="off">

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="账号名称" name="id" ref="id">
              <a-input v-model:value="formdata.id" placeholder="输入账号名称" class="font_size_12"/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="昵称" name="nickname">
              <a-input v-model:value="formdata.nickname" placeholder="输入昵称" class="font_size_12"/>
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="版本号" name="v_id">
              <a-select v-model:value="formdata.v_id" placeholder="选择版本" @change="handleChange">
                <a-select-option value="0">个人版本</a-select-option>
                <a-select-option value="1">企业版</a-select-option>
                <a-select-option value="2">管理后台</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="账号类型" name="account_type">
              <a-select v-model:value="formdata.account_type" disabled>
                <a-select-option value="0">品牌账号</a-select-option>
                <a-select-option value="1">子账号</a-select-option>
                <a-select-option value="2">后台管理员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


        </a-row>
        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="密码" name="pass_word">
              <a-input v-model:value="formdata.pass_word" class="font_size_12"/>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="品牌名称" name="brand_name">
              <a-input v-model:value="formdata.brand_name" placeholder="选择品牌名称" class="font_size_12"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="手机号" name="mobile">
              <a-input v-model:value="formdata.mobile" placeholder="Please enter user name" class="font_size_12"/>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="角色" name="role">
              <a-input v-model:value="formdata.role" placeholder="Please enter user name" class="font_size_12" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>


      <template #footer>
        <a-space style="float: left;">
          <a-button type="primary" @click="form_submit" html-type="submit" class="font_size_12" :loading="loading">保存</a-button>
          <a-button @click="onClose" style="font-size: 12px;">取消</a-button>
        </a-space>
      </template>


  </a-drawer>
</template>


<script>
import {defineComponent, ref, reactive, computed} from 'vue';
import { useStore } from 'vuex'


export default defineComponent({

  name: "User_Edit",   // 用户编辑
  components:{
  },
  // 接受父组件数据
  props:{
    editdata:{
      type: Object
    }
  },
  setup(props, ctx){

    const loading = ref(false)// 确认按钮loading
    const open = props
    const store = useStore();// 共享数据
    const formRef = ref()// 表单验证绑定

    // 表单数据绑定
    const formdata = computed(()=> {
      return reactive({
        id:open.editdata.data.id,
        account_type:open.editdata.data.account_type,
        v_id:open.editdata.data.v_id,
        nickname: open.editdata.data.nickname,
        pass_word:open.editdata.data.pass_word,
        brand_name:open.editdata.data.brand_name,
        mobile:open.editdata.data.mobile,// 手机号码
        role:open.editdata.data.role,// 超管
        })
    })


    // 验证用户名方法
    const validateUser = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('账号id不能为空');

      } else {

        if (value.length>12) {

          return Promise.reject('id过长不能超过12个字符');

        }
        return Promise.resolve();
      }

    }

    // 验证品牌名方法
    const validateBrandname = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('不能为空');

      } else {

        if (value.length>12) {

          return Promise.reject('品牌名过长不能超过12个字符');

        }

        return Promise.resolve();

      }

    }

    // 验证手机号方法
    const validateMobile = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('不能为空');

      } else {

        if (value.length !== 11) {

          return Promise.reject('手机号码11位数字');
        }

        return Promise.resolve();

      }

    }

    // 验证昵称方法
    const validatenickname = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('不能为空');

      } else {

        if (value.length > 6) {

          return Promise.reject('昵称不能超过6个字符或汉字');
        }

        return Promise.resolve();

      }
    }

    // 表单验证规则
    const rules = {
      // 用户id
      id: [{
        required: true,
        type:'string',
        validator: validateUser, // 绑定方法
        trigger: ['change', 'blur'],
          // 不能重复 // 不能为汉字 // 不能包含符号 // 判断长度
      }],
      // 用户id
      v_id: [{
        required: true,
        trigger: 'change'
      }],
      // 会员类型
      account_type: [{
        required: true,
        message: '不能为空',
      }],
      nickname: [{
        required: true,
        validator:validatenickname,
        trigger: 'change'
        },
      ],
      pass_word: [{
        required: true,
        message: '不能为空',
      },
      ],
      brand_name: [{
        required: true,
        validator: validateBrandname, // 绑定方法
        trigger: 'change',
        },
      ],
      mobile: [{
        required: true,
        validator:validateMobile,
        trigger: 'change',
      },
      ],
      role: [{
            required: true,
            message: '不能为空',
        },
      ]
    };

    // 监听版本变更账号类型
    const handleChange=(value)=>{

      if(value == "2"){  // 后台管理员

        formdata.value.account_type = "2"
        formdata.value.role = 'administrator'

      }else {

        formdata.value.account_type = "0"
        formdata.value.role = 'superadmin'
      }
    }

    // 关闭抽屉
    const onClose = () => {
      open.editdata.open = false;
      open.editdata.data = ''// 清除组件数据缓存
    };

    // 提交数据
    const form_submit = ()=>{

      formRef.value.validate().then(() => {

        loading.value = true;

        const up_date = {

          user_id:open.editdata.data.id,

          setting_data:formdata.value

        }

        // 新建提交
        store.dispatch('user/update', up_date).then(()=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.editdata.open = false;  // 收起抽屉

            ctx.emit('edit_coallback')   // 回调刷新表格

          },2000)

        })

      }).catch(error => {

        console.log('error', error);

      });
    }


    return{

      handleChange,
      open,
      formRef,
      formdata,
      rules,
      onClose,
      form_submit,
      loading
    }
    }

})

</script>

<style>
// 表单input文字大小
.ant-input{font-size: 12px;}
.ant-form-item-explain-error{font-size: 12px;}
.ant-select-selection-item{font-size: 12px;}
.ant-select-selection-placeholder{font-size: 12px;}
</style>