<template>
    <div>
      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" width="100%" wrap-class-name="full-modal" @ok="handleOk" >
        <a-row>
          <a-col :span="8">
            <a-table 
            :columns="pic_columns" 
            :data-source="pic_data" 
            :row-selection="{ selectedRowKeys: pic_fun.state.selectedRowKeys, onChange: pic_fun.onSelectChange }"
            size="small" 
            :pagination="false" 
            :scroll="{ x: 'calc(700px + 50%)', y: 'calc(100)' }" 
            style="font-size: 12px;margin:0 4px 0 0;" 
            bordered>
                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                  </template>
                </template>
                <template #title>
                  商品主图-最多五张
                </template>
                
                <template #footer>
                  <a-button 
                  type="primary" 
                  size="small" 
                  :disabled="!pic_fun.has_Selected.value" 
                  :loading="pic_fun.state.loading"
                  style="font-size: 12px;"
                  @click="pic_fun.start">
                  批量操作
                </a-button>
                </template>
              </a-table>
          </a-col>


          <a-col :span="8">
            
            <a-table 
            :row-selection="{ selectedRowKeys: sku_fun.state.selectedRowKeys, onChange: sku_fun.onSelectChange }"
            :columns="sku_columns" 
            :data-source="sku_data" 
            size="small" 
            :pagination="false" 
            :scroll="{ x: 'calc(700px + 50%)', y: 'calc(100)' }" 
            style="font-size: 12px;margin:0 2px;" 
            bordered>

                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                  </template>
                </template>
                <template #title>规格图</template>

                <template #footer>
                  <a-button 
                  type="primary" 
                  size="small" 
                  :disabled="!sku_fun.has_Selected.value" 
                  :loading="sku_fun.state.loading"
                  style="font-size: 12px;"
                  @click="sku_fun.start">
                  批量操作</a-button>
                </template>
            
              </a-table>
          </a-col>


          <a-col :span="8">            
            <a-table
            :row-selection="{ selectedRowKeys: des_fun.state.selectedRowKeys, onChange: des_fun.onSelectChange }"
            :columns="des_columns" 
            :data-source="des_data"
            size="small" 
            :pagination="false" 
            :scroll="{ y: 'calc(100)' }" 
            style="font-size: 12px;margin:0 0 0 4px;" 
            bordered>
                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                  </template>
                </template>
                <template #title>描述图</template>
                <template #footer>
                  <a-button 
                  type="primary" 
                  size="small" 
                  :disabled="!des_fun.has_Selected.value" 
                  :loading="des_fun.state.loading"
                  style="font-size: 12px;"
                  @click="des_fun.start">
                  批量操作</a-button>
                </template>
              </a-table>
          </a-col>

        </a-row>
      </a-modal>
    </div>
</template>


