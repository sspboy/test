<!-- 发货履约 + 库存 --- 页面组件 

    1-现货发货模式规则
    2-阶梯发货模式规则
    3-全款预售发货模式规则
    4-SKU预售发货模式规则
    5-现货+预售发货规则（现货预售混合）
    6-新预售发货模式规则（现货预售混合）
    7-特殊时间延迟发货规则

-->

<template>


    <a-divider orientation="left" orientation-margin="0px">
        
        <a-button @click="console.log(Stock.sepec_info)" size="small">打印规格</a-button>
        <a-button @click="Fulfill.get_presell" size="small" style="margin:0 20px;"> 获取发货模式 </a-button>
        
        <a-button @click="Stock.get_specs" size="small" style="margin:0 20px;"> 打印库存 </a-button>

        <a-button @click="Stock.get_sku_list" size="small" style="margin:0 20px;">验证库存表单</a-button>
        
        <a-radio-group 
            v-model:value="presell_formdata.reduce_type" 
            option-type="button" 
            :options="presell_formdata.reduce_options" 
            size="small"
            style="margin:0 20px;"
            @change="console.log(presell_formdata.reduce_type)"
        />

        <a-radio-group 
            v-model:value="presell_formdata.presell_type" 
            option-type="button" 
            :options="presell_formdata.options" 
            size="small"
            @change="Stock.change_presale()"
        />
    </a-divider>




    <!--现货发货-->
    <a-form
        :model="spot_formdata"
        :rules="spot_formdata_rule"
        v-show="presell_formdata.presell_type === 0"
        style="margin: 40px 0 0 0;"
    >
          <a-row :gutter="[16]">
            <a-col :span="24">
                <a-form-item 
                    style="width: 200px;"
                    label="现货发货" 
                    name="delivery_delay_day"
                >
                    <a-select
                        ref="select"
                        v-model:value="spot_formdata.delivery_delay_day" 
                        :options="spot_formdata.delay_op"
                    />
                </a-form-item>
            </a-col>
        </a-row>


    </a-form>

    <!--预售发货-->
    <a-form 
        :model="presale_formdata"
        :rules="presale_formdata_rule"
        v-show="presell_formdata.presell_type === 1" style="margin: 40px 0 0 0;"
    >
      <a-row :gutter="[16]">
            <!--全款预售发货-->
            <a-col>
                <a-form-item 
                    style="width: 200px;"
                    label="现货发货" 
                    name="delivery_delay_day"
                >
                <a-select
                    ref="select"
                    v-model:value="presale_formdata.delivery_delay_day" 
                    :options="presale_formdata.delay_op"
                />
            </a-form-item>
            </a-col>
            <a-col :span="6" >
                <a-form-item label="预售发货时效" name="time_selected">
                    <a-select
                        ref="select"
                        v-model:value="presale_formdata.time_selected" 
                        :options="presale_formdata.time_end_op"
                        class="custom-radio"
                        @change="presale_formdata.set_time_selected"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item name="presell_end_time">
                    <a-date-picker 
                        show-time 
                        :disabled="presale_formdata.presell_end_time_status"
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择预售结束时间点"
                        @change="presale_formdata.get_end_time" 
                     />
                </a-form-item>
            </a-col>
            
            <a-col :span="4">
                <a-form-item>
                    <a-select
                        ref="select"
                        v-model:value="presale_formdata.presell_delivery_type"
                        :options="presale_formdata.delivery_op"
                        @focus="console.log('选择发货时间')"
                        @change="console.log('选择发货时间')"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item name="presell_delay">
                <a-input-number 
                        addon-after="天后发货"
                        placeholder="输入天数"
                        style="width: 130px;"
                        v-model:value="presale_formdata.presell_delay" :min="3" :max="10" 
                    />
                    </a-form-item>
            </a-col>
        </a-row>
    </a-form>

    <!--新 现货+预售发货-->
    <a-form 
        ref="step_formRef"
        :model="step_formdata"
        :rules="step_formdata_rule"
        v-show="presell_formdata.presell_type === 2" style="margin: 40px 0 0 0;">
        <a-row :gutter="[116,16]">
            <a-col :span="5">
                <a-form-item 
                    style="width: 200px;"
                    label="现货发货" 
                    name="delivery_delay_day"
                >
                    <a-select
                        ref="select"
                        v-model:value="step_formdata.delivery_delay_day" 
                        :options="step_formdata.delay_op"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="19">
                <a-form-item label="预售发货" name="presell_delay">
                    <a-checkbox-group 
                        v-model:value="step_formdata.presell_delay" 
                        :options="step_formdata.de_op"
                        @change="Stock.same"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>


    <!--库存-->
    <a-divider orientation="left" orientation-margin="0px">库存</a-divider>
    
    <!--批量设置库存-->
    <a-form
        :model="stock_operation_formdata"
    >
        <a-row :gutter="[16]">
            <a-col :span="4">
                <a-form-item label="全部规格">

                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item>
                    <a-input 
                        placeholder="设置价格"
                        v-model:value="stock_operation_formdata.price" 
                        allow-clear></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item>
                    <a-input 
                    placeholder="现货库存"
                    v-model:value="stock_operation_formdata.stock"
                     allow-clear></a-input>

                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item>
                    <a-input 
                        placeholder="预售库存"
                        v-model:value="stock_operation_formdata.presale_stock"
                        allow-clear
                    ></a-input>

                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item>
                    <a-input 
                        placeholder="商家编码"
                        v-model:value="stock_operation_formdata.code"
                        allow-clear
                    ></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-space>
                <a-button @click="Stock.batch_set">批量设置</a-button>
                <a-button @click="Stock.clear_all">清除</a-button>
                </a-space>
            </a-col>
        </a-row>
    </a-form>

    <a-form 
        ref="skulistRef" 
        :model="skulist_formState" 
        name="basic"
    >
        <a-table 
            :columns="skulist_formState.skucolumns"
            :data-source="skulist_formState.skudatelist"
            :pagination="false"
            style="font-size: 12px;"
            size="small"
            bordered
        >

            <template #bodyCell="{ column, text, record, index }">
                
                <template v-if="column && column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                </template>

                <template v-if="column && column.dataIndex === 'price'">

                    <a-form-item
                        :name="['skudatelist', index, 'price']"
                        :rules="{required: true, trigger: 'change', message:'价格不能为空'}"
                        >
                        <a-input-number 
                            placeholder="输入价格" 
                            v-model:value="record.price" 
                            prefix="￥" 
                            :min="0" 
                            :step="0.01"
                            autocomplete="off"
                            allow-clear
                            style="font-size: 12px;width: 100%;margin-top: 22px;"/>
                    </a-form-item>
                </template>
                <template v-if="column && column.dataIndex === 'presale_stock_num' && presell_formdata.presell_type === 2">
                    <a-space>
                        <span class="font_size_12">总计</span>
                        <span class="font_size_12">{{ record.stock_num }}</span>
                        <a-button size="small" @click="Stock.set_presale_stock(record)">设置</a-button>
                    </a-space>

                    <!--预售发货时效 库存弹窗-->
                    <a-modal v-model:open="record.open" width="300px" title="预售库存" @ok="console.log('保存库存')">
                        <a-form :model="record.multi_time_stocks" style="margin-top: 20px;">
                            <template v-for="item in record.multi_time_stocks">
                                <a-form-item :label="item.time_desc" name="index">
                                    <a-input-number  
                                        placeholder="输入预售库存数量"
                                        :min="0"
                                        :max="999999999"
                                        v-model:value="item.stock_num" 
                                    ></a-input-number >
                                </a-form-item>
                            </template>
                        </a-form>
                    </a-modal>
                </template>

                <template v-if="column && column.dataIndex === 'stock_num'">
                <a-form-item 
                    :name="['skudatelist', index, 'stock_num']"
                    :rules="{required: true, trigger: 'change', message:'库存不能为空'}"
                    :style="{ 'margin': '0 0 0px 0' }"

                >
                    <a-input-number 
                        placeholder="输入库存" 
                        :min="0"
                        :max="999999999"
                        v-model:value="record.stock_num" 
                        autocomplete="off"
                        allow-clear
                        style="font-size: 12px;width: 100%;margin-top: 22px;"
                    />
                </a-form-item>
                </template>
                
                <template v-if="column && column.dataIndex === 'code'">
                    <a-form-item :style="{ 'margin': '0 0 0px 0' }">
                        <a-input
                            placeholder="商家编码"
                            autocomplete="off"
                            v-model:value="record.code" 
                            style="font-size: 12px;width: 100%;margin-top: 22px;" />
                    </a-form-item>
                </template>
                
            </template>
        
        </a-table>

    </a-form>
    <!--库存结束-->



