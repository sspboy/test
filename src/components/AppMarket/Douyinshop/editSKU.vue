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
      const formRef = ref();
      const skulistRef = ref();

      // 规格值-->构造表
      const dynamicValidateForm = computed(()=>{

        // 数据id
        var obj_id = props.data.id;
        // 添加id
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
        var get_p_s_obj = () => {

            var res_obj = {}
          
            for(let i of dynamicValidateForm.value.obj){
                for(let y of i.value){if(y.price != undefined){
                    var p_s_obj = {}
                    p_s_obj.price = y.price
                    p_s_obj.stock = y.stock
                    res_obj[y.value] = p_s_obj
                }}
            }
            // var res = {"name":{"price":"","stock":""},"name":{"price":"","stock":""},}
            
            return res_obj
        
        }
        
        // sku_value数组取值
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
        
        // 规格表单data取值
        var get_data = () =>{

          var p_s_obj = get_p_s_obj()// 价格、库存关联对象

          // console.log(p_s_obj)

          var name_list = get_name_sku_list()//名称列表

          var d_list = get_value_sku_list()// 值列表

          var data_list = []

          for(let y of d_list){

            var data = {}

            for(var i=0;i<name_list.length;i++){
              var name = name_list[i]//名称
              var value = y[i]        // 值
              var p_s_res = p_s_obj[value] // 价格库存关系匹配
              if(p_s_res != undefined){     // 匹配成功
                data.price = p_s_res.price
                data.stock_num = p_s_res.stock
              }
              data[name_list[i]] = y[i];
            }


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
      

      // 确认按钮方法
      const handleOk = () => {
        
        // 验证表单结果是否正确
        formRef.value.validate().then(() => {
          
          skulistRef.value.validate().then(() => {

            console.log('验证通过')
            console.log(dynamicValidateForm.value)
            console.log(sku_list.value)


            confirmLoading.value = true;
            setTimeout(() => {
              props.data.open = false;
              confirmLoading.value = false;
            }, 2000);



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