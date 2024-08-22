<template>

    <a-layout-header class="head">
      <div class="logo_text cursor">{{ heda.headdata?.brand_name }}</div>
      <div class="font_size_12 cursor" style="margin-left:20px;float: right; color: dimgray;">
        <LogoutOutlined style="margin: 0 3px;" />
        退出
      </div>
      <div class="font_size_12 cursor" style="float: right; color: dimgray;">{{ heda.headdata?.id }}</div>
    </a-layout-header>
</template>

<script>
import {defineComponent, computed} from 'vue';
import {LogoutOutlined} from '@ant-design/icons-vue'
export default defineComponent({

  name: "menu_head",

  components: {
      LogoutOutlined,
  },

  // 接受父组件数据
  props:{
    headdata:{
      type:Object // 数据类型效验
    }
  },

  setup(props){

    // 计算属性
    const heda = computed(()=>{
      return props
    })

    return{
      heda
    }
  }
})
</script>

<style scoped>
.logo_text{width: 60px; float: left; color: #ffffff;font-size: 18px;}
.head{textAlign:'center';color:#fff;height: 64px;paddingInline: 50px;lineHeight: '64px';backgroundColor: '#fff';width:100%;}

</style>