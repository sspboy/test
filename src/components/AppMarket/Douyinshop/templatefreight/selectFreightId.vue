<!--选择 运费模板 组件-->
<template>
   <a-drawer 
      title="运费模板" 
      :size="size" 
      :open="props.data.freighttemplate_open" 
      @close="onClose"
   >
      <template #extra>
         <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
         <a-button type="primary" @click="comfirm">确认</a-button>
      </template>

      <a-radio-group v-model:value="PAGEDATA.select_value">

      <a-list
         :grid="{ gutter: 0, column: 1 }"
         size="default"
         :loading="PAGEDATA.initLoading"
         :data-source="PAGEDATA.list.value"
         :split="false"
      >

         <template #renderItem="{ item }">

            <a-card size="small" style="margin:0px 10px 10px 0;font-size: 12px;">
                  <template #title>
                     <span class="font_size_12">
                        <a-radio :value="item.template.id">
                           {{ item.template.template_name }}
                        </a-radio>
                     </span>
                  </template>
            </a-card>

         </template>

         <template #loadMore>
            <div style="height: 50px;padding: 20px 0 0 0;width: 100%;text-align: center;">
                  <a-button 
                     @click="onLoadMore" 
                     size="small" 
                     style="font-size:12px;" 
                     :loading="PAGEDATA.loading"
                  >加载更多</a-button>
            </div>
         </template>

      </a-list>
                  </a-radio-group>

  </a-drawer>
</template>
<script>
import { defineComponent,ref,reactive,onMounted,h,nextTick,toRaw } from 'vue';
import { useStore } from 'vuex'
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
// 组件引用=====开始
export default defineComponent({
   name:'SelectFreightID',
   components:{
   },
   props: {
      data:{typr:Object}
   },
   setup(props,ctx) {
      
      const size = 'default';                 // 抽屉大小
      const tool = new TOOL.TOOL()            // 工具方法
      const API = new utils.A_Patch()         // 请求接口地址合集

      // 数据配置
      const PAGEDATA = reactive({
         select_value:ref(),
         initLoading:ref(true),
         loading:ref(false),
         count:ref(0), // 分页
         total_num:ref(0),
         data:ref([]),
         list:ref([]),
         innerHeight:ref(window.innerHeight-150),// 初始化表格高度
         List_conditions:ref({
               page:1
         })
      })


      // 获取当前店铺尺码模板
        onMounted(() => {

            const first_Data = {
                  "page":PAGEDATA.count,
                  "size":12, 
            }

            tool.Http_.post(API.AppSrtoreAPI.freight.list, first_Data).then(res=>{
               
               var datarespone = res.data.data;// 数据对象
               var total_num = datarespone.Count; // 数据总条数
               var List = datarespone.List; // 列表数据

               PAGEDATA.initLoading = false;
               console.log('运费模板',List)

               PAGEDATA.data.value = List;
               PAGEDATA.list.value = List;

            })
        })
        // 加载更多数据
        const onLoadMore = () => {

            PAGEDATA.loading = true;

            PAGEDATA.count = PAGEDATA.count + 1;

            const get_more_data = {
                "page":PAGEDATA.count,
                "size":12, 
            }

            tool.Http_.post(API.AppSrtoreAPI.freight.list, get_more_data).then(res=>{
                
                if(res.data.data == "None"){ // 请求数据为空

                    PAGEDATA.list.value = PAGEDATA.data.value;

                    PAGEDATA.loading = false;

                    return tool.Fun_.message('info','没有更多数据了') // 提示信息
                
                }else{ // 请求数据不为空

                    const newData = PAGEDATA.data.value.concat(res.data.data.List);

                    PAGEDATA.data.value = newData;

                    PAGEDATA.list.value = newData;

                    nextTick(() => {
                        window.dispatchEvent(new Event('resize'));
                    });
                    
                    PAGEDATA.loading = false;

                }
            })
        };


      // 单选模板id回传


      // 确认
      const comfirm = () =>{

         // 获取模板id
         var template_id = PAGEDATA.select_value;
         var t_list = toRaw(PAGEDATA.list.value);
         var o = {}

         t_list.forEach((obj,index)=>{
            var o_id = obj.template.id;
            var o_name = obj.template.template_name;
            if(template_id == o_id){
               // console.log(o_id, o_name)
               o.id = o_id
               o.name = o_name
            }
         })
         
         ctx.emit('freight_callback',o)

      }
      // 取消
      const onClose = () =>{

         props.data.freighttemplate_open = !props.data.freighttemplate_open;

      }
      return{
         props,
         PAGEDATA,
         onClose,
         comfirm,
         size,
         onLoadMore

      }
   }
})
</script>
<style scoped>
</style>