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


        <!--功能导航-->
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




        <!--商品诊断任务-->
        <a-row :gutter="[24, 0]" class="NumberBox cursor">
          
          <a-col :span="24">
            <div class="ZhenduanTitle">
                <a-space style="float: left;padding: 0 0 0 4px;" :size="30">
                  <h4> <DashboardOutlined /> 每日诊断任务</h4>
                  <span class="font_size_12" style="padding: 0 0 6px 0;display: block;">任务状态 -- {{ Functionde.transfer_status() }}</span>
                  <span class="font_size_12" style="padding: 0 0 6px 0;display: block;">诊断结果 -- {{ Functionde.transfer_standard() }}</span>
                  <span class="font_size_12" style="padding: 0 0 6px 0;display: block;">完成时间 -- {{ QualityTask.task_finish_time }}</span>
                </a-space>

                <a-space style="float: right;" :size="30">
                  <span class="font_size_12">
                    <a href="#" style="color: #000;">查看商品诊断中心 >></a>
                  </span>
                </a-space>
            </div>
          </a-col>

          <a-col :span="3">
            <p class="Numbertext">{{ QualityTask.standard_rate }}%</p>
            <p class="font_size_12" style="text-align: center;">达标率</p>
          </a-col>
          
          <a-col :span="3">
            <p class="Numbertext">{{ QualityTask.meet_standard_num }}</p>
            <p class="font_size_12" style="text-align: center;">达标商品数</p>
          </a-col>

          <a-col :span="3">
            <p class="Numbertext">{{ QualityTask.product_num_to_improve_total }}</p>
            <p class="font_size_12" style="text-align: center;">待优化商品</p>
          </a-col>

          <a-col :span="3">
            <p class="Numbertext">{{ QualityTask.problem_num_total }}</p>
            <p class="font_size_12" style="text-align: center;">可优化项</p>
          </a-col>

          <a-col :span="3">
            <p class="Numbertext">{{ QualityTask.problem_num_to_improve }}</p>
            <p class="font_size_12" style="text-align: center;">待优化项</p>
          </a-col>

          <a-col :span="3">
            <p class="Numbertext">{{ Functionde.one_transfer() }}</p>
            <p class="font_size_12" style="text-align: center;">信息不规范</p>
          </a-col>
          <a-col :span="3">
            <p class="Numbertext">{{ Functionde.two_transfer() }}</p>
            <p class="font_size_12" style="text-align: center;">关键信息待优化</p>
          </a-col>

          <a-col :span="3">
            <p class="Numbertext">{{ Functionde.thr_transfer() }}</p>
            <p class="font_size_12" style="text-align: center;">素材缺失</p>
          </a-col>

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

      <!--内容右侧 开始-->
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
      <!--内容右侧 结束-->



      </a-layout>


</a-layout>







</template>
<script>
import { reactive,ref,computed} from 'vue';
import{ShopTwoTone,ProfileTwoTone,MedicineBoxTwoTone,CodeTwoTone,QuestionCircleFilled,InfoCircleFilled,MehFilled,RightOutlined,LoadingOutlined,DashboardOutlined} from '@ant-design/icons-vue'
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
// 组件引用=====结束
export default {
    name:'introduction',
    // 引用组件
    components: {
      DashboardOutlined,
        LoadingOutlined,
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

      // 诊断任务
      const QualityTask = reactive({
        "is_standard": "true",        // 是否达标
        "meet_standard_num": "1",     // 达标商品数
        "problem_num_to_improve": "10", // 待优化项数量
        "problem_num_total": "10",    // 可优化项总数
        "problem_type_distribution": [ // 问题类型分布
          {
            "num": "2",
            "type_key": "1",
            "type_name": "商品信息不规范"
          }
        ],
        "product_num_finished": "10", //已经诊断过的商品数
        "product_num_to_improve_total": "10", // 待优化商品数
        "product_num_total": "10", // 总共需要诊断的商品数
        "standard_rate": "10", // 达标率，百分比
        "task_finish_time": "2021-09-07 01:21:46", // 任务完成时间
        "task_id": "15293", // 任务id
        "task_status": "2", // 任务状态0-初始化，1-进行中，2-已完成
      })

      const Functionde = {
        // 任务状态转义
        "transfer_status":()=>{
          if(QualityTask.task_status == '0'){
            return '初始化'
          }else if(QualityTask.task_status  == '1'){
            return '进行中'
          }else if(QualityTask.task_status  == '2'){
            return '已完成'
          }
        },
        // 任务结果转义
        "transfer_standard":()=>{
          if(QualityTask.is_standard == 'true'){
            return '已达标'
          }else if(QualityTask.is_standard  == 'false'){
            return '未达标'
          }
        },
        // 信息不规范转义
        one_transfer:()=>{
          for(let i of QualityTask.problem_type_distribution){
            if(i.type_key == '1'){
              return i.num
            }else{
              return '0'
            }
          }
        },
        // 关键信息待优化转义
        two_transfer:()=>{
          for(let i of QualityTask.problem_type_distribution){
            if(i.type_key == '2'){
              return i.num
            }else{
              return '0'
            }
          }
        },
        // 素材缺失转义
        thr_transfer:()=>{
          for(let i of QualityTask.problem_type_distribution){
            if(i.type_key == '3'){
              return i.num
            }else{
              return '0'
            }
          }
        }

      }

      // 会员信息


      // 帮助中心

      // 联系我们


        return{
          PAGEDATA,
          store,
          innerHeight,
          QualityTask,
          Functionde
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
.NumberBox{margin: 14px 0 0 0 !important; border: 1px solid #e5e5e596;border-radius: 6px;padding: 0 0 4px 0;}
.Numbertext{margin: 16px 0 6px 0;font-size: 22px;text-align: center;}
.ZhenduanTitle{height: 20px;margin: 14px 0 6px 0;}
</style>