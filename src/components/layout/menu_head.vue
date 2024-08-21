<template>

    <a-layout-header class="head">
      <div style="width: 60px; float: left; color: #ffffff;font-size: 18px;">{{ headData.brand_name }}</div>
      <div class="font_size_12" style="margin-left:20px;float: right; color: dimgray;">
        <LogoutOutlined style="margin: 0 3px;" />
        退出
      </div>
      <div class="font_size_12" style="float: right; color: dimgray;">{{headData.nickname}}</div>
    </a-layout-header>
</template>

<script>
import {defineComponent,watch,ref} from 'vue';
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

    const headData = ref({})

    //然后watch监听
    watch(()=>props.headdata.data,(newval,oldval)=>{

      headData.value = newval// 加载父组件传递的数据

      // console.log(newval) 最新结果
      // console.log(oldval) 旧的结果
      //newval就是最新更新的result。
      //oldval就是老的result。
    })



    return{
      headData
    }
  }
})
</script>

<style scoped>
.head{textAlign:'center';color:#fff;height: 64px;paddingInline: 50px;lineHeight: '64px';backgroundColor: '#fff';width:100%;}

</style>