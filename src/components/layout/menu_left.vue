<template>
  <div>
    <a-menu class="font_size_12"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="handleClick"
    ></a-menu>
  </div>
</template>


<script>

// 请求结果获取菜单信息

//
import {defineComponent, reactive, watch, h } from 'vue';
import { useRouter } from "vue-router"; // 导入路由

import {
  UserOutlined,
  MenuOutlined,
  BarsOutlined,
  CodeOutlined,
  AccountBookOutlined,
  AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';


export default defineComponent({
  name:"menu_left",
  components: {

  },
  props:{

  },

  setup() {
    const router = useRouter(); // 初始化路由方法


    const state = reactive({
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });

    const items = reactive([
      {
        key: '1',
        icon: () => h(UserOutlined),
        id:"user",
        label: '用户管理',
        title: '用户管理',
      },
      {
        key: '2',
        icon: () => h(MenuOutlined),
        id:"menu",
        label: '菜单管理',
        title: '菜单管理'
      },
      {
        key: '3',
        icon: () => h(BarsOutlined),
        id:"fun",
        label: '功能列表',
        title: '功能列表',
      },
      {
        key: '4',
        icon: () => h(AccountBookOutlined),
        id:"version",
        label: '版本管理',
        title: '版本管理',
      },
      {
        key: 'sub1',
        icon: () => h(CodeOutlined),
        label: '管理后台',
        title: '管理后台',
        children: [
          {
            key: '5',
            label: '用户管理',
            title: '用户管理',
          },
          {
            key: '6',
            label: '菜单管理',
            title: '菜单管理',
          },
          {
            key: '7',
            label: '功能列表',
            title: '功能列表',
          },
          {
            key: '8',
            label: '版本管理',
            title: '版本管理',
          },
        ],
      },
      {
        key: 'sub2',
        icon: () => h(SettingOutlined),
        label: '功能设置',
        title: '功能设置',
        children: [
          {
            key: '9',
            label: '组织架构',
            title: '组织架构',
          },
          {
            key: '10',
            label: '团队人员',
            title: '团队人员',
          },
          {
            key: '11',
            label: '角色管理',
            title: '角色管理',
          },
          {
            key: 'sub3',
            label: '品牌资料',
            title: 'Submenu',
            children: [
              {
                key: '12',
                label: 'Option 11',
                title: 'Option 11',
              },
              {
                key: '13',
                label: 'Option 12',
                title: 'Option 12',
              },
            ],
          },
        ],
      },

    ]);

    watch(() => state.openKeys,(_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },);

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    // 菜单点击事件===>路由
    const handleClick = e => {
      let name = e.item.id
      if(name != undefined){
        router.push('/' +  e.item.id);
      }

    };
    return {
      handleClick,
      watch,
      state,
      items,
      toggleCollapsed,
    };



  },
});
</script>
<style>

</style>