<template>

  <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: innerHeight }" :pagination="false" style="font-size: 12px;">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
      <a>action</a>
    </template>
    </template>
  </a-table>


</template>


<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({

  // 表格组件
  name:'navTable',

  // 接受父组件数据
  props:{
    message:{
      type:Object // 数据类型效验
    }

  },
  setup(props){

      console.log('我是表格:接受父组件的信息')
      console.log(props.message)

    // 表格高度
      const innerHeight = ref(window.innerHeight-300);

      const columns = [
          {
            title: 'Full Name',
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
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
          },
        ];
        const data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
          });
        }

      return{
            columns,
            data,
            innerHeight
      }
  }
})




</script>