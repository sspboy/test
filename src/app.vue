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


/**下拉表单字体大小设置**/
.ant-select{font-size: 12px !important;}
.custom-select{font-size: 12px !important;}
.ant-select-item-option-content {font-size: 12px !important;}
.ant-select-selection-placeholder {font-size: 12px !important;}
.ant-select-dropdown-menu-item-selected {font-size: 12px !important;}
.ant-select-selection-item{font-size: 12px !important;}
.ant-form-item-label label{font-size: 12px !important;}
/**下拉表单字体大小设置**/
.ant-input{border-radius: 4px;padding: 2px 2px 2px 6px;}
.ant-picker-range{border-radius: 4px !important;}
.ant-picker-range input{padding: 2px 1px !important;font-size: 12px !important;}
</style>