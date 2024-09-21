<template>
  <div>
    <a-menu class="font_size_12"
      v-model:selectedKeys="state.key"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
      :openKeys="state.openKeys"
      @click="handleClick"
      @openChange="onOpenChange"
    ></a-menu>
  </div>
</template>


<script>

// 请求结果获取菜单信息

//
import {defineComponent, reactive, h, computed} from 'vue';
import { useRouter } from "vue-router"; // 导入路由
import { useStore } from 'vuex'

import {
  UserOutlined,
  MenuOutlined,
  BarsOutlined,
  CodeOutlined,
  AccountBookOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';


export default defineComponent({
  name:"menu_left",
  components: {

  },
  props:{
    menudata:{
      type:Object
    }
  },
  setup(props) {

    const store = useStore();// 共享数据

    // 菜单数据状态
    const state = reactive({
      key:[],
      rootSubmenuKeys: ['sub1', 'sub2'],  // 一级菜单
      openKeys:['sub1'],// 选中的一级菜单
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


    const router = useRouter(); // 初始化路由方法
    // console.log(props.menudata)


    // 菜单列表
    const items = reactive([
      {
        key: '1',
        icon: () => h(UserOutlined),
        id:"video",
        label: '视频处理',
        title: '视频处理',
      },
      {
        key: '2',
        icon: () => h(MenuOutlined),
        id:"menu",
        label: '内容发布',
        title: '内容发布'
      },
      {
        key: '3',
        icon: () => h(BarsOutlined),
        id:"fun",
        label: '互动营销',
        title: '互动营销',
      },
      {
        key: '4',
        icon: () => h(AccountBookOutlined),
        id:"version",
        label: '线索管理',
        title: '线索管理',
      },
      {
        key: 'sub1',
        icon: () => h(CodeOutlined),
        label: '管理后台',
        title: '管理后台',
        children: [
          {
            key: '5',
            id:"user",
            label: '用户管理',
            title: '用户管理',
          },
          {
            key: '6',
            id:"menu",
            label: '菜单管理',
            title: '菜单管理',
          },
          {
            key: '7',
            id:"fun",
            label: '功能列表',
            title: '功能列表',
          },
          {
            key: '8',
            id:"version",
            label: '版本管理',
            title: '版本管理',
          },
        ],
      },
      {
        key: 'sub2',
        icon: () => h(SettingOutlined),
        label: '系统设置',
        title: '系统设置',
        children: [
          {
            key: '9',
            id:'department',
            label: '组织架构',
            title: '组织架构',
          },
          {
            key: '10',
            id:'team',
            label: '团队人员',
            title: '团队人员',
          },
          {
            key: '11',
            id:'role',
            label: '角色管理',
            title: '角色管理',
          },
          {
            key: '12',
            id:'brandinf',
            label: '品牌资料',
            title: '品牌资料',
            // children: [
            //   {
            //     key: '12',
            //     label: 'Option 11',
            //     title: 'Option 11',
            //   },
            //   {
            //     key: '13',
            //     label: 'Option 12',
            //     title: 'Option 12',
            //   },
            // ],
          },
        ],
      },

    ]);


    // 菜单点击事件===>路由
    const handleClick = e => {

      // console.log(e.keyPath)
      let name = e.item.id
      if(name != undefined){
        router.push('/' +  e.item.id);
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