</template>


<script>

// 导入方法
import { defineComponent,defineAsyncComponent,ref,reactive,onMounted,computed,shallowRef,onBeforeUnmount,toRaw, watch } from 'vue';
import { 
    Fulfillment,
    StockFun,
    presell_formdata,
    spot_formdata,
    spot_formdata_rule,
    presale_formdata,
    presale_formdata_rule,
    step_formdata,
    step_formRef,
    step_formdata_rule,
    skulistRef,
    skulist_formState,
    stock_operation_formdata

} from '@/assets/douyinshop/productmanagement/Add';

// 组件引用=====开始
export default defineComponent({
    name:'发货方式',
    components:{
        
    },
    props: {
        data:{type:Object},
        specs_info:{type:Object},// 获取规格spec
        // 发货规则

    },
    setup(props,ctx) {

        const Fulfill = new Fulfillment()
        
        Fulfill.load()// 加载支持的发货方式

        const Stock = new StockFun()




        // 监听规格列表变化【form表单绑定必须可变的响应式对象】
        watch(() => Stock.sepec_info, (newVal) => {
            if (newVal) {
                skulist_formState.skudatelist = Stock.get_data();
                skulist_formState.skucolumns = Stock.get_colums();
                Stock.change_presale()
            }
        }, { immediate: true, deep: true })


        

        return{

            Stock,
            // ====发货开始
            Fulfill, 

            presell_formdata, // 发货模式

            spot_formdata,              // 现货发货 表单
            spot_formdata_rule,         // 现货发货 表单规则

            presale_formdata,// 预售 表单
            presale_formdata_rule,// 预售表单规则

            step_formdata,      // 现货+预售
            step_formRef,
            step_formdata_rule,  // 现货+预售规则
            // ====发货结束


            skulistRef,
            skulist_formState,

            stock_operation_formdata


            
        }
    }
})
</script>
<style scoped>

:deep(.ant-radio-wrapper) {
  font-size: 12px;

}

</style>