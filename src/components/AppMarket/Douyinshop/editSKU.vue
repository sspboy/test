<template>

    <div>

      <a-modal v-model:open="props.data.open" width="800px" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">

          <a-form-item v-for="(spec, spec_index) in dynamicValidateForm.obj" :key="spec.id" style="display: flex;padding: 10px 0 0 0;">
            
            <div style="width: 30%;float: left; margin-bottom: 20px;">

              <a-input v-model:value="spec.name" size="small" placeholder="输入规格名称" allow-clear />
            
            </div>
            
            <a-button type="dashed" size="small" style="float:left;width: 40px;font-size: 12px; margin:2px 0 0 20px;" block @click="addspecvalue(spec_index)">
              <PlusOutlined />
            </a-button>

            <a-button type="dashed" size="small" style="float:left;width: 40px;font-size: 12px; margin:2px 0 0 20px;" block @click="removeSpec(spec,spec_index)">
              <MinusOutlined />
            </a-button>

            <div style="width: 100%;clear: both; margin-bottom: 0;">

              <a-space v-for="(user, spec_value_index) in spec.value" :key="user.id" style="margin:2px 4px 0 0;" align="baseline">
                    
                <a-form-item v-if="spec_index === 0">
                      
                      <span v-if="user.img === undefined || user.img === ''">
                        <span style="width: 50px;height: 50px;display: block;border:1px silver solid;border-radius:4px;float: left;"></span>
                      </span>
                      
                      <span v-else-if="user.img != undefined" style="float: left;">
                        <a-image style="border-radius:4px;" :width="50" :height="50" :src="user.img"/>
                      </span>
                      
                      <a-input placeholder="输入图片地址" v-model:value="user.img" size="small" style="font-size:12px;margin-left:6px;width: 210px;" allow-clear/>

                      <div :name="['obj', spec_index, 'value', spec_value_index, 'value',]" :rules="{required: true, message:'规格值不能为空'}" style="margin-top: 4px;">
                        <a-input v-model:value="user.value" placeholder="输入值" size="small" style="font-size: 12px;margin-left:6px;width: 210px;" allow-clear/>
                      </div>

                </a-form-item>

                <a-form-item v-if="spec_index != 0" :name="['obj', spec_index, 'value', spec_value_index, 'value',]" :rules="{required: true, message:'规格值不能为空'}">
                  <a-input v-model:value="user.value" placeholder="输入值" size="small" style="font-size: 12px;width: 210px;" allow-clear/>
                </a-form-item>

                <MinusCircleOutlined @click="remove_spec_value(user, spec_index)" style="margin: 0 5px 0 0;" />

              </a-space>

            </div>

        </a-form-item>
          

        <a-form-item>

          <a-button type="dashed" @click="addspec" size="middle">添加规格</a-button>
          <a-button type="dashed" html-type="submit" size="middle">ok</a-button>

        </a-form-item>

      </a-form>

      <a-table :columns="sku_list.columns" :data-source="sku_list.data" :pagination="false" style="font-size: 12px;" size="small" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
          <template v-if="column.dataIndex === 'price'">
            <a-input-number placeholder="输入价格" size="small" v-model:value="record.price" prefix="￥" :min="0" :step="0.01" style="font-size: 12px;width: 100%;"/>
          </template>
          <template v-if="column.dataIndex === 'stock_num'">
            <a-input-number placeholder="输入库存" size="small" v-model:value="record.stock_num" :min="0" style="font-size: 12px;"/>
          </template>
          <template v-if="column.dataIndex === 'code'">
            <a-input placeholder="商家编码" size="small" style="font-size: 12px;"/>
          </template>
        </template>
        <template #title>规格列表</template>
        <template #footer>Footer</template>
      </a-table>


      </a-modal>
    </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { defineComponent,ref,reactive,computed } from 'vue';
