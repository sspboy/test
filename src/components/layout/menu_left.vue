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
  <a-affix :offset-bottom="bottom" style="bottom: 18px;right:10px;position:absolute;">
      <a-button type="dashed" ghost size="small" style="font-size: 12px; margin:3px 16px 0 0;" @click="() => { store.commit('menu/change') }">
          <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
          <menu-fold-outlined v-else class="trigger" />
      </a-button>
    </a-affix>
</template>


<script>

// 请求结果获取菜单信息
import {defineComponent, reactive, computed, onBeforeMount,ref} from 'vue';
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
  CopyOutlined,
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';


export default defineComponent({
  name:"menu_left",
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  props:{
    menudata:{
      type:Object
    }
  },
  setup(props) {

    const store = useStore();// 共享数据
    const router = useRouter(); // 初始化路由方法
    const menu = new Menu()
    const bottom = ref(10);
    
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
        
      // console.log(store.state.member.message.menu)

        items.value = computed(()=>{

          var menu_data = menu.LoadMenu.fristlive(store.state.member.message.menu)  //加载菜单信息

          for(let i of menu_data){

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
      bottom
    };



  },
});
</script>
<style>

</style>