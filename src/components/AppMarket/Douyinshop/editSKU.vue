<template>

    <div>

      <a-modal v-model:open="props.data.open" width="800px" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm">

          <a-form-item 
            v-for="(spec, spec_index) in dynamicValidateForm.obj" 
            :name="['obj', spec_index, 'name']" 
            :key="spec.id" 
            :rules="{required: true,trigger: 'change', message:''}"
            >
                <!--规格名称 开始-->
                <a-input 
                v-model:value="spec.name"
                size="small" 
                placeholder="输入规格名称" 
                style="width: 200px;" 
                autocomplete="off"
                allow-clear />
                
                <a-button type="dashed" size="small" class="add_btn_class" block @click="addspecvalue(spec_index)">
                  <PlusOutlined />
                </a-button>

                <a-button type="dashed" size="small" class="add_btn_class" block @click="removeSpec(spec,spec_index)">
                  <MinusOutlined />
                </a-button>
                <!--规格名称 结束-->

                <!--规格值 开始-->
                <div style="width: 100%;clear: both; margin:4px 0 0 0;">

                  <a-space v-for="(user, spec_value_index) in spec.value" :key="user.id" style="margin:2px 4px 0 0;" align="baseline" >
                        
                    <a-form-item v-if="spec_index === 0" :name="['obj', spec_index, 'value', spec_value_index, 'value',]" :rules="{required: true, trigger: 'change', message:''}">

                      <div style="width: 200px;margin: 10px 0 4px 0;">
                        <a-input v-model:value="user.value" 
                        placeholder="输入值" 
                        size="small" 
                        style="font-size: 12px;margin:0 0 6px 0;" 
                        autocomplete="off"
                        allow-clear/>
                      </div>

                      <span v-if="user.img === undefined || user.img === ''">
                        <span style="width: 42px;margin-top: 5px;height: 42px;display: block;border:1px #f2f2f2 solid;border-radius:4px;float: left;">
                          <a-skeleton-avatar :active="false" size="large" shape="avatarShape" class="cursor"/>
                        </span>
                      </span>

                      <span v-else-if="user.img != undefined" style="float: left;">
                        <a-image style="border-radius:4px;margin-top: 5px;" :width="42" :height="42" :src="user.img"/>
                      </span>
                      <a-form-item>
                      <a-textarea 
                      placeholder="输入规格图片地址" 
                      v-model:value="user.img" 
                      size="small"
                      autocomplete="off"
                      :auto-size="{ minRows: 2, maxRows: 2 }" 
                      allow-clear
                      style="font-size:12px;margin:0 0 0 6px;width: 150px;"
                      />
                    </a-form-item>
                    </a-form-item>



                    <a-form-item v-if="spec_index != 0" :name="['obj', spec_index, 'value', spec_value_index, 'value',]" :rules="{required: true, trigger: 'change', message:''}">
                      <a-input 
                      v-model:value="user.value" 
                      placeholder="输入值" 
                      size="small"
                      autocomplete="off"
                      style="font-size: 12px;width: 200px;" 
                      allow-clear/>
                    </a-form-item>

                    <MinusCircleOutlined @click="remove_spec_value(user, spec_index)" style="margin: 0 5px 0 0;" />

                  </a-space>

                </div>
                <!--规格值 结束-->


        </a-form-item>
          

        <a-form-item>
          <a-button type="dashed" @click="addspec" size="middle">添加规格</a-button>
        </a-form-item>

      </a-form>

      <a-form ref="skulistRef" :model="sku_list" name="basic">
      <a-table :columns="sku_list.columns" :data-source="sku_list.data" :pagination="false" style="font-size: 12px;" size="small" bordered>
        
        <template #bodyCell="{ column, text, record, index }">
          
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>

          <template v-if="column.dataIndex === 'price'">
            <a-form-item :name="['data', index, 'price']" :rules="{required: true, trigger: 'change', message:''}">
              <a-input-number 
              placeholder="输入价格" 
              size="small" 
              v-model:value="record.price" 
              prefix="￥" :min="0" 
              :step="0.01"
              autocomplete="off"
              allow-clear
              style="font-size: 12px;width: 100%;"/>
            </a-form-item>
          </template>

          <template v-if="column.dataIndex === 'stock_num'">
            <a-form-item :name="['data', index, 'stock_num']" :rules="{required: true, trigger: 'change', message:''}">
              <a-input-number 
              placeholder="输入库存" 
              size="small" 
              v-model:value="record.stock_num" 
              :min="0" 
              autocomplete="off"
              allow-clear
              style="font-size: 12px;"/>
            </a-form-item>
          </template>
          
          <template v-if="column.dataIndex === 'code'">
            <a-input 
            placeholder="商家编码"
            autocomplete="off"
            v-model:value="record.code" 
            size="small" 
            style="font-size: 12px;" />
          </template>
          
        </template>
        <!-- <template #title>规格列表</template>
        <template #footer>Footer</template> -->
      
      </a-table>
    </a-form>

      </a-modal>
    </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { defineComponent,ref,reactive,computed } from 'vue';
