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
          name="Add_ver"
          ref="formRef"
          :model="formdata"
          :rules="rules"
          layout="vertical"
          class="font_size_12"
          autocomplete="off">

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="版本号" name="version_number">
              <a-input v-model:value="formdata.version_number" class="font_size_12" placeholder="输入版本号" type="number" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="版本名称" name="version_name">
              <a-input v-model:value="formdata.version_name" class="font_size_12" placeholder="输入名称" type="text" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="价格" name="price">
              <a-input v-model:value="formdata.price" class="font_size_12" placeholder="输入价格" type="number" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="使用人数" name="sub_account_number">
              <a-input v-model:value="formdata.sub_account_number" class="font_size_12" placeholder="输入版本人数" type="number" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="使用时长" name="duration">
              <a-input v-model:value="formdata.duration" class="font_size_12" placeholder="输入使用多少个月" type="number" />
            </a-form-item>
          </a-col>


        </a-row>
          <a-col :span="24">
            <a-form-item label="关联菜单" name="menu_setting">
                <a-tree-select
                  v-model:value="formdata.menu_setting"
                  style="width: 100%"
                  :tree-data="treeData"
                  tree-checkable
                  allow-clear
                  :show-checked-strategy="SHOW_PARENT"
                  placeholder="选择版本关联的菜单功能"
                  tree-node-filter-prop="label"
                />
            </a-form-item>
          </a-col>
        <a-row :gutter="16">


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
import { TreeSelect } from 'ant-design-vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';

export default defineComponent({
  // 菜单添加
  name: "Ver_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {
    adddata:{
      type:Object
    }
  },
  // 组合API返回到模版
  setup(props, ctx) {

    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const open = props;                   // 获取父组件传递的
    const formRef = ref()                 // 表单验证数据绑定ref

    // 表单数据绑定
    const formdata = computed(()=>{
      return reactive({
        version_number:open.adddata.data.version_number,
        version_name:open.adddata.data.version_name,
        menu_setting:open.adddata.data.menu_setting,
        price:open.adddata.data.price,
        sub_account_number:open.adddata.data.sub_account_number,
        duration:open.adddata.data.duration,
      })
    })


    // 按钮等待效果
    const loading = ref(false)

    // 表单验证规则
    const rules={

        version_number:[{
          required: true,
          trigger: 'change',
          message: '不能为空',
        }],
        version_name:[{
          required: true,
          trigger: 'change',
          message: '不能为空',
        }],
        menu_setting:[{
          required: true,
          trigger: 'change',
          message: '不能为空',
        }],
        price:[{
          required: true,
          trigger: 'change',
          message: '不能为空',
        }],
        sub_account_number:[{
          required: true,
          trigger: 'change',
          message: '不能为空',
        }],
        duration:[{
          required: true,
          trigger: 'change',
          message: '不能为空',
        }],
    }

    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
        open.adddata.data = ''// 清除数据
    };

    // 树状菜单回填方法SHOW_ALL=全部节点回填（含父节点）；SHOW_PARENT=只回填父节点
    const SHOW_PARENT = TreeSelect.SHOW_ALL;
    
    // 关联菜单树状数据
    const treeData = reactive([])

    // 关联菜单数据初始化
    let message = {"page":1, "page_size":100}

    // 请求接口地址赋值
    TO.message.url = API.AdminAPI.menu.list
    TO.actions.list(message,(res)=>{
      TO.menu.add_colum(res)        // 添加表头
      for(let i of res.data){
        treeData.push(i)
      }
    })


    // 提交数据
    const from_submit = ()=>{
      // 新建提交
      if(open.adddata.title === '添加版本'){

        fun_add_()

      }else if(open.adddata.title === '编辑版本'){// 编辑提交

        fun_update()

      }
    }


    // 添加数据方法
    const fun_add_ = () => {

      formRef.value.validate().then(() => {

        loading.value = true;

        TO.message.url = API.AdminAPI.version.add

        TO.actions.add(formdata.value,(res)=>{

          setTimeout(()=>{

            loading.value = false;  // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

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

        const up_date = {

          id:open.adddata.data.id,

          setting_data:formdata.value

        }

        // 编辑用户接口
        TO.message.url = API.AdminAPI.version.edit

        TO.actions.update(up_date,(res)=>{
          
          setTimeout(()=>{

            loading.value = false;      // 关闭loading效果

            open.adddata.open = false;  // 收起抽屉

            ctx.emit('add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

            },1000)

        })

        }).catch(error => {

          console.log('error', error);

        });

    }


    return {
      open,
      treeData,
      formdata,
      formRef,
      rules,
      onClose,
      SHOW_PARENT,
      from_submit,
      loading
    }
  }


})
</script>

<style>

</style>