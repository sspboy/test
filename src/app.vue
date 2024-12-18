<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<script>

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default {
  data() {
    return {
      zhCN,
    };
  },
};

</script>

<style>
html{margin: 0px; padding: 0px;font-size: 12px;}
.font_size_12{font-size: 12px;}
.cursor{cursor: pointer}
/* 页面内容区域背景色全局定义 */
.ant-layout{background-color: #001529;}
/* 全局内容区域圆角样式定义*/
.content_border{margin: 6px 0 0 0;border-top-left-radius:5px; padding:14px;background:#fff;}
/* { margin: '6px 0 0 0', borderTopLeftRadius:'5px', padding: '14px',background: '#fff',} */

/**model对话框报错设置**/
div[aria-hidden="true"]{display: none !important;}



</style>