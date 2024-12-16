<template>
  <div>
    <a-menu class="font_size_12"
      v-model:selectedKeys="state.key"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items?.value"
      :openKeys="state.openKeys"
      @click="handleClick"
      @openChange="onOpenChange"
    ></a-menu>
  </div>
</template>


<script>

// 请求结果获取菜单信息

import {defineComponent, reactive, computed, onBeforeMount} from 'vue';
import { useRouter } from "vue-router"; // 导入路由
import { useStore } from 'vuex'
import {Menu} from '/src/assets/JS_Model/Menu.js';

import {
  UserOutlined,
  MenuOutlined,
  BarsOutlined,
  CodeOutlined,
  AccountBookOutlined,
  SettingOutlined,
  HomeOutlined,
  CopyOutlined
} from '@ant-design/icons-vue';


export default defineComponent({
  name:"menu_left",
  components: {},
  props:{
    menudata:{
      type:Object
    }
  },
  setup(props) {

    const store = useStore();// 共享数据
    const router = useRouter(); // 初始化路由方法
    const menu = new Menu()

    // 菜单状态设置
    const state = reactive({
      key:[],
      rootSubmenuKeys: [],  // 一级菜单
      openKeys:[],                  // 选中的一级菜单
      selectedKeys: [],
    });

    // 如果为true 收起状态
    if(store.state.menu.coll){
      state.key=[props.menudata.key]
      state.openKeys = []
    }else {    // 如果为false 展开状态
      state.key=[props.menudata.key]
      state.openKeys = [props.menudata.openKeys]
    }

    const items = reactive([])

    // 组件挂在之前---请求数据
    onBeforeMount(()=>{

        items.value = computed(()=>{

          var menu_data = menu.LoadMenu.fristlive(store.state.member.message.menu)


          for(let i of menu_data){

            // console.log(i)

            state.rootSubmenuKeys.push(i.key)

          }

          return menu_data

        })


    })



    // 菜单点击事件===>路由
    const handleClick = e => {
      // console.log(e)
      // console.log(e.keyPath)
      let se_obj = e.keyPath
      let name = e.item.id

      if(name != undefined){
        router.push('/' +  name);
        state.openKeys = [se_obj[0]]
        state.key = [se_obj[1]]
      }
    };

    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };


    return {
      store,
      handleClick,
      onOpenChange,
      state,
      items,
    };



  },
});
</script>
<style>

</style>