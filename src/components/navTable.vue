
<template>

  <div style="height: 50px;">{{ update_page }}</div>
  <a-table :columns="columns" :data-source="update_data" :scroll="{ x: 1500, y: innerHeight }" :pagination="false" style="font-size: 12px;">
    <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>编辑</a> |
          <a>删除</a>
        </template>
    </template>
  </a-table>


</template>


<script>
import {defineComponent, ref, computed, watch} from 'vue'

export default defineComponent({

  // 表格组件
  name:'navTable',

  // 接受父组件数据
  props:{
    // 接受父组件面信息
    pagemessage:{
      type:Object // 数据类型效验
    }

  },
  setup(props){

      const Pagemessage =  ref({"now_page":1,"page_size":10})

      //然后watch监听
      watch(()=>props.pagemessage.data,(newval,oldval)=>{

        Pagemessage.value = newval// 加载父组件传递的数据
        console.log(Pagemessage.value)

        // console.log(newval) 最新结果
        // console.log(oldval) 旧的结果
        //newval就是最新更新的result。
        //oldval就是老的result。


      })

              // 计算属性：：更新当前page信息
        const update_page = computed(()=>{
            return Pagemessage.value.now_page
        })




      // console.log('我是表格组件')
      // console.log(props.message)
      // console.log(page_new.value)


      // 表格高度
      const innerHeight = ref(window.innerHeight-300);

      const columns = [
          {
            title: 'fullname',
            width: 120,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
          },
          {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            // fixed: 'left',
            ellipsis: true,
          },
          {
            title: 'Column 1',
            dataIndex: 'address',
            key: '1',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 2',
            dataIndex: 'address',
            key: '2',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 3',
            dataIndex: 'address',
            key: '3',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 4',
            dataIndex: 'address',
            key: '4',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 5',
            dataIndex: 'address',
            key: '5',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 6',
            dataIndex: 'address',
            key: '6',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 7',
            dataIndex: 'address',
            key: '7',
            width: 150,
            ellipsis: true,
          },
          {
            title: 'Column 8',
            dataIndex: 'address',
            key: '8',
            ellipsis: true,
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
          },
        ];


      // 计算属性：：更新表格信息
      const update_data = computed(()=>{

        const data = [];

        for (let i = 0; i < 100; i++) {
          data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
          });
        }
        // console.log(data)

        return data
      })


      return{
            columns,
            innerHeight,
            Pagemessage,
            update_page,
            update_data
      }
  }
})




</script>