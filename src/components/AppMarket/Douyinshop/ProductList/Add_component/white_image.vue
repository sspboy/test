<template>
    <a-row>
        <!--白底图 -- white_back_ground_pic_url -->
        <a-col :span="4">
            
            <div style="width: 100%;height:130px;margin: 20px 0 0 0;">

                <p class="img_pic" v-for="item in whiteimg_Fun.PicList.value">

                    <a-image :src="item.byte_url" />

                    <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                        <a-button type="text" size="small" @click="whiteimg_Fun.del"> 
                            <DeleteOutlined />
                        </a-button>
                    </span>
                </p>

                <!--添加按钮-->
                <p 
                    @click="Basedata.change_material_type('white_img')" 
                    class="cursor Add_img"
                    v-if="whiteimg_Fun.PicList.value < 1"
                >
                    <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                        + 白底图
                    </a-flex>
                </p>

            </div>

        </a-col>

        <!--选择 主图创建白底图-->
        <a-col :span="4">
            <div class="cursor Add_img" style="margin-top: 20px;">
                <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                    + 选择主图<br />
                    创建白底图
                </a-flex>
            </div>
        </a-col>

        <!--选择 素材创建白底图-->
        <a-col :span="4">
            <div class="cursor Add_img" style="margin-top: 20px;">
                <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                    + 选择素材<br />创建白底图
                </a-flex>
            </div>
        </a-col>

        <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px">白底图创建记录</a-divider>

        </a-col>

    </a-row>
    <div> 
        
    </div>
  <div class="delivery-method">
    
    
    
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { DeleteOutlined} from '@ant-design/icons-vue';

 import { 
  whiteimg_Fun
} from '@/assets/douyinshop/productmanagement/Add';
export default defineComponent({
  name: '白底图',
  
  components: {
    DeleteOutlined
  },
  
  props: {
    data: {
      type: Object,
    },
    data2: {
      type: String,
      default: ''
    }
  },
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {
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
    watch(() => props.data, (newVal, oldVal) => {
      console.log('data changed:', newVal)
    }, { deep: true })
    
    // 生命周期
    onMounted(() => {
      console.log('模板名称 组件已挂载')
    })
    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })
    
    return {
        whiteimg_Fun,
      count,
      title,
      displayTitle,
      handleClick
    }
  }
})
</script>

<style scoped>
.delivery-method {
  padding: 16px;
  border: 1px solid #eee;
}
.img_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
</style>