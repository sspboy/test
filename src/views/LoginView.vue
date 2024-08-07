<template>



    <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    style="width: 280px; margin: 14% auto;"
  >
    <div class="logo">LOGO</div>

     <a-divider style="color: darkgray;font-size: 12px;">Hi~你来啦！</a-divider>

    <!--用户名称-->
    <a-form-item has-feedback name="username" class="font_size_12">
      <a-input v-model:value="formState.username" placeholder="输入用户名称" type="name" autocomplete="off" class="font_size_12">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>

    <!--密码-->
    <a-form-item has-feedback name="pass" class="font_size_12">
      <a-input v-model:value="formState.pass" placeholder="输入密码" type="password" autocomplete="off" class="site-form-item-icon font_size_12">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>

    </a-form-item>

    <!--提交按钮-->
    <a-form-item has-feedback>
      <a-button type="primary" html-type="submit" style="width: 100%;" class="font_size_12">登录</a-button>
    </a-form-item>

  </a-form>

</template>


<script>
import { reactive, ref } from 'vue';
import { UserOutlined,LockOutlined} from '@ant-design/icons-vue';

export default {

  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {

    const formRef = ref()

    // 绑定数据：：需要与模版使用数据同名
    const formState = reactive({
      username:'',
      pass: ''
    })

    // 用户名称验证
    const checkusername = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('账户不能为空！');
      } else {
        if (formState.username !== '123') {
          formRef.value.validateFields('name');
          return Promise.reject('账户不存在！');

        }
        return Promise.resolve();
      }
    };

    // 密码验证
    const validatePass = async (_rule, value) => {

      if (value === '') {

        return Promise.reject('密码不能为空');

      } else {
        if (formState.checkPass !== '') {

          formRef.value.validateFields('checkPass');

        }
        return Promise.resolve();
      }
    };


    // 绑定规则方法===需要与form-item标签中的name同名
    const rules = {
        username: [
        {
          required: true,
          validator: checkusername,// 绑定方法
          trigger: 'blur',
        },
      ],
      pass: [
        {
          required: true,
          validator: validatePass,// 绑定方法
          trigger: 'blur',
        },
      ]


    };

    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };

    // 提交成功
    const handleFinish = values => {
      console.log(values, formState);
      // 判断省份
      // if 超级-管理员
        // 路由打开home
      // if 品牌用户
        // 路由打开admin
    };

    // 提交失败
    const handleFinishFailed = errors => {
      console.log(errors);
    };

    // 刷新页面表单状态（清空表单内容）
    // const resetForm = () => {
    //   formRef.value.resetFields();
    // };


    // const handleValidate = (...args) => {
    //   console.log(args);
    // };




    return{
      formRef,
      formState,
      checkusername,
      validatePass,
      rules,
      layout,
      handleFinish,
      handleFinishFailed
    }

  }
};

</script>

<style scoped>
.logo{width: 100px;height: 100px;padding-top: 40px; background-color: aliceblue; margin: 25px auto;border-radius: 6px;text-align: center;}

</style>