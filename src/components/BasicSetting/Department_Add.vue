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
                tree-data-simple-mode
                allow-clear
                style="width: 100%"
                :tree-data="treeData"
                placeholder="选择部门"
                :load-data="onLoadData"
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
import {Depart} from "@/assets/JS_Model/department";

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

    const store = useStore();// 共享数据

    const open = props;

    const formRef = ref()

    const formdata = computed(()=>{
      return reactive({
        id:undefined,
        b_id:undefined,
        name:undefined,
        parent_id:undefined
      })
    })

    const loading = ref(false)

    const treeData = computed(()=>{

       const d_list = reactive([])

      // 部门选择下拉赋值==当前品牌所有部门id、名称
      var D = new Depart()

      D.all_.get_all_department((res)=>{

        for(let i of res.data){
          let r_obj = {}
          r_obj.title = i.name
          r_obj.value = i.id
          r_obj.id = i.id
          r_obj.p_id = i.parent_id
          r_obj.isLeaf= false
          // 判断是否有下级部门
          if(i.parent_id == '0'){d_list.push(r_obj)} // 一级部门
        }

      })

      return d_list

    })

    const genTreeNode = (parentId, isLeaf = false) => {
      const random = Math.random().toString(36).substring(2, 6);
      return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf,
      };
    };

    const onLoadData = treeNode => {
      return new Promise(resolve => {
        const { id } = treeNode.dataRef;
        setTimeout(() => {
          // 合并数组
          treeData.value.push(genTreeNode(id, false));
          treeData.value.push(genTreeNode(id, true));
          treeData.value.push(genTreeNode(id, true));
          console.log(treeData.value);

          resolve(true);

          }, 300);
      });
    };


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
      formdata,
      treeData,
      onLoadData,
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