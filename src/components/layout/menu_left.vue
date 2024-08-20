<template>
  <div>
    <a-menu class="font_size_12"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="light"
      :inline-collapsed="state.collapsed"
      :items="items"
    ></a-menu>
  </div>
</template>


<script>

// 请求结果获取菜单信息

//
import {defineComponent, reactive, watch, h } from 'vue';
import {
  UserOutlined,
  MenuOutlined,
  BarsOutlined,
  AccountBookOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';


export default defineComponent({
  name:"menu_left",
  components: {

  },
  props:{

  },

  setup() {


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
        label: '用户管理',
        title: '用户管理',
      },
      {
        key: '2',
        icon: () => h(MenuOutlined),
        label: '菜单管理',
        title: '菜单管理',
      },
      {
        key: '3',
        icon: () => h(BarsOutlined),
        label: '功能列表',
        title: '功能列表',
      },
      {
        key: '4',
        icon: () => h(AccountBookOutlined),
        label: '版本管理',
        title: '版本管理',
      },
      {
        key: 'sub1',
        icon: () => h(MailOutlined),
        label: 'Navigation One',
        title: 'Navigation One',
        children: [
          {
            key: '5',
            label: 'Option 5',
            title: 'Option 5',
          },
          {
            key: '6',
            label: 'Option 6',
            title: 'Option 6',
          },
          {
            key: '7',
            label: 'Option 7',
            title: 'Option 7',
          },
          {
            key: '8',
            label: 'Option 8',
            title: 'Option 8',
          },
        ],
      },
      {
        key: 'sub2',
        icon: () => h(AppstoreOutlined),
        label: 'Navigation Two',
        title: 'Navigation Two',
        children: [
          {
            key: '9',
            label: 'Option 9',
            title: 'Option 9',
          },
          {
            key: '10',
            label: 'Option 10',
            title: 'Option 10',
          },
          {
            key: 'sub3',
            label: 'Submenu',
            title: 'Submenu',
            children: [
              {
                key: '11',
                label: 'Option 11',
                title: 'Option 11',
              },
              {
                key: '12',
                label: 'Option 12',
                title: 'Option 12',
              },
            ],
          },
        ],
      },

    ]);
    watch(
  () => state.openKeys,
        (_val, oldVal) => {
    state.preOpenKeys = oldVal;
    },);
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return {
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