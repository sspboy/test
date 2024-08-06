<template>
  <div id="components-pagination-demo-mini" class="nav_s">
    <a-pagination size="small" @change="onChange" :total="50" :show-total="total => `Total ${total} items`" show-size-changer show-quick-jumper />
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({

  // 翻页组件
  name: "nav_pagination",

  // 接受父组件数据
  props:{
    // 接受总页面信息
    page_msg:{
      type:Object // 数据类型效验
    }

  },

  setup(props){
    console.log('我是翻页组件')
    console.log(props.page_msg)
    const onChange = (page, pageSize)=>{

      console.log(page)         // 当前页
      console.log(pageSize)     // 单页数量
      // 改变后发送数据到表格

    }


    return{
      onChange
    }
  }
})
</script>

<style scoped>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
.nav_s{margin:28px 0 0 0px; float: right;}
</style>