<template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

        <!--左侧 菜单组件  开始-->
        <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
            <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
        </a-layout-sider>
        <!--左侧 菜单组件  结束-->

        <a-layout-content class="content_border">

            <a-row>

                <a-col :span="8">

                    <h3 class="title_h">第一步：选择商品</h3>

                    <div class="bor_r" :style="{height:'80vh'}">

                        <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">

                            <a-form-item name="cate_name" label="商品分类" >
                                <a-cascader
                                    size="small"
                                    v-model:value="formState.cate_name"
                                    :options="formState.options"
                                    :load-data="loadData"
                                    placeholder="选择分类"
                                />
                            </a-form-item>

                            <a-form-item name="state" label="审核状态" >
                                <a-select 
                                v-model:value="formState.state" 
                                placeholder="选择状态"
                                :options="formState.state_list" 
                                size="small" 
                                />
                            </a-form-item>

                            <a-form-item name="create_time" label="创建时间">
                                <a-space direction="vertical">
                                    <a-range-picker
                                        class="font_size_12"
                                        size="small"
                                        :show-time="{ format: 'HH:mm:ss' }"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        :placeholder="['选择开始时间', '选择结束时间']"
                                        @change="onCreateChange"
                                        @ok="onRangeOk"
                                    />
                                </a-space>
                            </a-form-item>
                            
                            <a-form-item name="update_time" label="更新时间">
                                <a-space direction="vertical">
                                    <a-range-picker
                                        class="font_size_12"
                                        size="small"
                                        :show-time="{ format: 'HH:mm:ss' }"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        :placeholder="['选择开始时间', '选择结束时间']"
                                        @change="onRangeChange"
                                        @ok="onRangeOk"
                                    />
                                </a-space>
                            </a-form-item>

                            <a-form-item name="title_key" label="标题关键字">
                                <a-textarea v-model:value="formState.title_key" placeholder="标题包含关键字查找" class="font_size_12" size="small"/>
                            </a-form-item>

                            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 4 }">
                                <a-space>

                                    <a-button html-type="submit" size="small" style="font-size: 12px;">查询商品</a-button>

                                    <a-button size="small" style="font-size: 12px;">重置</a-button>

                                    <div style="font-size: 12px;">已选择商品 123 个</div>
                                
                                </a-space>
                            </a-form-item>
                        </a-form>

                    </div>


                </a-col>


                <a-col :span="8">
                    <h4 class="title_h">第二步：修改字段</h4>
                    <div class="bor_r" :style="{height:'80vh'}">
                        <a-tabs
                            v-model:activeKey="activeKey"
                            tab-position="top"
                            :style="{ height: '500px'}"
                            size="small"
                            @tabScroll="callback"
                        >
                        <a-tab-pane key="1" tab="标题">

                                <a-form
                                    :model="title_options"
                                    name="title_options"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                    @finish="title_onFinish"
                                    @finishFailed="title_onFinishFailed"
                                >

                                    <a-form-item label="过滤文字">
                                        <a-input size="small" class="font_size_12" placeholder="输入关键字" v-model:value="title_options.filter_key" allowClear/>
                                    </a-form-item>
                                    <a-form-item label="替换文字">
                                        <a-space class="font_size_12">
                                            <a-input size="small" class="font_size_12" placeholder="输入文字" v-model:value="title_options.replace_key" style="width: 100px;" allowClear/>
                                            替换为
                                            <a-input size="small" class="font_size_12" placeholder="输入文字" v-model:value="title_options.replace_key" style="width: 100px;" allowClear/>
                                        </a-space>
                                    </a-form-item>

                                    <a-form-item label="加前后缀">
                                        <a-space class="font_size_12">
                                            <a-input class="font_size_12" size="small" placeholder="输入前缀" v-model:value="title_options.after_key" style="width: 100px;" allowClear />
                                            原标题
                                            <a-input class="font_size_12" size="small" placeholder="输入后缀" v-model:value="title_options.before_key"  style="width: 100px;" allowClear />
                                        </a-space>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="2" tab="客服电话">
                                <a-form
                                    :model="title_options"
                                    name="title_options"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                    @finish="title_onFinish"
                                    @finishFailed="title_onFinishFailed"
                                >
                                <a-form-item label="客服电话">
                                    <a-input size="small" class="font_size_12" v-model:value="title_options.mobile" placeholder="输入新的电话替换" allowClear/>
                                </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="3" tab="库存类型">
                                <a-form
                                    :model="title_options"
                                    name="title_options"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                    @finish="title_onFinish"
                                    @finishFailed="title_onFinishFailed"
                                >
                                <a-form-item label="库存类型" name="reduce_type">
                                    <a-select size="small" class="font_size_12" v-model:value="title_options.reduce_type" placeholder="选择减库存类型" allowClear>
                                        <a-select-option value="1">拍下减库存</a-select-option>
                                        <a-select-option value="2">付款减库存</a-select-option>
                                    </a-select>
                                </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="4" tab="运费模板">
                                <a-form
                                    :model="title_options"
                                    name="title_options"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                    @finish="title_onFinish"
                                    @finishFailed="title_onFinishFailed"
                                >
                                    <a-form-item label="运费模板" name="freight_id">
                                        <a-select size="small" class="font_size_12" v-model:value="title_options.freight_id"  placeholder="选择运费模板" allowClear>
                                            <a-select-option value="1">异步加载更多模板</a-select-option>
                                            <a-select-option value="2">付款减库存</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="5" tab="发货模式">
                                <a-form
                                    :model="title_options"
                                    name="title_options"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                    @finish="title_onFinish"
                                    @finishFailed="title_onFinishFailed"
                                >
                                    <a-form-item label="发货模式" name="presell_config_level">
                                        <a-radio-group v-model:value="title_options.presell_config_level">
                                            <a-radio class="font_size_12" value="1">现货</a-radio>
                                            <a-radio class="font_size_12" value="2">现货+预售</a-radio>
                                        </a-radio-group>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>

                        </a-tabs>

                    </div>
                    <div style="text-align: center;">
                        <a-button type="primary" html-type="submit" size="small" style="font-size: 12px;">提交</a-button>
                    </div>
                </a-col>


                <a-col :span="8">
                    
                    <h4 class="title_h">第三步：操作记录</h4>
                    <div class="bor_l" :style="{height:'80vh'}">

                        <a-list
                        class="demo-loadmore-list"
                        :loading="initLoading"
                        item-layout="horizontal"
                        :data-source="list"
                    >
                        <template #loadMore>

                            <div
                                v-if="!initLoading && !loading"
                                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                            >
                                <a-button @click="onLoadMore" size="small" style="font-size: 12px;">加载更多</a-button>
                            </div>
                        </template>

                        <template #renderItem="{ item }">

                            <a-list-item>
                                
                                <template #actions>
                                    <a key="list-loadmore-more" class="font_size_12">查看明细</a>
                                </template>

                                <a-skeleton avatar :title="false" :loading="!!item.loading" active>

                                    <a-list-item-meta>
                                        <template #title>
                                            <a href="#">{{ item.name.last }}</a>
                                        </template>
                                        <template #avatar>
                                            <a-avatar :src="item.picture.large" />
                                        </template>
                                    </a-list-item-meta>

                                    <div>content</div>
                                
                            </a-skeleton>
                            </a-list-item>
                        </template>
                        </a-list>
                    </div>

                </a-col>

            </a-row>
            
        </a-layout-content>

    </a-layout>

