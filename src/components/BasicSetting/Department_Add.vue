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
            <a-form-item label="部门名称" name="name">
              <a-input v-model:value="formdata.name" class="font_size_12" placeholder="输入名称" type="string" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="上级部门" name="parent_id">
              <a-tree-select
                v-model:value="formdata.parent_id"
                allow-clear
                style="width: 100%"
                :tree-data="treeData"
                placeholder="选择部门"
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
import {Depart} from "@/assets/JS_Model/TableOperate";
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

export default defineComponent({
  // 模版名称
  name: "Department_Add",
  // 引用组件
  components: {},
  // 父组件数据
  props: {
    adddata:{typr:Object}
  },
  // 组合API返回到模版
  setup(props,ctx) {
    // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();// 共享数据
    const open = props;
    const formRef = ref()

    const formdata = computed(()=>{
      return reactive({
        id:open.adddata.data.id,
        b_id:open.adddata.data.b_id,
        name:open.adddata.data.name,
        parent_id:open.adddata.data.parent_id
      })
    })

    const loading = ref(false)

    const treeData = computed(()=>{

      const d_list = reactive([])

      // 部门选择下拉赋值==当前品牌所有部门id、名称
      var D = new Depart()

      D.all_.get_all_department((res)=>{
        var r_list = []
        for(let i of res.data){
          let r_obj = {}
          r_obj.title = i.name
          r_obj.value = i.id
          r_obj.id = i.id
          r_obj.parent_id = i.parent_id
          // 判断是否有下级部门
          r_list.push(r_obj) // 一级部门
        }

        var resd = D.Table_List.get_tree(r_list)

        resd.forEach(item=>{d_list.push(item)})

      })

      return d_list

    })

    // 验证规则
    const rules={
      // 菜单名称
      name: [{
        required: true,
        message: '不能为空',
      }],
      parent_id: [{
        required: false
      }]
    }

    // 提交数据
    const from_submit = ()=>{
      // 新建提交
      if(open.adddata.title === '添加部门'){

        fun_add_()

      // 编辑提交
      }else if(open.adddata.title === '编辑部门'){

        fun_update()

      }
    }

    // 添加数据方法
    const fun_add_ = () => {

      formRef.value.validate().then(() => {

        loading.value = true;

        TO.message.url = API.BasicsAPI.department.add

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
        TO.message.url = API.BasicsAPI.department.edit

        TO.actions.update(up_date,(res)=>{

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

    // 关闭抽屉方法
    const onClose = () => {
        open.adddata.open = false;
        formRef.value.resetFields(); // 重置表单
        open.adddata.data = ''// 清除数据
    };

    return {
      open,
      formdata,
      treeData,
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

</style>