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
          name="Add_user_msg"
          ref="formRef"
          :model="formdata"
          :rules="rules"
          layout="vertical"
          class="font_size_12"
          autocomplete="off">

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="账号名称" name="id">
              <a-input v-model:value="formdata.id" class="font_size_12" placeholder="输入名称" type="string" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="密码" name="pass_word">
              <a-input-password v-model:value="formdata.pass_word" class="font_size_12" placeholder="输入密码" type="password" />
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="版本" name="v_id">
              <a-select
                v-model:value="formdata.v_id"
                placeholder="选择版本"
                :options="options"
                :filter-option="filterOption"
                @change="handleChange"
              ></a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="账号类型" name="account_type">
                <a-select v-model:value="formdata.account_type" placeholder="账号类型" class="font_size_12" disabled>
                  <a-select-option value="0">主账号</a-select-option>
                  <a-select-option value="2">后台管理员</a-select-option>
                </a-select>
            </a-form-item>
          </a-col>



        </a-row>


        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="昵称" name="nickname">
              <a-input v-model:value="formdata.nickname" class="font_size_12" placeholder="输入昵称" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="品牌名称" name="brand_name">
              <a-input v-model:value="formdata.brand_name" class="font_size_12" placeholder="输入品牌名称" type="string"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="手机号" name="mobile">
              <a-input type="number" v-model:value="formdata.mobile" class="font_size_12" placeholder="手机号"/>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="角色" name="role">
              <a-input v-model:value="formdata.role" class="font_size_12" type="string" placeholder="账号角色" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>


      <template #footer>
        <a-space>
          <a-button @click="onClose" style="font-size: 12px;">取消</a-button>
          <a-button type="primary" @click="from_submit" style="font-size: 12px;" html-type="submit" :loading="loading">保存</a-button>
        </a-space>
      </template>


  </a-drawer>
</template>


<script>
import {reactive, ref, defineComponent, computed} from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

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
  setup(props,ctx){

    const API = new utils.A_Patch()// 请求接口
    const TO = new TABLE.TableOperate()// 表格操作方法
    const VER = new TABLE.Version()// 版本方法
    const open = props;// 获取父组件传递的
    const formRef = ref() // 表单验证数据绑定ref

    const formdata = computed(()=>{
      return reactive({ // 表单数据绑定
        id:open.adddata.data.id,
        account_type:open.adddata.data.account_type,
        v_id:open.adddata.data.v_id,
        nickname: open.adddata.data.nickname,
        pass_word: '123456',
        brand_name: open.adddata.data.brand_name,
        mobile: open.adddata.data.mobile, // 手机号码
        role: open.adddata.data.role,     // 角色
        }
      )
    })

    const loading = ref(false)// 确认按钮loading

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
        trigger: 'change',
        message: '不能为空',

          // 不能重复 // 不能为汉字 // 不能包含符号 // 判断长度
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
      v_id: [{
        required: true,
        message: '不能为空',
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



    // 选择版本方法 ===> 开始
    const value = ref(undefined);

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };


    const options = ref([]);

    // 请求所有版本
    VER.all_.get_all_ver((res)=>{
      for(let i of res.data){
        var v_obj = {}
        v_obj.value = i.id.toString()
        v_obj.label = i.version_name
        options.value.push(v_obj)
      }
    })

    const handleChange = value => {

      if(value === "1"){  // 后台管理员
        formdata.value.account_type = "2"
        formdata.value.role = 'admin'
      }else { // 品牌主账号
        formdata.value.account_type = "0"
        formdata.value.role = 'admin'
      }

    };
    // 选择版本方法 ===>结束


    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
    };

        // 提交数据
    const from_submit = ()=>{
      // 新建提交
      if(open.adddata.title === '新建用户'){

        fun_add()

      }else if(open.adddata.title === '编辑用户'){// 编辑提交

        fun_update()

      }
    }

    // 【保存方法】获取表单信息
    const fun_add=()=>{

      // 验证表单的全部值
      formRef.value.validate().then(() => {

        loading.value = true;

        // 新建用户接口
        TO.message.url = API.AdminAPI.user.add

        TO.actions.add(formdata.value,(res)=>{

            console.log('新建用户' + res)

            setTimeout(()=>{

              loading.value = false;  // 关闭loading效果

              open.adddata.open = false;  // 收起抽屉

              ctx.emit('add_coallback')   // 回调刷新表格

              formRef.value.resetFields(); // 重置表单

            },2000)

        })

      }).catch(error => {

        console.log('error', error);

      });
    }

    // 提交数据
    const fun_update = ()=>{

      formRef.value.validate().then(() => {

        loading.value = true;

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        // 编辑用户接口
        TO.message.url = API.AdminAPI.user.edit

        TO.actions.update(up_date,(res)=>{

          console.log('编辑用户' + res)

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

          },2000)

        })


      }).catch(error => {

        console.log('error', error);

      });
    }


      return{
        formRef,
        formdata,
        rules,
        open,
        onClose,
        handleChange,
        options,
        from_submit,
        loading,
        value,
        filterOption
      }
    }

})

</script>

<style>
.ant-form-item-explain-error{
    font-size: 12px;
}
.ant-select-selection-item{
  font-size: 12px;
}
.ant-select-selection-placeholder{
    font-size: 12px;
}
</style>