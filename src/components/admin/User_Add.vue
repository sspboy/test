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
          :model="open.adddata.data"
          :rules="rules"
          layout="vertical"
          class="font_size_12"
          autocomplete="off">

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="账号名称" name="id">
              <a-input v-model:value="open.adddata.data.id" class="font_size_12" placeholder="输入名称" type="string" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="密码" name="pass_word">
              <a-input-password v-model:value="open.adddata.data.pass_word" class="font_size_12" placeholder="输入密码" type="password" />
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="版本" name="v_id">
              <a-select
                v-model:value="[]"
                placeholder="选择版本"
                :options="options"
                @change="handleChange"
              ></a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="账号类型" name="account_type">
               <a-input v-model:value="open.adddata.data.account_type" class="font_size_12" placeholder="账号类型" disabled/>
            </a-form-item>
          </a-col>



        </a-row>


        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="昵称" name="nickname">
              <a-input v-model:value="open.adddata.data.nickname" class="font_size_12" placeholder="输入昵称" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="品牌名称" name="brand_name">
              <a-input v-model:value="open.adddata.data.brand_name" class="font_size_12" placeholder="输入品牌名称" type="string"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="手机号" name="mobile">
              <a-input type="number" v-model:value="open.adddata.data.mobile" class="font_size_12" placeholder="手机号"/>
            </a-form-item>
          </a-col>


          <a-col :span="12">
            <a-form-item label="角色" name="role">
              <a-input v-model:value="open.adddata.data.role" class="font_size_12" type="string" placeholder="账号角色" disabled/>
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
import { reactive, ref, defineComponent,toRaw,onMounted,onBeforeUnmount } from 'vue';
import { useStore } from 'vuex'


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

    const store = useStore();// 共享数据
    const open = props;// 获取父组件传递的
    const formRef = ref()
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
        type:'string',
        validator: validateUser, // 绑定方法
        trigger: 'change',
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


    // 【保存方法】获取表单信息
    const from_submit=()=>{

      // 验证表单的全部值
      formRef.value.validate().then(() => {

        loading.value = true;

        // 编辑提交
        // console.log(toRaw(form))
        // 新建提交
        store.dispatch('user/add', toRaw(open.adddata.data)).then(()=>{

          setTimeout(()=>{

              loading.value = false;

              open.adddata.open = false;

              ctx.emit('add_coallback')

              clear_form()// 清除表单历史数据

          },1000)

        })

      }).catch(error => {

        console.log('error', error);

      });
    }

    // 选择版本方法 ===>开始
    const options = ref([
      {value: 0, label: '个人版'},
      {value: 1, label: '企业版'},
      {value: 2, label: '管理后台'},
    ]);

    const handleChange = value => {
      if(value === 2){  // 后台管理员
        open.adddata.data.account_type = 2
        open.adddata.data.role = 'administrator'
      }else {
        open.adddata.data.account_type = 0
        open.adddata.data.role = 'superadmin'
      }
    };
    // 选择版本方法 ===>结束


    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
    };

    // 清除数据
    const clear_form=()=>{
      open.adddata.data.id='';
      open.adddata.data.account_type=0
      open.adddata.data.v_id=[]
      open.adddata.data.nickname=''
      open.adddata.data.pass_word='123456'
      open.adddata.data.brand_name= ''
      open.adddata.data.mobile=''             // 手机号码
      open.adddata.data.role='admin'         // 角色
    }


      return{
        formRef,
        rules,
        open,
        onClose,
        handleChange,
        options,
        from_submit,
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