<script>
import { defineComponent,ref,computed,reactive } from 'vue';
export default defineComponent({

    name: "Edit_upload_image",  // 功能添加
    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

      // 规格值初始化
      const item_data = computed(()=>{
        const product_data = JSON.parse(props.data.data)
        console.log(product_data)
        return reactive({
      
          obj:JSON.parse(props.data.data)
      
        });
      
      })

      const pic_columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: '状态',
          className: 'up_state',
          dataIndex: 'up_state',
        },
        {
          title: 'Cash Assets',
          className: 'column-money',
          dataIndex: 'money',
        },
        {
          title: '素材地址',
          className: 'sucai_add',
          dataIndex: 'sucai_add',
        },
        {
          title: '素材id',
          className: 'sucai_id',
          dataIndex: 'sucai_id',
        },
        {
          title: '所属文件夹',
          className: 'm_id',
          dataIndex: 'm_id',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      const pic_data = [
        {
          key: '1',
          name: 'John Brown',
          money: '￥300,000.00',
          up_state:'已上传',
          sucai_add:'123',
          sucai_id:'123',
          m_id:'123',
          address: 'New York No.',
        },
        {
          key: '2',
          name: 'Jim Green',
          money: '￥1,256,000.00',
          up_state:'已上传',
          sucai_add:'123',
          sucai_id:'123',
          m_id:'123',
          address: 'London No. ',
        },
        {
          key: '3',
          name: 'Joe Black',
          money: '￥120,000.00',
          up_state:'已上传',
          sucai_add:'123',
          sucai_id:'123',
          m_id:'123',
          address: 'Sidney No. ',
        },
      ];



      const sku_columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Cash Assets',
          className: 'column-money',
          dataIndex: 'money',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        ];
        const sku_data = [
        {
          key: '1',
          name: 'John Brown',
          money: '￥300,000.00',
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          money: '￥1,256,000.00',
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          money: '￥120,000.00',
          address: 'Sidney No. 1 Lake Park',
        },
      ];



      const des_columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Cash Assets',
          className: 'column-money',
          dataIndex: 'money',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        ];
      const des_data = [
        {
          key: '1',
          name: 'John Brown',
          money: '￥300,000.00',
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          money: '￥1,256,000.00',
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          money: '￥120,000.00',
          address: 'Sidney No. 1 Lake Park',
        },
      ];

      // 主图批量操作===开始
      const pic_fun = {
        // 初始数据集
        state:reactive({
          selectedRowKeys: [],
          loading: false,
        }),
        // 按钮状态
        has_Selected:computed(() => pic_fun.state.selectedRowKeys.length > 0),
        // 监听方法
        onSelectChange:selectedRowKeys => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          pic_fun.state.selectedRowKeys = selectedRowKeys;
        },
        // 点击按钮方法
        start:() => {
          pic_fun.state.loading = true;
          // ajax request after empty completing
          setTimeout(() => {
            pic_fun.state.loading = false;
            pic_fun.state.selectedRowKeys = [];
          }, 1000);
        }
      }
      // 主图批量操作===结束

      // 规格图批量操作===开始
      const sku_fun = {
        // 初始数据集
        state:reactive({
          selectedRowKeys: [],
          loading: false,
        }),
        // 按钮状态
        has_Selected:computed(() => sku_fun.state.selectedRowKeys.length > 0),
        // 监听方法
        onSelectChange:selectedRowKeys => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          sku_fun.state.selectedRowKeys = selectedRowKeys;
        },
        // 点击按钮方法
        start:() => {
          sku_fun.state.loading = true;
          // ajax request after empty completing
          setTimeout(() => {
            sku_fun.state.loading = false;
            sku_fun.state.selectedRowKeys = [];
          }, 1000);
        }
      }
      // 规格图批量操作===结束

      // 描述图==开始
      const des_fun = {
        // 初始数据集
        state:reactive({
          selectedRowKeys: [],
          loading: false,
        }),
        // 按钮状态
        has_Selected:computed(() => des_fun.state.selectedRowKeys.length > 0),
        // 监听方法
        onSelectChange:selectedRowKeys => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          des_fun.state.selectedRowKeys = selectedRowKeys;
        },
        // 点击按钮方法
        start:() => {
          des_fun.state.loading = true;
          // ajax request after empty completing
          setTimeout(() => {
            des_fun.state.loading = false;
            des_fun.state.selectedRowKeys = [];
          }, 1000);
        }
      }
      // 描述图==结束


      // console.log(props.data)

      const confirmLoading = ref(false);

      const handleOk = () => {
          confirmLoading.value = true;
          setTimeout(() => {
            confirmLoading.value = false;
          }, 2000);
      };
    
    
    
    return {
        props,
        confirmLoading,
        handleOk,

        pic_columns,
        pic_data,

        sku_columns,
        sku_data,

        des_columns,
        des_data,

        pic_fun,
        sku_fun,
        des_fun

        }
    }


})
  
  </script>
<style lang="less">
  
th.column-money,
td.column-money {
    text-align: right !important;
  }

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
