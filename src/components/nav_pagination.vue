<template>
  <div id="components-pagination-demo-mini" class="nav_s">

    <a-pagination size="small" @change="onChange" :total="fanData.fandata" :show-total="total => `总共 ${total} 条数据`" show-size-changer show-quick-jumper />
  </div>
</template>

<script>
import {computed, defineComponent, inject, ref, watch} from 'vue'

export default defineComponent({

  // 翻页组件
  name: "nav_pagination",

  // 接受父组件数据
  props:{
    // 接受父组件面信息
    fandata:{
      type:Object // 数据类型效验
    }

  },

  setup(props, ctx){

    const fanData = computed(()=>{
      return props
    })
  console.log(props)



    const onChange = (page, pageSize)=>{
      let page_message = {}
      page_message.now_page = page
      page_message.page_size = pageSize

      ctx.emit('complete', page_message) // 【翻页数据】发送到父组件中

    }


    return{
      onChange,
      fanData
    }
  }
})
</script>

<style scoped>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
.nav_s{margin:34px 0 0 0px; float: right;}
</style>