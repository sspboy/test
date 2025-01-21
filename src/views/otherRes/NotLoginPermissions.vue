<template>


  <a-flex  gap="middle" align="center" vertical>

    <a-flex :style="{height:innerHeight + 'px'}" justify="center" align="center">

      <a-result title="重新登录" style="border-radius: 4px;border: 1px solid silver;width: 250px;" >

        <template #icon>

          <FrownOutlined />
        
        </template>

        <template #extra>
          <div style="margin-bottom: 20px;">暂无权限 请登录后再访问</div>
            <a-button type="primary" @click="Go_home">去登录</a-button>
        </template>

      </a-result>

    </a-flex>
</a-flex> 

</template>

<script>
import {ref} from 'vue';

import {
  FrownOutlined
} from '@ant-design/icons-vue';
import { useRouter } from "vue-router"; // 导入路由

export default {
  
  name: "NotLoginPermissions",// 没有登录权限提示重新登录
  
  components: {
  
    FrownOutlined

  },

  setup(props) {
    const router = useRouter(); // 初始化路由方法
    const Go_home =()=>{
      window.location.href = '/'
    }
    const innerHeight = ref(window.innerHeight);// 初始化表格高度


    return{
      Go_home,
      innerHeight
    }
  }
  
}
</script>

<style>
.example {
  width: calc(100%);
}
</style>