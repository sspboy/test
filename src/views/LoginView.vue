<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
    style="width: 400px; margin: 10% auto;"
  >

    <a-form-item has-feedback label="账户" name="username">
      <a-input v-model:value="formState.username" type="yyname" autocomplete="off" />
    </a-form-item>

    <a-form-item has-feedback label="密码" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>

    <a-form-item has-feedback label="验证" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>

    <a-form-item has-feedback label="年龄" name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
      <a-button type="primary" html-type="submit">登录</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>

  </a-form>
</template>
<script setup>
import { reactive, ref } from 'vue';

const formRef = ref();

// 绑定数据：：需要与模版使用数据同名
const formState = reactive({
  username:'',
  pass: '',
  checkPass: '',
  age: undefined,
});


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

const checkAge = async (_rule, value) => {
  if (!value) {
    return Promise.reject('Please input the age');
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits');
  } else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18');
    } else {
      return Promise.resolve();
    }
  }
};
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
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};


// 绑定规则===需要与form-item标签中的name同名
const rules = {
    username: [
    {
      required: true,
      validator: checkusername,
      trigger: 'change',
    },
  ],
  pass: [
    {
      required: true,
      validator: validatePass,// 绑定方法
      trigger: 'change',
    },
  ],
  checkPass: [
    {
      validator: validatePass2,
      trigger: 'change',
    },
  ],
  age: [
    {
      validator: checkAge,
      trigger: 'change',
    },
  ],

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
const resetForm = () => {
  formRef.value.resetFields();
};


// const handleValidate = (...args) => {
//   console.log(args);
// };
</script>