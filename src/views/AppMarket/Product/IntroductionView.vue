<template>

  <!--内容部分 菜单 右侧列表 开始-->
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

      <a-layout-content class="content_border" >

          <div style="overflow-y:auto;" :style="{ background: '#fff', height: innerHeight + 'px'}">

              <!--卡片1-->
              <a-card class="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
                  <a-flex justify="space-between">
                    
                    <img alt="avatar" src="../../../assets/keji.jpg" class="imgStyle"/>

                    <a-flex vertical align="flex-end" justify="space-between" style="padding: 10px 10px 0 10px;">
                      <a-typography>
                        <a-typography-title class="cardTitle">想想都好笑</a-typography-title>
                        <a-typography-paragraph class="cardText">
                        每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                        </a-typography-paragraph>
                      </a-typography>
                    </a-flex>

                  </a-flex>
              </a-card>

              <!--卡片2-->
              <a-card class="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
                  <a-flex justify="space-between">
                    
                    <img alt="avatar" src="../../../assets/keji.jpg" class="imgStyle"/>

                    <a-flex vertical align="flex-end" justify="space-between" style="padding: 10px 10px 0 10px;">
                      <a-typography>
                        <a-typography-title class="cardTitle">笑笑而过</a-typography-title>
                        <a-typography-paragraph class="cardText">
                        每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                        </a-typography-paragraph>
                      </a-typography>
                    </a-flex>

                  </a-flex>
              </a-card>

              <!--卡片3-->
              <a-card class="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
                  <a-flex justify="space-between">
                    
                    <img alt="avatar" src="../../../assets/keji.jpg" class="imgStyle"/>

                    <a-flex vertical align="flex-end" justify="space-between" style="padding: 10px 10px 0 10px;">
                      <a-typography>
                        <a-typography-title class="cardTitle">不一样的生活</a-typography-title>
                        <a-typography-paragraph class="cardText">
                        每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                        </a-typography-paragraph>
                      </a-typography>
                    </a-flex>

                  </a-flex>
              </a-card>

              <!--卡片3-->
              <a-card class="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
                  <a-flex justify="space-between">
                    
                    <img alt="avatar" src="../../../assets/keji.jpg" class="imgStyle"/>

                    <a-flex vertical align="flex-end" justify="space-between" style="padding: 10px 10px 0 10px;">
                      <a-typography>
                        <a-typography-title class="cardTitle">科技改变生活</a-typography-title>
                        <a-typography-paragraph class="cardText" style="text-overflow: ellipsis;">
                        每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                        </a-typography-paragraph>
                      </a-typography>
                    </a-flex>

                  </a-flex>
              </a-card>

          </div>
      </a-layout-content>

      <!--内容右侧-->
      <a-layout-sider style="background-color: aliceblue;" width='300px'>

        <div>会员信息</div>

      </a-layout-sider>



      </a-layout>


</a-layout>







</template>
<script>
import { reactive,ref,computed} from 'vue';

import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
// 组件引用=====结束
export default {
    name:'introduction',
    // 引用组件
    components: {
        menu_left,
        menu_head,
    },
    setup() {

      const innerHeight = ref(window.innerHeight-100);// 初始化表格高度

      const store = useStore();// 共享数据

      const PAGEDATA = computed(()=>{

        return reactive({

          title:'产品介绍',
          
          menudata:{       // 菜单选中配置
            'key':'86',
            'openKeys':'home',
          },

          colum:[],           // 表头信息
          datalist:[],        // 列表信息
          total_number:0,     // 内容总数

        })

      })

        return{
          PAGEDATA,
          store,
          innerHeight
        }
    },
}
</script>

<style scoped>
.cardStyle{width: 24%;height: 84px;float: left;margin: 1% 1% 0 0;}
.imgStyle{display:block;margin: 5px 0 0 5px;height: 72px;width: 72px;border-radius: 6px;}
.cardTitle{font-size: 14px;margin: 0 0 6px 0;}
.cardText{font-size: 12px;line-height: 18px;height: 34px;overflow: hidden;}
</style>