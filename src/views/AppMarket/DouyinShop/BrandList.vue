<!--品牌管理-->
<template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--右侧内容部分 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/><!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <!--右侧 内容组件  开始-->
      <a-layout-content class="content_border">
        
        <a-list
            class="demo-loadmore-list"
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="list"
        >
    

        <template #loadMore>

            <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="onLoadMore" size="small" style="font-size: 12px;" :loading="loading">加载更多</a-button>
            </div>
            
        </template>

        
        <template #renderItem="{ item }">

            <a-list-item>

                <a-skeleton :title="true" :paragraph="false" :loading="!!item.loading" active>

                    <a-list-item-meta>

                        <template  #title>
                            {{ item.create_time }}
                            <span class="font_size_12" style="font-weight:normal;">
                                提交 {{ item.number }} 个 修改商品
                            </span>

                        </template>

                    </a-list-item-meta>

                </a-skeleton>

                
                <template v-if="item.id !== undefined" #actions>
                    <a href="#" key="list-loadmore-more" class="font_size_12">查看</a>
                    <a href="#" class="font_size_12">删除</a>
                </template>

            </a-list-item>
            
        </template>

        </a-list>
                        

      </a-layout-content>

    </a-layout>
</a-layout>



</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default {

    name:"BrandList",


    components:{
        menu_left,
        menu_head,
    },
    setup(props) {

        const PAGEDATA = reactive({

            title:'品牌管理',

            menudata:{      // 菜单选中配置
                'key':'93', // 当前菜单key
                'openKeys':'douyinshop' // 一级菜单
            },
        })
        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集

        const store = useStore();// 共享数据
        const innerHeight = ref(window.innerHeight-100);// 初始化表格高度
        
        const initLoading = ref(true);
        const list = ref([]);
        const loading = ref(false);

        const drawer = ref(false);

        onMounted(() => {

          // tool.Http_.post(API.AppSrtoreAPI.batch.list, first_Data).then(res=>{
              
          //     // console.log('批量列表',res)
              
          //     initLoading.value = false;
              
          //     data.value = res.data.data;

          //     list.value = res.data.data;

          // })

        })


        // 加载更多数据
        const onLoadMore = () => {

            loading.value = true;

            list.value = data.value.concat(
                [...new Array(1)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            );

            count.value = count.value + 1;

            const get_more_data = {
                "page":count.value,
                "page_size":3, 
                "condition":[{"type": "orderby", "condition": [{"column_name": "create_time", "value": "desc"}]}]

            }

            tool.Http_.post(API.AppSrtoreAPI.batch.list, get_more_data).then(res=>{
                
                // console.log(res)

                if(res.data.data == "None"){ // 请求数据为空

                    list.value = data.value;

                    loading.value = false;

                    return tool.Fun_.message('info','没有更多数据了') // 提示信息
                
                }else{ // 请求数据不为空

                    const newData = data.value.concat(res.data.data);

                    data.value = newData;

                    list.value = newData;

                    nextTick(() => {
                        window.dispatchEvent(new Event('resize'));
                    });
                    
                    loading.value = false;

                }
                

            })


        };

        // 新建

        // 更新

        // 删除



        return{
          PAGEDATA,
          store,
          innerHeight,
          initLoading,
          loading,
          list,
          onLoadMore

        }
    }

}

</script>

<style scoped>

</style>
