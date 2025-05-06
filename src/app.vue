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
:root {
  --ant-font-size-base: 12px; /* 设置全局字体大小 */
}
html{margin: 0px; padding: 0px;font-size: 12px;}
.font_size_12{font-size: 12px;}
.cursor{cursor: pointer}
/* 页面内容区域背景色全局定义 */
.ant-layout{background-color: #001529;}
/* 全局内容区域圆角样式定义*/
.content_border{margin: 6px 0 0 0;border-top-left-radius:5px; padding:14px;background:#fff;}
/* { margin: '6px 0 0 0', borderTopLeftRadius:'5px', padding: '14px',background: '#fff',} */
/* 在全局样式文件（如 `styles.css` 或 `App.vue` 的 `<style>` 中） */
.ant-form-item-label > label {font-size: 12px !important; /* 设置表单标签的字体大小 */}
.ant-form-item-control {font-size: 12px !important; /* 设置表单控件的字体大小 */}
 /* 设置下拉框的字体大小 */
.ant-select{font-size: 12px !important;}
.ant-select-dropdown {font-size: 12px !important;}
.ant-select-selection-item{font-size: 12px !important;}
.ant-select-item-option-content {font-size: 12px !important;}
.ant-select-selection-placeholder {font-size: 12px !important;}
/* 时间选择器 默认字体 设置字体大小 */
.ant-picker-input input::placeholder {font-size: 12px;}
.ant-col{font-size: 12px;}

/**model对话框报错设置**/
div[aria-hidden="true"]{display: none !important;}

</style>