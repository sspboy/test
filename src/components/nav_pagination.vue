<template>
  <div id="components-pagination-demo-mini" class="nav_s">
    <a-pagination size="small" @change="onChange" :total="props.fandata?.total_number" :show-total="total => `总共 ${ total } 条数据`" show-size-changer show-quick-jumper />
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({

  // 翻页组件
  name: "nav_pagination",

  // 接受父组件数据
  props:{
    // 接受父组件面信息【翻页信息】
    fandata:{
      type:Object // 数据类型为数字
    }

  },

  setup(props, ctx){

    const onChange = (page, pageSize)=>{
      let page_message = {}
      page_message.page = page
      page_message.page_size = pageSize
      ctx.emit('complete', page_message) // 【翻页数据】发送到父组件中

    }

    return{
      onChange,
      props
    }
  }
})
</script>

<style scoped>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
.nav_s{margin:22px 0 0 0px; float: right;}
</style>