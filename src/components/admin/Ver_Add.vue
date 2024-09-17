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

          <a-col :span="12">
            <a-form-item label="价格" name="price">
              <a-input v-model:value="formdata.price" class="font_size_12" placeholder="输入价格" type="number" />
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="16">

          <a-col :span="12">
            <a-form-item label="使用人数" name="sub_account_number">
              <a-input v-model:value="formdata.sub_account_number" class="font_size_12" placeholder="输入版本人数" type="number" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="使用时长" name="duration">
              <a-input v-model:value="formdata.duration" class="font_size_12" placeholder="输入使用多少个月" type="number" />
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
import {defineComponent, reactive, ref, watch, computed} from 'vue';
import {useStore} from "vuex";
import { TreeSelect } from 'ant-design-vue';

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

    const store = useStore();// 共享数据

    const open = props;// 获取父组件传递的

    const formRef = ref() // 表单验证数据绑定ref

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

    const treeData = computed(()=>{
      return reactive(store.state.menu.message.data_list.data)
    })

    const loading = ref(false)

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


    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

    // 关联菜单数据初始化
    let message = {"page":1, "page_size":100}
    store.dispatch('menu/list', message)

    // const treeData = [
    //   {
    //     label: 'Node1',
    //     value: '0-0',
    //     children: [
    //       {
    //         label: 'Child Node1',
    //         value: '0-0-0',
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Node2',
    //     value: '0-1',
    //     children: [
    //       {
    //         label: 'Child Node3',
    //         value: '0-1-0',
    //         disabled: true,
    //       },
    //       {
    //         label: 'Child Node4',
    //         value: '0-1-1',
    //       },
    //       {
    //         label: 'Child Node5',
    //         value: '0-1-2',
    //       },
    //     ],
    //   },
    // ];


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

            ctx.emit('menu_add_coallback')   // 回调刷新表格

            formRef.value.resetFields(); // 重置表单

          },1000)

        }).catch(error => {

          console.log('error', error);

        });

      })

    }




    return {
      open,
      store,
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