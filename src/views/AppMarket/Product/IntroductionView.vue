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
        
          <a-row :gutter="[12, 24]">

            <a-col :span="6">

                  <a-card class="cardStyle cursor" :body-style="{ padding: 0, overflow: 'hidden' }">

                    <a-flex justify="space-between">
                      
                      <ProfileTwoTone class="icoStyle"/>
                      <a-flex vertical align="flex-end" justify="space-between" style="padding:0 10px;">
                        <a-typography>
                          <a-typography-title class="cardTitle">商品管理 <RightOutlined /></a-typography-title>
                          <a-typography-paragraph class="cardText">
                          每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                          </a-typography-paragraph>
                        </a-typography>
                      </a-flex>
                    </a-flex>
                </a-card>
            </a-col>

            <a-col :span="6">
                  <a-card class="cardStyle cursor" :body-style="{ padding: 0, overflow: 'hidden' }">
                    <a-flex justify="space-between">
                      
                      <ShopTwoTone class="icoStyle"/>
                      <a-flex vertical align="flex-end" justify="space-between" style="padding: 0 10px 0 10px;">
                        <a-typography>
                          <a-typography-title class="cardTitle">网盘素材<RightOutlined /></a-typography-title>
                          <a-typography-paragraph class="cardText">
                              每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                          </a-typography-paragraph>
                        </a-typography>
                      </a-flex>
                    </a-flex>
                </a-card>
            </a-col>

            <a-col :span="6">
                  <a-card class="cardStyle cursor" :body-style="{ padding: 0, overflow: 'hidden' }">
                    <a-flex justify="space-between">
                      
                      <MedicineBoxTwoTone class="icoStyle"/>

                      <a-flex vertical align="flex-end" justify="space-between" style="padding: 0 10px 0 10px;">
                        <a-typography>
                          <a-typography-title class="cardTitle">诊断优化<RightOutlined /></a-typography-title>
                          <a-typography-paragraph class="cardText">
                          每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                          </a-typography-paragraph>
                        </a-typography>
                      </a-flex>
                    </a-flex>
                </a-card>
            </a-col>

            <a-col :span="6">
                <a-card class="cardStyle cursor" :body-style="{ padding: 0, overflow: 'hidden' }">
                    <a-flex justify="space-between">
                      
                      <CodeTwoTone class="icoStyle"/>

                      <a-flex vertical align="flex-end" justify="space-between" style="padding: 0 10px 0 10px;">
                        <a-typography>
                          <a-typography-title class="cardTitle">批量操作<RightOutlined /></a-typography-title>
                          <a-typography-paragraph class="cardText">
                          每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息；
                          </a-typography-paragraph>
                        </a-typography>
                      </a-flex>
                    </a-flex>
                </a-card>
            </a-col>
          </a-row>

          <a-row>
            <a-card class="cardStyle cursor" style="margin: 14px 0 0 0;" :body-style="{ padding: 0, overflow: 'hidden' }">
                <a-flex justify="space-between">
                  
                  <img alt="avatar" src="../../../assets/keji.jpg" class="imgStyle"/>

                  <a-flex vertical align="flex-start" justify="space-between" style="padding: 10px 10px 0 10px;">
                      <a-typography>
                      <a-typography-title class="cardTitle"></a-typography-title>
                      <a-typography-paragraph class="cardText">
                      <!-- 每个商家绕不开的日常；选品的过程中能完成复制，边看边采集信息； -->
                      </a-typography-paragraph>
                    </a-typography>
                  </a-flex>

                </a-flex>
            </a-card>
          </a-row>


          <!-- Comfyui-AI-list -->
          <a-row :gutter="[12, 12]" style="padding: 14px 0 0 0;">

            <a-col :span="4">
              <div class="gutter-box">

              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="../../../assets/6d23.jpg" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>www.instagram.com</template>
                </a-card-meta>
              </a-card>
            </div>
            </a-col>

            <a-col :span="4">
              <div class="gutter-box">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="../../../assets/6d23.jpg" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>www.instagram.com</template>
                </a-card-meta>
              </a-card>
            </div>
            </a-col>

            <a-col :span="4">
              <div class="gutter-box">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="../../../assets/6d23.jpg" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>www.instagram.com</template>
                </a-card-meta>
              </a-card>
            </div>
            </a-col>
                        <a-col :span="4">
              <div class="gutter-box">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="../../../assets/6d23.jpg" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>www.instagram.com</template>
                </a-card-meta>
              </a-card>
            </div>
            </a-col>
                        <a-col :span="4">
              <div class="gutter-box">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="../../../assets/6d23.jpg" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>www.instagram.com</template>
                </a-card-meta>
              </a-card>
            </div>
            </a-col>
            <a-col :span="4">
              <div class="gutter-box">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="../../../assets/6d23.jpg" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>www.instagram.com</template>
                </a-card-meta>
              </a-card>
            </div>
            </a-col>

            <a-col :span="4">
              <!-- <div class="gutter-box">
                <a-card hoverable>
                  <template #cover>
                    <img alt="example" src="../../../assets/6d23.jpg" />
                  </template>
                  <a-card-meta title="Europe Street beat">
                    <template #description>www.instagram.com</template>
                  </a-card-meta>
                </a-card>
              </div> -->
            </a-col>

          </a-row>

      </a-layout-content>

      <!--内容右侧-->
      <a-layout-sider style="background-color: #fff;margin: 6px 0 0 0;" width='300px'>

        <div class="RightMiniBox">
          <h4><MehFilled style="color:dimgray;"/> 会员信息</h4>
          <div class="font_size_12" style="padding: 8px 0 0 0;">
            <a-row :gutter="[12, 12]">
              <a-col :span="24">头像：用户名称</a-col>
              <a-col :span="24">店铺名称：大飒飒</a-col>
              <a-col :span="24">所属版本：基础版</a-col>
            </a-row>
          </div>
        </div>

        <div class="RightMiniBox">
          <h4><QuestionCircleFilled style="color:dimgray;"/> 帮助中心</h4>
          <div class="font_size_12" style="padding: 8px 0 0 0;">
            <a-row :gutter="[12, 12]">
              <a-col :span="24">商品查询查询教程</a-col>
              <a-col :span="24">商品查询查询教程</a-col>
              <a-col :span="24">商品查询查询教程</a-col>
            </a-row>
          </div>
        </div>

        <!-- <div class="RightMiniBox">
          <h4>在线客服</h4>
          <div class="font_size_12">
            信息内容
          </div>
        </div> -->

        <div class="RightMiniBox">
          <h4> <InfoCircleFilled style="color:dimgray;"/> 联系我们 </h4>
          <div class="font_size_12" style="padding: 8px 0 0 0;">
            <a-row :gutter="[12, 12]">
              <a-col :span="24">在线留言 点击反馈</a-col>
              <a-col :span="24">微信: 微信昵称</a-col>
              <a-col :span="24">您也可以详细描述问题，发邮件给我们。</a-col>
              <a-col :span="24">电子邮箱: 123@qq.com</a-col>
            </a-row>
          </div>
        </div>

      </a-layout-sider>



      </a-layout>


