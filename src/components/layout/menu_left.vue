<template>

          <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" :inline-collapsed="collapsed">

            <a-menu-item key="1" style="margin: 0px; border-radius: 0px;width: 100%;">
              <template #icon>
                <PieChartOutlined />
              </template>
              <span>用户管理</span>
            </a-menu-item>

            <a-menu-item key="2" style="margin: 0px; border-radius: 0px;width: 100%;">
              <template #icon>
                <DesktopOutlined />
              </template>
              <span>菜单管理</span>
            </a-menu-item>

            <a-menu-item key="3" style="margin: 0px; border-radius: 0px;width: 100%;">
              <template #icon>
                <InboxOutlined />
              </template>
              <span>权限列表</span>
            </a-menu-item>

            <a-menu-item key="4" style="margin: 0px; border-radius: 0px;width: 100%;">
              <template #icon>
                <InboxOutlined />
              </template>
              <span>版本管理</span>
            </a-menu-item>

<!--            <a-sub-menu key="sub1">-->
<!--              <template #icon>-->
<!--                <MailOutlined />-->
<!--              </template>-->
<!--              <template #title>易阳天玺</template>-->
<!--              <a-menu-item key="5">Option 5</a-menu-item>-->
<!--              <a-menu-item key="6">Option 6</a-menu-item>-->
<!--              <a-menu-item key="7">Option 7</a-menu-item>-->
<!--              <a-menu-item key="8">Option 8</a-menu-item>-->
<!--            </a-sub-menu>-->

<!--            <a-sub-menu key="sub2">-->
<!--              <template #icon>-->
<!--                <AppstoreOutlined />-->
<!--              </template>-->
<!--              <template #title>谢谢你的</template>-->
<!--              <a-menu-item key="9">Option 9</a-menu-item>-->
<!--              <a-menu-item key="10">Option 10</a-menu-item>-->
<!--              <a-sub-menu key="sub3" title="Submenu">-->
<!--                <a-menu-item key="11">Option 11</a-menu-item>-->
<!--                <a-menu-item key="12">Option 12</a-menu-item>-->
<!--              </a-sub-menu>-->
<!--            </a-sub-menu>-->

          </a-menu>
</template>


<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { PieChartOutlined, DesktopOutlined, InboxOutlined } from '@ant-design/icons-vue';

// 请求结果获取菜单信息

//



export default defineComponent({
  name:"menu_left",
  components: {
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined,
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
    watch(() => state.openKeys, (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    });
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    return {
      ...toRefs(state),
      toggleCollapsed,
    };
  },
});
</script>
<style>

</style>