import { MinusCircleOutlined, PlusOutlined,MinusOutlined } from '@ant-design/icons-vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

/**js组件方法*/
import * as tool from '@/assets/JS_Model/tool';

export default defineComponent({

    name: "Edit_SKU",  // 功能添加
    // 引用组件
    components: {
      MinusCircleOutlined,
      PlusOutlined,
      MinusOutlined
    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

      const API = new utils.A_Patch()       // 请求接口地址合集
      const TO = new TABLE.TableOperate()   // 表格操作方法
      const t = new tool.TOOL()// 公用方法
      const confirmLoading = ref(false);
      const formRef = ref();
      const skulistRef = ref();

      // 规格值-->构造表
      const dynamicValidateForm = computed(()=>{

        // 数据id
        var obj_id = props.data.id;
        
        // 添加spec—id
        var spec_obj = JSON.parse(props.data.data)
        for(let i = 0;i<spec_obj.length;i++){
          spec_obj[i]['id'] = i
        }

        return reactive({
          id:obj_id,
          obj:spec_obj
        });

      })


      // 根据规格-->构造规格列表
      const sku_list = computed(()=>{
        
        // 提取sku的name数组
        var get_name_sku_list = () =>{
          var name_list = []
          var datalist = dynamicValidateForm.value.obj;
          for(let i of datalist){
            name_list.push(i.name)
          }
          return name_list
        }

        // 提取-初始情况下-sku_价格、库存
        var get_p_s_obj = () => {

            var res_obj = {}
            for(let i of dynamicValidateForm.value.obj){
                for(let y of i.value){if(y.price != undefined){
                    var p_s_obj = {}
                    p_s_obj.price = y.price
                    p_s_obj.stock = y.stock_num
                    res_obj[y.value] = p_s_obj
                }}
            }
            return res_obj


        }

        // 规格表单p价格、s库存、c商家编码对照对象
        var get_p_s_c_data = () =>{

          var res_data = {}// 对照表
          
          var data_list = JSON.parse(props.data.sku_list).data

          for(let i of data_list){
            var p_s_c_obj = {}
            // console.log(i)
            // 名称字符串
            p_s_c_obj.price = i.price;// 价格
            p_s_c_obj.stock_num = i.stock_num + '';// 库存
            p_s_c_obj.code = i.code; // 商家编码
            delete i.price
            delete i.stock_num
            delete i.code
            var name_list = []
            for(let key in i){name_list.push(i[key])}
            var name = name_list.join('')
            res_data[name] = p_s_c_obj
          }

          // console.log(res_data)

          return res_data

        }
        
        // 笛卡尔积方法sku_value数组取值
        var get_value_sku_list= () =>{
          
          var res_list = []

          var datalist = dynamicValidateForm.value.obj;
          
          // 规格取值
          for(let i of datalist){
            var v_list = []
            for(let y of i.value){
              v_list.push(y.value)
            }
            res_list.push(v_list)
          }

          // 笛卡尔积方法
          var d_list = t.Fun_.cartesianProduct(res_list)

          return d_list

        }

        // comlum取值
        var get_colums = () =>{
          var name_list = get_name_sku_list()
          var res_list = []
          for(let i of name_list){
            let c_obj = {}
            c_obj.title = i;
            c_obj.dataIndex = i;
            res_list.push(c_obj)
          }

          let price_obj = {title:'价格',dataIndex:'price'}
          let stock_num_obj = {title:'库存',dataIndex:'stock_num'}
          let code_obj = {title:'编码',dataIndex:'code'}
          res_list.push(price_obj)
          res_list.push(stock_num_obj)
          res_list.push(code_obj)
          return res_list
        }
        
        // 规格表单data取值(实时)
        var get_data = () =>{

          var p_s_obj = get_p_s_obj()

          // console.log(p_s_obj)

          var name_list = get_name_sku_list()//名称列表

          var d_list = get_value_sku_list()// 值列表

          var data_list = []

          for(let y of d_list){

            var data = {}

            for(var i=0;i<name_list.length;i++){
              var name = name_list[i]//名称
              var value = y[i]       // 值

              var p_s_res = p_s_obj[value] // 价格库存关系匹配
              if(p_s_res != undefined){     // 匹配成功
                data.price = p_s_res.price
                data.stock_num = p_s_res.stock_num
              }
            
              data[name_list[i]] = y[i];
            
            }

            data_list.push(data)
          }

          return data_list

        }

        // 规格表单data取值(实时)
        var get_old_data = () =>{

          var p_s_obj = get_p_s_c_data()

          // console.log(p_s_obj)

          var name_list = get_name_sku_list()//名称列表

          console.log(name_list)

          var d_list = get_value_sku_list()// 值列表

          console.log(d_list)

          var data_list = []

          for(let y of d_list){

            var data = {}

            for(var i=0;i<name_list.length;i++){
              var name = name_list[i]//名称
              var value = y.join('')       // 值
              console.log(value)

              var p_s_res = p_s_obj[value] // 价格库存关系匹配
              console.log(p_s_res)

              if(p_s_res != undefined){     // 匹配成功
                data.price = p_s_res.price
                data.stock_num = p_s_res.stock_num +''
                data.code = p_s_res.code +''

              }
            
              data[name_list[i]] = y[i];
            
            }
            console.log(data)

            data_list.push(data)
          }

          return data_list

        }


        // 渲染列表时候匹配价格、库存、商家编码
        // 读取sku列表：直接渲染数据以及价格
        var sku_list_data = props.data.sku_list;
        // console.log(sku_list_data)

        if(sku_list_data === '0'){                // 没有SKU—list的情况下
            var data_list = get_data()            // 实时排列的sku列表
        }else{// 有SKU-list数据的情况下
          var data_list = get_old_data()            // 实时排列的sku列表
        }

          return reactive({
            columns: get_colums(),
            data:data_list
          }) 
        
      })


      // 删除【规格】
      const removeSpec = (item, data)=>{

        let index = dynamicValidateForm.value.obj.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.obj.splice(index, 1);
        }

      }


      // 删除【规格值】
      const remove_spec_value = (item, data) => {

        let index = dynamicValidateForm.value.obj[data].value.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.obj[data].value.splice(index, 1);
        }

      };


      // 添加规格
      const addspec = () =>{

        console.log(dynamicValidateForm.value)

        var obj_number = dynamicValidateForm.value.obj.length;

        if(obj_number>=3){
          
          message.info('规格最多不能超过三组！');
          
          return false

        }else{

          dynamicValidateForm.value.obj.push({
            
            name:"规格名称",

            value:[{value:undefined}],
          
          })

        }

      }


      // 添加规格值
      const addspecvalue = (data) => {
        
        var value_number = dynamicValidateForm.value.obj[data].value.length;

        if(value_number >= 20){
          
          message.info('规格值最多不能超过20组！');

          return false

        }else{
        
          dynamicValidateForm.value.obj[data].value.push({

            value: undefined

          });

        }
      };
      

      // 确认按钮方法
      const handleOk = () => {
        
        // 验证表单结果是否正确
        formRef.value.validate().then(() => {
          
          skulistRef.value.validate().then(() => {

            console.log('验证通过')
            console.log(dynamicValidateForm.value)
            console.log(sku_list.value)
            confirmLoading.value = true;

            TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

            const up_date = {

              id:props.data.id,

              setting_data:{
                "sku": dynamicValidateForm.value.obj,
                "sku_list":sku_list.value
              }

            }

            TO.actions.update(up_date,(res)=>{

              // console.log('更新sku' + res)
              setTimeout(() => {
                confirmLoading.value = false;
                props.data.open = false;  // 收起model
                ctx.emit('edit_sku_callback')   // 回调刷新表格
                formRef.value.resetFields(); // 重置表单
              }, 2000);

          })



          }).catch(error => {
            // 表单验证错误
            console.log('error', error);
          })

        }).catch(error => {
          // 表单验证错误
          console.log('error', error);
        });
      };



      // 规格列表

      const columns = [
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


    const data = [
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

        
        return {
          props,
          confirmLoading,
          formRef,
          skulistRef,
          dynamicValidateForm,
          handleOk,
          remove_spec_value,
          removeSpec,
          addspecvalue,
          addspec,
          columns,
          data,
          sku_list
        };
    }


})
  
  </script>
<style scoped>
.ant-form-item{margin-bottom: 10px;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}
</style>