</a-layout>







</template>
<script>
import { reactive,ref,computed} from 'vue';
import{ShopTwoTone,ProfileTwoTone,MedicineBoxTwoTone,CodeTwoTone,QuestionCircleFilled,InfoCircleFilled,MehFilled,RightOutlined} from '@ant-design/icons-vue'
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
        ShopTwoTone,
        ProfileTwoTone,
        MedicineBoxTwoTone,
        CodeTwoTone,
        QuestionCircleFilled,
        InfoCircleFilled,
        MehFilled,
        RightOutlined
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
.cardStyle{width: 100%;height: 84px;}
.icoStyle{font-size:52px;margin: 8px 0 0 12px;transition: transform 0.3s ease;}
.icoStyle:hover{transform: scale(1.1); /* 鼠标移入时放大到1.5倍 */}
.imgStyle{display:block;margin: 5px 0 0 5px;height: 72px;width: 72px;border-radius: 6px;}
.cardTitle{font-size: 12px;margin: 0 0 6px 0;padding:22px 0 0 0;height: 36px;overflow: hidden;}
.cardText{font-size: 12px;line-height: 18px;height: 20px;overflow: hidden;}
.gutter-box{background-color: aliceblue;border-radius: 6px;}
.RightMiniBox{margin: 15px 14px 0 0;border:1px solid #e5e5e596;border-radius: 4px;padding:12px;}
.ListCard{}


</style>