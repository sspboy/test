<template>

    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >
        <p>{{ props.data.data }}</p>
            <a-cascader
              v-model:value="value"
              :options="options"
              :load-data="loadData"
              placeholder="Please select"
              change-on-select
            />
      </a-modal>
    </div>




</template>

<script>
import { defineComponent,ref } from 'vue';

export default defineComponent({

    name: "Edit_class",  // 功能添加
    // 引用组件
    components: {



    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        // console.log(props.data)

        const modalText = ref('编辑标题');
        const open = ref(false);
        const confirmLoading = ref(false);
        const showModal = () => {
            open.value = true;
        };
        const handleOk = () => {
            modalText.value = 'The modal will be closed after two seconds';
            confirmLoading.value = true;
            setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
            }, 2000);
        };
    
        const options = ref([
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false,
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false,
        },
      ]);
        const loadData = selectedOptions => {
          const targetOption = selectedOptions[selectedOptions.length - 1];
          targetOption.loading = true;

          // load options lazily
          setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
              {
                label: `${targetOption.label} Dynamic 1`,
                value: 'dynamic1',
              },
              {
                label: `${targetOption.label} Dynamic 2`,
                value: 'dynamic2',
              },
            ];
            options.value = [...options.value];
          }, 1000);
        };
        const value = ref([]);
    
    return {
        props,
        modalText,
        open,
        confirmLoading,
        showModal,
        handleOk,
        options,
        loadData,
        value
        }
    }


})

</script>