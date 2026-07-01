<!--
    类目预测
-->
<template>

  <!-- 动态渲染异步组件--选择素材 -->
  <selectimg v-if="Pic_Fun.selectimg_open" v-on:add_img_callback="Pic_Fun.Add_Callback" :data="Pic_Fun"/>

  <div class="delivery-method">
    
    <a-divider>类目预测</a-divider>
    
    <a-alert
        message="提示：输入主图>>标题>>预测商品类目后，再进行后续商品信息的录入！"
        type="info"
        show-icon
        closable
        class="font_size_12"
        style="width: 60%;margin: 0 auto;"
    />

    <a-row :gutter="[0,16]">

      <!----主图--pic-->
      <a-col :span="20" :offset="5">

        <div style="width: 100%; height: 120px;margin: 20px 0 6px 0;">

          <p class="img_pic" v-for="(item,index) in Pic_Fun.PicList">

              <a-image :src="item.byte_url" />
              <!--图片尺寸不复合情况下-->

              <!--图片尺寸1：1情况下-->
              <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                  <a-button type="text" size="small" @click="Pic_Fun.del_pic(index)"> 
                      <DeleteOutlined />
                  </a-button>
              </span>

          </p>

          <!--添加按钮-->
          <p 
            @click="Pic_Fun.change_material_type('PicList')" 
            class="cursor Add_img"
            v-if="Pic_Fun.PicList.length < 5"
          >
              <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                  +主图
              </a-flex>
          </p>

        </div>

      </a-col>

      <!--商品标题-->
      <a-col :span="14" :offset="5">
        <a-input
          v-model:value="Pic_Fun.name"
          autoComplete="off" 
          placeholder="输入商品标题"
          show-count 
          :maxlength="30"
        >
        </a-input>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-input-group style="display: flex;" compact>
          <a-select 
              ref="select"
              v-model:value="CATE.cate_value.value" 
              placeholder="请选择推荐类目" 
              :disabled="CATE.select_loading.value"
              :options="CATE.options.value"
              @change="CATE.loadFormat"
              style="width: 100%;"
          >
          </a-select>
          <a-button 
              @click="CATE.Check_Cate(formState)"
              :loading="CATE.predict_status.value"
              >点击预测商品类目
          </a-button>
        </a-input-group>
      </a-col>
      <a-col :span="24" style="text-align: center;margin-top: 12px;">
        <a-button type="primary" @click="Pic_Fun.fill_in_product_info">填写商品信息</a-button>

      </a-col>
    </a-row>
    
  </div>

</template>

<script>
import { defineComponent,defineAsyncComponent, ref, computed, watch, onMounted } from 'vue'
import { DeleteOutlined} from '@ant-design/icons-vue';

import { 
  Pic_Fun,CATE
} from '@/assets/douyinshop/productmanagement/Add';
export default defineComponent({
  name: '类目预测',
  
  components: {
    DeleteOutlined,
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件

  },
  
  props: {
    data: {
      type: Object,
      default: () => ({})
    },

  },
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {

    // 初始化表单内容=开始
    Pic_Fun.PicList=[]
    Pic_Fun.name=undefined
    CATE.cate_value.value = 1000003346 // undefined // 1000003346
    CATE.options.value=[
        {
            "value": 1000003346,
            "label": "服装>女装>连衣裙"
        },
        {
            "value": 1000003327,
            "label": "服装>特殊服装>婚纱/礼服"
        },
        {
            "value": 1000003330,
            "label": "服装>特殊服装>其他特殊服装"
        }
    ]
    // 响应式数据
    CATE.select_loading.value = true;
    
    // 初始化表单内容=结束



    
    // 生命周期
    onMounted(() => {
      // console.log('预测类目 组件已挂载')
      // 每次挂载 清空 数据
    })
    
    
    return {
      Pic_Fun,
      CATE,
    }
  }
})
</script>

<style scoped>
.delivery-method {
  padding: 26px 16px 50px 16px;
  border: 1px solid #eee;
  border-radius: 6px;
}
.img_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.img_3_4_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;text-align: center;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.Add_3_4_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_3_4_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}
</style>