</a-layout>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { Segmented } from 'ant-design-vue';
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
import axios from "axios";// 网络请求方法

// 组件引用=====开始
import menu_left from "@/components/layout/menu_left.vue";
import menu_head from "@/components/layout/menu_head.vue";
import { Option } from 'ant-design-vue/es/vc-select';

export default defineComponent({
  // 模版名称【角色管理】
  name: "BatchEdit",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    menu_left,
    menu_head,
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup() {
    // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度

    // const loading = ref(true)// 初始化loading状态

    const PAGEDATA = reactive({
      title:'批量修改',
      menudata:{'key':'92','openKeys':'douyinshop'},            // 菜单选中配置
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })

    const layout = {
        labelCol: {span: 4,},
        wrapperCol: {span: 20,},
    };


    // 查询商品表单数据绑定
    const formState = reactive({
        
        get_cate_list:(obj)=>{
            var obj_list = []
            for(let i of obj){
                let cate_obj = {}
                cate_obj.value = i.id;
                cate_obj.label = i.name;
                cate_obj.isLeaf = i.is_leaf;
                obj_list.push(cate_obj)
            }
            return obj_list
        },
        
        options:ref([]),// 分类选项

        cate_name:[],//分类

        state:undefined,

        state_list:ref([{value:'1',label:'待审核'},{value:'2',label:'审核通过'},{value:'3',label:'审核不通过'}]),//审核状态

        create_time:'',// 创建时间

        update_time:'',// 更新时间

        title_key:ref(undefined),// 标题关键字

    });

    // 分类选择初始化
    axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":0}).then(res=>{
        // console.log(res.data)
        // console.log(formState.options)
        formState.options = formState.get_cate_list(res.data.data)
    })

    // 异步请求子分类
    const loadData = selectedOptions => {

        const targetOption = selectedOptions[selectedOptions.length - 1];

        var cid = targetOption.value;       // 分类id

        var isLeaf = targetOption.isLeaf;   // 是否叶子类目

        console.log(targetOption)

        targetOption.loading = true; // load options

        axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{
            // console.log(res.data)
            // console.log(formState.options)
            targetOption.loading = false;

            targetOption.children = formState.get_cate_list(res.data.data)

            formState.options = [...formState.options];
        })

        console.log(formState.cate_name.value)
            
    };

    // 创建时间选择
    const onCreateChange = (value, dateString) => {
        formState.create_time = dateString;
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    // 更新时间选择
    const onRangeChange2 = (value, dateString) => {
        formState.update_time = dateString;
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
       };

    const onRangeOk = value => {
        console.log('onOk: ', value);
    };

    const onFinish = values => {
        console.log('Success:', values);
    };



    // 批量修改-操作方法
    const activeKey = ref('1');
    const callback = val => {
        console.log(val);
    };
    
    const title_options = reactive({

        after_key: '', // 前缀
        before_key: '', // 后缀
        replace_key: '', // 替换关键字
        filter_key: '',// 过滤关键字
        mobile:'',// 客服电话
        reduce_type:undefined,// 库存类型
        freight_id:undefined,// 运费模板
        presell_config_level:''// 发货模式

    });
    const title_onFinish = values => {
        console.log('Success:', values);
    };
    const title_onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };





    //* 处理结果列表加载 *//
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const initLoading = ref(true);
    const loading = ref(false);
    const data = ref([]);
    const list = ref([]);
    
    onMounted(() => {
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
                initLoading.value = false;
                data.value = res.results;
                list.value = res.results;
            });
    });

    const onLoadMore = () => {
        loading.value = true;
        list.value = data.value.concat(
        [...new Array(count)].map(() => ({
        loading: true,
        name: {},
        picture: {},
        })),
    );
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
        const newData = data.value.concat(res.results);
        loading.value = false;
        data.value = newData;
        list.value = newData;
        nextTick(() => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
        });
        });
    };

    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      layout,
      formState,
      onFinish,
      loadData,
      onCreateChange,
      onRangeOk,
      initLoading,
      list,
      onLoadMore,
      activeKey,
      callback,

      title_options,
      title_onFinish,
      title_onFinishFailed,
    }
    }
})
</script>
<style scoped>
.title_h{padding: 20px 0 10px 0; width: 100%;text-align: center;}
.bor_r{border-right: 1px #f2f2f2 solid;padding:20px 30px 0 30px;}
.bor_l{padding:20px 30px 0 30px;}
.xiuga{padding: 20px 0 0 0;height: 280px;}
.font_size_12{font-size: 12px;}
</style>