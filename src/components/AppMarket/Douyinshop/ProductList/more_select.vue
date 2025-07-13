<template>


    <a-drawer :width="200" title="更多查询" placement="top" :open="props.data.MoreSelectData" @close="onClose" >


        <!-- <template #extra>
            <a-button style="margin-right: 8px ;font-size:12px;" size="small" @click="onClose" >取消</a-button>
            <a-button type="primary" size="small" style="font-size: 12px;" @click="handleOk">查询</a-button>
        </template> -->

        <a-layout-content style="padding: 20px 100px 0 100px;height: 100%;">

            <a-row style="height: 80%;">
                <a-col :span="8">
                    <div style="padding:0 20px;height: 82%;">
                        <a-textarea 
                        v-model:value="List_conditions.product_id" 
                        placeholder="多个商品ID查询 支持100个 逗号隔开" 
                        size="small"
                        class="font_size_12"
                        style="height: 100%;"
                        allowClear
                        />
                    </div>
                </a-col>
                <a-col :span="8">
                    <div style="padding:0 20px;height: 82%;">
                        <a-textarea 
                            v-model:value="List_conditions.sku_codes" 
                            placeholder="多个商品编码查询 支持50个 逗号隔开" 
                            size="small" 
                            class="font_size_12"
                            style="padding: 4px;height: 100%;"
                            allowClear 
                        />
                    </div>
                </a-col>
                <a-col :span="8">
                    <p>
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <a-select
                                placeholder="商品类型"
                                ref="select"
                                v-model:value="List_conditions.product_type"
                                :options="List_conditions.product_type_op"
                                size="small"
                                style="width:100%"
                                allowClear 
                                >
                                <a-select-option value="0">普通商品</a-select-option>
                                <a-select-option value="1">新客商品</a-select-option>
                                <a-select-option value="3">虚拟商品</a-select-option>
                                <a-select-option value="6">玉石闪购</a-select-option>
                                <a-select-option value="7">云闪购</a-select-option>
                                <a-select-option value="127">其他</a-select-option>
                                </a-select>
                            </a-col>
                            <a-col :span="8">                            <a-select
                                placeholder="状态"
                                ref="select"
                                v-model:value="List_conditions.status"
                                :options="List_conditions.status_op"
                                size="small"
                                style="width:100%"
                                allowClear 
                            >
                                <a-select-option value="0">在线</a-select-option>
                                <a-select-option value="1">下线</a-select-option>
                                <a-select-option value="2">删除</a-select-option>
                            </a-select></a-col>
                            <a-col :span="8"><a-select 
                                size="small"
                                placeholder="审核状态"
                                ref="select"
                                v-model:value="List_conditions.check_status"
                                :options="List_conditions.check_status_op"
                                style="width:100%"
                                allowClear
                            >
                                <a-select-option value="3">审核通过</a-select-option>
                                <a-select-option value="2">待审核</a-select-option>
                                <a-select-option value="4">未通过</a-select-option>
                                <a-select-option value="7">待上架</a-select-option>
                                <a-select-option value="1">未提交</a-select-option>
                                <a-select-option value="5">封禁</a-select-option>
                            </a-select></a-col>
                        </a-row>
                    </p>

                    <p>
                        <a-input 
                            size="small"
                            placeholder="输入门店id"
                            class="font_size_12"
                            type="text" 
                            allowClear  
                            style="padding: 2px;"
                        />
                    </p>
                    <p>
                        <a-range-picker 
                            size="small" 
                            v-model:value="List_conditions.create_time" 
                            style="border-radius: 4px;width: 100%;"
                            :placeholder="['创建开始时间', '创建结束时间']"
                            :show-time="{ format: 'HH:mm:ss' }"
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </p>
                    <p>
                        <a-range-picker 
                        size="small" 
                        v-model:value="List_conditions.update_time" 
                        style="border-radius: 4px;width: 100%;"
                        :placeholder="['更新开始时间', '更新结束时间']"
                        :show-time="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss"
                        />
                    </p>

                    <p>
                        <a-radio-group v-model:value="List_conditions.selectGroup">
                            <a-radio value="need_check_out" style="font-size: 12px;">只看需要核销的商品</a-radio>
                            <a-radio value="exist_audit_reject_suggest" style="font-size: 12px;">只看有驳回建议的商品</a-radio>
                        </a-radio-group>
                        <!-- <a-checkbox v-model:checked="List_conditions.need_check_out">只看需要核销的商品</a-checkbox>
                        <a-checkbox v-model:checked="List_conditions.exist_audit_reject_suggest" >只看有驳回建议的商品</a-checkbox> -->
                    </p>

                </a-col>

            </a-row>
            <a-row>
                <a-col :span="24" style="text-align: center;">
                        <a-space>
                        <a-button type="primary" size="small" style="font-size: 12px;" @click="handleOk">查询</a-button>
                        <a-button style="font-size:12px;" size="small" @click="onClose" >取消</a-button>
                        <a-button style="font-size:12px;" size="small" @click="onClose">清空</a-button>
                        </a-space>
                </a-col>
            </a-row>

        </a-layout-content>
    </a-drawer>
