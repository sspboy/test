<!-- 新建尺码模板 -->
<template>
<a-drawer
    v-model:open="props.data.add_open"
    class="custom-class"
    root-class-name="root-class-name"
    title="新建"
    placement="right"
    width="800"
  >
    <div>

        <p><a-input placeholder="模板名称" size="small"></a-input></p>
        <p><a-input placeholder="尺码标题" size="small"></a-input></p>
        <p><a-input placeholder="标题注释" size="small"></a-input></p>

        <a-radio-group 
            v-model:value="size_add.add_value" 
            size="middle"
            @change="size_add.change"
        >
            <a-radio-button value="clothing" class="font_size_12">服装</a-radio-button>
            <a-radio-button value="undies" class="font_size_12">内衣</a-radio-button>
            <a-radio-button value="shoes" class="font_size_12">鞋靴类</a-radio-button>
            <a-radio-button value="children_clothing" class="font_size_12">童装</a-radio-button>
            <a-radio-button value="rings" class="font_size_12">戒指</a-radio-button>
            <a-radio-button value="bracelets" class="font_size_12">手镯</a-radio-button>
        </a-radio-group>
    </div>
    <div style="height: 34px;margin: 20px 0 0 0;">
        <a-checkbox-group 
            v-model:value="size_add.op_value" 
            name="checkboxgroup" 
            :options="size_add[size_add.op_name]" 
            @change="console.log(size_add.op_value)"
        />
    </div>
    <p>
        <a-table :columns="size_add.columns" :data-source="size_add.data" :pagination="false" size="small" class="font_size_12" bordered>
            <template #bodyCell="{ column, record,text }">
                <template v-if="column.dataIndex === 'op'">
                    <a-space>
                    <a class="font_size_12" href="#" @click="console.log('上移')">上移</a>
                    <a class="font_size_12" href="#" @click="console.log('下移')">下移</a>
                    <a class="font_size_12" href="#" @click="console.log(record)">删除</a>
                    </a-space>
                </template>
                <template v-else>
                    <a-input :value="text"></a-input>
                </template>
            </template>
            <template #footer>
                <a>添加一行</a>
            </template>
        </a-table>
    </p>
    <div>
        <a-space>
            <a-button type="primary" size="small">保存</a-button>
            <a-button size="small">取消</a-button>
        </a-space>
    </div>
</a-drawer>
</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'
// 组件引用=====开始
export default defineComponent({
    name:'templateAdd',
    components:{
    },
    props: {

        data:{typr:Object}
  
    },
setup(props,ctx) {

    // 新建尺码详情
    const size_add = reactive({
        open:ref(false),
        data:ref(undefined),
        // 新建模板类型选择
        add_value:ref('clothing'),
        // 模板选项
        template_type:{
            'clothing':'服装',
            'undies':'内衣',
            'shoes':'鞋靴类',
            'children_clothing':'童装',
        },

        op_value:ref([]),// 选中的尺码值

        op_name:ref('clothing'),

        clothing:['身高(cm)', '体重(cm)', '胸围(cm)', '肩宽(cm)', '腰围(cm)', '臀围(cm)', '袖长(cm)'],

        undies:['下胸围(cm)', '胸围差(cm)', '杯罩'],

        shoes:['脚长(cm)', '脚宽(cm)', '靴筒高(cm)', '靴筒围(cm)', '鞋跟高(cm)'],

        children_clothing:['身高(cm)', '体重(斤)', '胸围(cm)'],

        rings:['戒指内周长(mm)', '戒指内直径(mm)'],

        bracelets:['手掌最宽长度(mm)', '手掌最宽周长(mm)'],

        // 切换表头方法
        check_colums:(type_name)=>{

            var r = size_add[type_name]

            var list = [] // 表头

            for(let i of r){
                var o = {}
                o.title = ''
                o.dataIndex = ''
                list.push(o)
            }

            console.log(list)
            // 初始化模板数据
            // 服装
            let clothingData = [
                {
                    key: '1',
                    size: 's',// 尺码
                    Height: '160', // 身高(cm)
                    Weight: '50',//体重(cm)
                    Chest_circumference: '34',// 胸围(cm)
                    Shoulder_width:'22',// '肩宽(cm)'
                    Waist_circumference:'22',// '腰围(cm)'
                    Hip_circumference:'22', // '臀围(cm)'
                    Sleeve_length:'22'// '袖长(cm)'
                },
                {
                    key: '2',
                    size: 's',// 尺码
                    Height: '160', // 身高(cm)
                    Weight: '50',//体重(cm)
                    Chest_circumference: '34',// 胸围(cm)
                    Shoulder_width:'22',// '肩宽(cm)'
                    Waist_circumference:'22',// '腰围(cm)'
                    Hip_circumference:'22', // '臀围(cm)'
                    Sleeve_length:'22'// '袖长(cm)'
                },
            ]
            
            // 内衣
            let undiesData = []
            
            // 鞋靴
            let shoesData = []
            
            // 童装
            let children_clothingData=[]
            
            // 戒指
            let ringsData = []
            
            // 手镯
            let bracelets = []

        },
        // 表头数据
        columns:ref([
            {
                title: '尺码',
                dataIndex: 'size',
                align: 'center',
                width:80,
            }, 
            {
                title: 'Name',
                dataIndex: 'name',

            }, 
            {
                title: 'Cash Assets',
                dataIndex: 'money',
            }, 
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                title: '操作',
                dataIndex: 'op',
                align: 'center',
                width:120,
            }
        ]),

        // 模板数据
        data:ref([
            {
            key: '1',
            size: 'x',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York No. 1 Lake Park',
            }, {
            key: '2',
                size: 'x',
                name: 'Jim Green',
                money: '￥1,256,000.00',
                address: 'London No. 1 Lake Park',
            }, {
                key: '3',
                size: 'x',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
        }]),

        play:()=>{
            size_add.open = true
        },
        add:()=>{
            var url ="https://fxg.jinritemai.com/ffa/g/size-chart/manage"
            window.open(url)
        },
        change:()=>{
            
            size_add.op_name = size_add.add_value// 表头多选项目切换

            size_add.check_colums(size_add.add_value) // 表格切换

        }
    })

    return{
        props,
        size_add,
    }
}
})
</script>
<style scoped>
</style>