import { MinusCircleOutlined, PlusOutlined,MinusOutlined } from '@ant-design/icons-vue';

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

      const t = new tool.TOOL()// 公用方法

      const confirmLoading = ref(false);

      // 确认按钮方法
      const handleOk = () => {
        console.log(dynamicValidateForm.value)
        console.log(sku_list.value)

          confirmLoading.value = true;
          setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
          }, 2000);
      };


      const formRef = ref({

      });
      
      // 规格值初始化
      const dynamicValidateForm = computed(()=>{
        return reactive({
          obj:JSON.parse(props.data.data)
        });
      })

      // 更具规格--->构造规格列表
      const sku_list = computed(()=>{
        
        // 规格所属平台

        // sku_name数组取值
        var get_name_sku_list = () =>{
          var name_list = []
          var datalist = dynamicValidateForm.value.obj;
          for(let i of datalist){
            name_list.push(i.name)
          }
          return name_list
        }

        // sku_价格、库存、提取
        
        // sku_value数组取值
        var get_value_sku_list= () =>{
          var res_list = []
          var datalist = dynamicValidateForm.value.obj;
          // 规格取值
          for(let i of datalist){
            var v_list = []
            for(let y of i.value){
              console.log(y)
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
        
        // 规格表单data取值
        var get_data = () =>{

          var name_list = get_name_sku_list()//名称列表

          var d_list = get_value_sku_list()// 值列表

          var data_list = []

          for(let y of d_list){

            var data = {}
            for(var i=0;i<name_list.length;i++){
              data[name_list[i]] = y[i];
            }

            data.price = 0
            
            data.stock_num = 0

            data_list.push(data)
          }

          return data_list

        }

        // 价格、库存、商家编码

        var value_list = [{

          "spec_detail_name1":"红色",
          "spec_detail_name2":"S",
          "spec_detail_name3":"",
          "stock_num":11,// 库存
          "price":100,//价格
          "code":"",// 商家编码

          "step_stock_num":0,
          "supplier_id":"",
          "outer_sku_id":"",
          "delivery_infos":[{"info_type":"weight","info_value":"100","info_unit":"mg"}] // 物流信息
        }]

        //**sku详情，数量应该等于规格1规格2规格3，sku数量和规格组合数必须一致 sku不可售时，库存可设置为0。
        // price单位为分。 

        // delivery_infos为SKU物流信息，
        // info_value为字符串类型（示例："12"），
        // info_type填weight，
        // info_unit支持mg,g,kg，
        // 
        // 超市小时达场景主品用普通库存，子品用区域库存（"sku_type": 1 // 区域库存，"stock_num_map": {"123": 99999 // 门店ID:库存数量}）; 
        // 
        // “gold_process_charge”为黄金加工费，只有计价金类目可填并且必填。 
        // 
        // sell_properties为sku规格信息，代替spec_detail_name1、spec_detail_name2、spec_detail_name3，
        // 
        // 支持填写超过三级规格，样式:[
        // {"property_id":123,"property_name":"颜色","value_id":456,"value_name":"红色","remark":"偏深"},
        // {"property_id":789,"property_name":"净含量","value_id":891,"value_name":"30ml","remark":null,
        // "measurement":{"measure_unit":"ml","measure_unit_id":4,"value":"30"}
        // }] 
        // 其中property_id规格项属性id,自定义时传0,
        // property_name为规格项名称,
        // value_id为规格值属性id自定义时传0,
        // value_name为规格值名称,
        // remark为规格值备注(选填),
        // measurement为度量衡信息，当规格值为度量衡属性自定义值时传递。 */


        // 笛卡尔积方法
        var d_list = get_value_sku_list()

        // 数据格式构建
        // 1688 数据添加价格库存
        
        return reactive({
          columns: get_colums(),
          data:get_data()
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
      

      // 提交规格表单
      const onFinish = values => {
        
        console.log('Received values of form:', values);

        console.log('dynamicValidateForm.users:', dynamicValidateForm.value.objvalue.obj);

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
          dynamicValidateForm,
          handleOk,
          onFinish,
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
<style>

</style>