<!-- 发布商品 商品描述 组件-->
 <template>


    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg 
        v-if="PAGEDATA.selectimg_open" 
        v-on:add_img_callback="DES.add_img" 
        :data="PAGEDATA"
    />

    <div style="margin: 0 0 10px 0;">

        <a-space>

            <a-button 
                type="dashed" 
                @click="PAGEDATA.select_des_img"
                size="small"
                block
            >插入素材</a-button>

            <a-button 
                type="dashed"
                size="small"
                @click="DES.clear_img" block>清空</a-button>

            <a-button 
                type="dashed"
                size="small"
                @click="DES.print_data" block>打印图片地址</a-button>
        </a-space>

    </div>

   <div class="delivery-method">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="DES.toolbarConfig"
            :mode="DES.mode.value"
        />

        <Editor
            style="height: 600px; overflow-y: hidden;"
            v-model="DES.valueHtml.value"
            :defaultConfig="DES.editorConfig"
            :mode="DES.mode.value"
            @onCreated="DES.handleCreated"
        />
     
   </div>
 </template>
 
 <script>
 import { defineComponent,defineAsyncComponent, ref, computed, watch, onMounted,shallowRef, reactive } from 'vue'
 import { Editor, Toolbar } from '@wangeditor/editor-for-vue' // 描述详情富媒体
import { 
    Description
} from '@/assets/douyinshop/productmanagement/Add';
import '@wangeditor/editor/dist/css/style.css' // 引入富媒体编辑器样式 css
import * as TOOL from '@/assets/JS_Model/tool';

 export default defineComponent({
   name: '描述详情',
   
   components: {
    Editor, // 详情编辑
    Toolbar, // 编辑工具栏
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件

   },
   
   props: {
     data: {
       type: Object,
     },
     data2: {
       type: String,
     }
   },
   
   emits: ['update', 'change'],
   
   setup(props, { emit, attrs, slots, expose }) {

        const tool = new TOOL.TOOL()            // 工具方法

        // 初始化商品详情容器
        const PAGEDATA = reactive({
            selectimg_open:false,           // 添加主图-图片显示状态配置
            select_des_img:()=>{
                PAGEDATA.selectimg_open = true;
            }
        })


        // 描述详情
        const editorRef = shallowRef()  // 编辑器实例，必须用 shallowRef

        const DES = {

            // 初始化
            valueHtml:ref(''),
            mode:ref('simple'),// 或 'simple' 'default'
            // 编辑器实例，必须用 shallowRef
            editorRef:shallowRef(),
            editorConfig:{placeholder: '请插入图片'},// 默认值
            // 编辑器工具栏配置
            toolbarConfig:{
                excludeKeys: [
                    'bold',
                    "underline",
                    "italic",
                    "through",
                    "color",
                    "clearStyle",
                    "bgColor",
                    "codeBlock",
                    "blockquote",
                    "bulletedList",
                    "numberedList",
                    "insertTable",
                    "header1",
                    "header2",
                    "header3",
                    'headerSelect',
                    'italic',
                    'group-more-style', // 排除菜单组，写菜单组 key 的值即可
                    //"fullScreen",
                    "insertLink",
                    "editLink",
                    "insertVideo",
                    "uploadVideo",
                    "todo",
                    "redo",
                    "undo",
                    "group-image",
                    "uploadImage",
                    "insertImage",

                ]
            },
            // 创建编辑器
            handleCreated:(editor) => {
                editorRef.value = editor // 记录 editor 实例，重要！
                editor.clear() // 清空编辑器
            },
            // 加载图片到编辑器
            add_img:(img_list)=>{
                
                const editor = editorRef.value;
                if (!editor) return;

                // 先聚焦到编辑器末尾
                editor.focus(true); // true 表示聚焦到末尾


                for(let i of img_list){
                    
                    var material_type = i.material_type;

                    if(material_type === "photo"){ // 图片素材
                        let url = i.byte_url;
                        var text = '<img class="ant-image-img" src="' + url + '">'
                        editor.dangerouslyInsertHtml(text)
                    }

                }
                
            },
            // 获取描述图片
            get_img:()=>{

                var img_list_res = []

                // 描述为空
                if(editorRef.value === undefined){
                    
                    tool.Fun_.message('error', '1描述详情不能为空！');

                    return false

                }else {

                    var img_list = editorRef.value.getElemsByType('image') // 获取图片地址

                    if(img_list.length == 0 || editorRef.value == undefined){
                        
                        // tool.Fun_.message('error', '2描述详情不能为空！');

                        return false
                    
                    }else{

                        // 描述不为空
                        // console.log(img_list)
                        img_list.forEach((obj,index)=>{

                            img_list_res.push(obj.src)

                        })

                        console.log('页面图片地址', img_list_res.join('|'))

                        


                        return img_list_res.join('|')
                    }
                }
            },
            // 清空描述图
            clear_img:()=>{

                DES.valueHtml.value = '';

            },
            // 打印同步的结果
            print_data:()=>{

                console.log('结果地址', Description.value)

            }
        }


        // 响应式数据
        const count = ref(0)
        const title = ref('发货方式设置')
        
        // 计算属性
        const displayTitle = computed(() => {
            return `${title.value} - ${props.data2 || '默认'}`
        })
        
        // 方法
        const handleClick = () => {
            count.value++
            emit('update', { count: count.value, data: props.data })
        }
        
        // 监听器
        watch(() => DES.valueHtml.value, (newVal, oldVal) => {

            // 每次加载图片，将最新的图片
            Description.value = DES.get_img()

            console.log('data changed:', Description.value)

        }, { deep: true })
        
        // 生命周期
        onMounted(() => {
            console.log('描述详情 组件已挂载')
        })
        
        // 暴露给父组件的方法
        expose({
            reset: () => { count.value = 0 }
        })
     
     return {
        PAGEDATA,
       count,
       title,
       displayTitle,
       handleClick,
       DES,
       editorRef
     }
   }
 })
 </script>
 
 <style scoped>
 .delivery-method {
   border: 1px solid #eee;
 }
 </style>