</template>
<script>
import { defineComponent,ref,reactive } from 'vue';
import * as PL from '@/assets/douyinshop/ProductList';

export default defineComponent({

    name: "more_select",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        const ProList = new PL.ProductList_fun()     // 批量修改方法

        // 表单默认值
        const List_conditions  = reactive({

            "can_combine_product":true,       // 是否可搭配--默认
            "need_rectification_info":true,   // 是否需要自动整改信息 -- 默认

            "lookup_option":ref({             // 查询option--默认
                "need_name_affix":true,       // 是否需要获取标题前后缀
                "need_title_limit":true,      //是否需要获取商品标题长度限制规则
            }),

            "page":1,                         // 当前页面 -- 默认
            "size":10,                        // 显示数量 -- 默认

            "product_type":ref(undefined),    // 商品类型
            "product_type_op":[
            {
                "label":"普通商品",
                "value":0
            },
            {
                "label":"新客商品",
                "value":1
            },
            {
                "label":"虚拟商品",
                "value":3
            },
            {
                "label":"玉石闪购",
                "value":6
            },
            {
                "label":"云闪购",
                "value":7
            },
            {
                "label":"其他",
                "value":127
            },
            ],

            "status":ref(undefined),          //  在线状态
            "status_op":[
            {
                "label":"在线",
                "value":0
            },
            {
                "label":"下线",
                "value":1
            },
            {
                "label":"删除",
                "value":2
            }

            ],

            "check_status":ref(undefined),    // 审核状态
            "check_status_op":[
            {
                "label":"未提交",
                "value":1
            },
            {
                "label":"待审核",
                "value":2
            },
            {
                "label":"审核通过",
                "value":3
            },
            {
                "label":"审核未通过",
                "value":4
            },
                        {
                "label":"封禁",
                "value":5
            },
                        {
                "label":"审核通过待上架",
                "value":7
            },
            ],

            "create_time":ref(undefined),     // 创建时间
            "update_time":ref(undefined),     // 更新时间

            "product_id":ref(undefined),      // id查询最多支持  -- 选填
            "sku_codes":ref(undefined),       // 商家编码查询    -- 选填
            "store_id":ref(undefined),        // 小时达商家门店id-- 选填

            "selectGroup":ref([]),
            "need_check_out":ref(false),       // 只显示需要核销商品-- 选填
            "exist_audit_reject_suggest":ref(false), // 只显示驳回商品 -- 选填

        })

        // 查询值
        const select_conditions = ref({})

        // 确认按钮
        const handleOk = e => {

            const submit_obj = ProList.FromDataverify(List_conditions) // 验证表单字段是否为空或是否正确

            console.log(submit_obj);

            ctx.emit('moer_select_callback', submit_obj)

            props.data.MoreSelectData = false;


        };

        // 关闭方法
        const onClose = () => {
            props.data.MoreSelectData = false;
        };

        // 条件表单验证方法
        const vifede_data = (DataObj) =>{

            



        }

        return{
            props,
            List_conditions,        // 查询条件
            handleOk,       // 查询时间
            onClose,        // 关闭时间
        }
    }
})
</script>
<style lang="less">
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