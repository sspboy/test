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



          <div style="overflow-y: scroll;" :style="{ background: '#fff', padding: '0 0 100px 0', height: innerHeight+'px'}">

            <div style="width: 100%;clear: both;">
              <!-- <a-typography>
                <h4>商品复制</h4>
              </a-typography> -->
            </div>
            
              <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
                  <a-flex justify="space-between">
                    <img
                      alt="avatar"
                      src="../../../assets/keji.jpg"
                      :style="imgStyle"
                    />
                    <a-flex vertical align="flex-end" justify="space-between" :style="{ padding: '32px' }">
                      <a-typography>
                        <a-typography-title :level="3">
                          “手动复制 边看边采集 不限制数量 ”
                        </a-typography-title>
                        <a-typography-paragraph>
                        每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                        </a-typography-paragraph>
                      </a-typography>
                      <div>
                        <a-button type="primary" href="#" size="small" target="_blank" style="font-size: 12px;margin-right: 10px;padding-top: 2px;">下载插件</a-button>
                        <a-button type="primary" href="#" size="small" target="_blank" style="font-size: 12px;margin-right: 10px;padding-top: 2px;">安装教程</a-button>
                        <a-button type="primary" href="#" size="small" target="_blank" style="font-size: 12px;margin-right: 10px;padding-top: 2px;">如何使用</a-button>
                      </div>


                    </a-flex>
                  </a-flex>
              </a-card>


            <!-- <div style="width: 100%;clear: both;padding-top: 20px;">

              <a-typography>
                <h4>产品介绍</h4>
                <a-typography-paragraph>
                  In the process of internal desktop applications development, many different design specs and
                  implementations would be involved, which might cause designers and developers difficulties and
                  duplication and reduce the efficiency of development.
                </a-typography-paragraph>
                <a-typography-paragraph>
                  After massive project practice and summaries, Ant Design, a design language for background
                  applications, is refined by Ant UED Team, which aims to
                  <a-typography-text strong>
                    uniform the user interface specs for internal background projects, lower the unnecessary
                    cost of design differences and implementation and liberate the resources of design and
                    front-end development.
                  </a-typography-text>
                </a-typography-paragraph>
              </a-typography>


            </div>


            <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
                  <a-flex justify="space-between">
                    <img
                      alt="avatar"
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      :style="imgStyle"
                    />
                    <a-flex vertical align="flex-end" justify="space-between" :style="{ padding: '32px'}">
                      <a-typography>
                        <a-typography-title :level="3">
                          “antd is an enterprise-class UI design language and Vue UI library.”
                        </a-typography-title>
                      </a-typography>
                      <a-button type="primary" href="https://antdv.com" target="_blank">Get Start</a-button>
                    </a-flex>
                  </a-flex>
              </a-card> -->






            </div>




      </a-layout-content>

      </a-layout>


</a-layout>







</template>
<script>
import { reactive,ref} from 'vue';

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
    const store = useStore();                 // 共享数据
    const innerHeight = ref(window.innerHeight-100);// 初始化表格高度
    const PAGEDATA = reactive({
        title:'产品介绍',
        menudata:{      // 菜单选中配置
            'key':'86',
            'openKeys':'home'
        },
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 内容总数
    })
      
    const cardStyle = {
        width: '620px',
        float:'left',
        marginRight: '2%',

      };

    const imgStyle = {
        display: 'block',
        width: '273px',
      };

        return{
          PAGEDATA,
          store,
          cardStyle,
          imgStyle,
          innerHeight
        }
    },
}
</script>

<style>

</style>