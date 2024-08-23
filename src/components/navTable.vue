<template>


  <a-table :columns="columns" :data-source="pagedata" :scroll="{ x: 1500, y: innerHeight }" :pagination="false" style="font-size: 12px;">

    <template #bodyCell="{ column }">

      <!--定义操作按钮 开始-->
      <template v-if="column.key === 'operation'">
          <a>编辑</a> |
          <a>删除</a>
      </template>
      <!--定义操作按钮 结束-->

    </template>

  </a-table>


</template>


<script>
import {defineComponent, ref, computed, reactive,watch} from 'vue'

export default defineComponent({

  // 表格组件
  name:'navTable',

  // 接受父组件数据
  props:{
    // 接受父组件面信息
    pagemessage:{
      type:Object // 数据类型对象
    }

  },
  setup(props){

      // 定义===>表格高度
      const innerHeight = ref(window.innerHeight-300);
      const pagedata = reactive({}) // 表数据
      const columns = reactive()   // 表头

      // 计算属性：：更新当前page信息
      const update_page = computed(()=>{
          return ''
      })

      console.log(props.pagemessage.data)



      return{
        pagedata,
        columns,
        innerHeight,
        update_page,

      }
  }
})




</script>