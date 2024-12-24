<template>
    <div>

      <a-modal v-model:open="props.data.open" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">

          <a-form-item v-for="(spec, spec_index) in dynamicValidateForm.obj" :key="spec.id" style="display: flex;padding: 10px 0 0 0;">
            
            <div style="width: 30%;float: left; margin-bottom: 20px;">

              <a-input v-model:value="spec.name" placeholder="输入规格名称" allow-clear />
            
            </div>
            
            <a-button type="dashed" size="small" style="float:left;width: 40px;font-size: 12px; margin:2px 0 0 20px;" block @click="addspecvalue(spec_index)">
              <PlusOutlined />
            </a-button>

            <a-button type="dashed" size="small" style="float:left;width: 40px;font-size: 12px; margin:2px 0 0 20px;" block @click="removeSpec(spec,spec_index)">
              <MinusOutlined />
            </a-button>

            <div style="width: 100%;clear: both; margin-bottom: 0;">
              
              <a-space v-for="(user, spec_value_index) in spec.value" :key="user.id" style="margin:2px 0 0 0;clear: both;" align="baseline">

                  <a-form-item v-if="spec_index === 0">
                    <span v-if="user.img === undefined || user.img === ''">
                      <span style="width: 30px;height: 30px;display: block;border:1px silver solid;float: left;"></span>
                    </span>
                    <span v-else-if="user.img != undefined"><a-image :width="30" :height="30" :src="user.img"/></span>

                    <a-input placeholder="输入图片地址" v-model:value="user.img" style="font-size:12px;margin-left:6px;width: 80%;" allow-clear/>
                  </a-form-item>
              
                  <a-form-item :name="['obj', spec_value_index]" :rules="{ required: true,message: 'Missing first name',}">
                      <a-input v-model:value="user.value" placeholder="输入值" style="font-size: 12px;" allow-clear/>
                  </a-form-item>

                  <MinusCircleOutlined @click="remove_spec_value(user, spec_index)" style="margin-right: 10px;" />

                </a-space>
            </div>

          </a-form-item>
          

          <a-form-item>

            <a-button type="primary" @click="addspec" size="small">添加规格</a-button>

          </a-form-item>

        </a-form>

        <a-form>

          规格列表

        </a-form>


        
      </a-modal>
    </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { defineComponent,ref,reactive,computed } from 'vue';
import { MinusCircleOutlined, PlusOutlined,MinusOutlined } from '@ant-design/icons-vue';
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

      const get_spec_data = (data)=>{
        
        return JSON.parse(data)
      }

      const confirmLoading = ref(false);

      const handleOk = () => {
          confirmLoading.value = true;
          setTimeout(() => {
            open.value = false;
            confirmLoading.value = false;
          }, 2000);
      };


      const formRef = ref();
      
      // 规格值初始化
      const dynamicValidateForm = computed(()=>{
        return reactive({
          obj:get_spec_data(props.data.data)
        });
      })

      // 初始化规格列表
      const sku_list = computed(()=>{

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
        
        var res_list = []
        var datalist = dynamicValidateForm.value.obj;

        for(let i of datalist){
          var v_list = []
          for(let y of i.value){v_list.push(y.value)}
          res_list.push(v_list)
        }

        // 笛卡尔积方法

        // 数据格式构建
        
        return reactive({
          list: res_list
        })

      })


      // 删除规格值
      const remove_spec_value = (item, data) => {

        let index = dynamicValidateForm.value.obj[data].value.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.obj[data].value.splice(index, 1);
        }

      };

      // 删除规格
      const removeSpec = (item, data)=>{

        let index = dynamicValidateForm.value.obj.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.obj.splice(index, 1);
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
            name: "add_value"
          });
        
        }

        
      };
      
      // 添加规格
      const addspec = () =>{
        
        console.log(sku_list.value)

        var obj_number = dynamicValidateForm.value.obj.length;

        if(obj_number>=3){
          
          message.info('规格最多不能超过三组！');
          
          return false

        }else{

          dynamicValidateForm.value.obj.push({
            name:"规格名称",
            value:[{name:"name"}]
          })

        }

      }

      
      const onFinish = values => {
        
        console.log('Received values of form:', values);

        console.log('dynamicValidateForm.users:', dynamicValidateForm.users);

      };

        
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
          addspec
        };
    }


})
  
  </script>
<style>

</style>